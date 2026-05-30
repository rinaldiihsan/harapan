// app/api/news/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { generateSlug } from '@/lib/slug';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const revalidate = 30;

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

// GET all news — public, dengan pagination
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get('page') ?? 1));
    const limit = Math.min(20, Math.max(1, Number(searchParams.get('limit') ?? 10)));

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          news_title: true,
          news_slug: true,
          news_images: true,
          createdAt: true,
        },
      }),
      prisma.news.count(),
    ]);

    return NextResponse.json(
      {
        data: news,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200, headers: corsHeaders(origin) },
    );
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

// POST create news — protected
async function createHandler(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { fields, files } = await parseFormData(req);
    const { news_title, news_content } = fields;

    if (!news_title || !news_content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400, headers: corsHeaders(origin) });
    }

    const imageFiles = files['news_images'] ?? [];
    if (imageFiles.length === 0) {
      return NextResponse.json({ message: 'At least one image is required' }, { status: 400, headers: corsHeaders(origin) });
    }
    if (imageFiles.length > 5) {
      return NextResponse.json({ message: 'Maximum 5 images allowed' }, { status: 400, headers: corsHeaders(origin) });
    }

    let slug = generateSlug(news_title);

    try {
      const imageUrls = await Promise.all(imageFiles.map((file) => uploadToCloudinary(file.buffer, 'news', file.filename)));

      const news = await prisma.news.create({
        data: { news_title, news_slug: slug, news_content, news_images: imageUrls },
        select: {
          id: true,
          news_title: true,
          news_slug: true,
          news_images: true,
          createdAt: true,
        },
      });

      return NextResponse.json({ message: 'News created successfully', data: news }, { status: 201, headers: corsHeaders(origin) });
    } catch (e: any) {
      // P2002 = unique constraint violation (slug duplikat)
      if (e.code === 'P2002') {
        slug = `${slug}-${Date.now()}`;

        const imageUrls = await Promise.all(imageFiles.map((file) => uploadToCloudinary(file.buffer, 'news', file.filename)));

        const news = await prisma.news.create({
          data: { news_title, news_slug: slug, news_content, news_images: imageUrls },
          select: {
            id: true,
            news_title: true,
            news_slug: true,
            news_images: true,
            createdAt: true,
          },
        });

        return NextResponse.json({ message: 'News created successfully', data: news }, { status: 201, headers: corsHeaders(origin) });
      }
      throw e;
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const POST = withAuth(createHandler);
