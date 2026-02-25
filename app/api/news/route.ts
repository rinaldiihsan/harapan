import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { generateSlug } from '@/lib/slug';

// News list di-cache lebih pendek karena lebih sering update
export const revalidate = 30;

// GET all news — public, dengan pagination
export async function GET(req: NextRequest) {
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
          // news_content tidak diambil di list — berat dan tidak perlu
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
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

// POST create news — protected
async function createHandler(req: NextRequest) {
  try {
    const { fields, files } = await parseFormData(req);
    const { news_title, news_content } = fields;

    if (!news_title || !news_content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const imageFiles = files['news_images'] ?? [];
    if (imageFiles.length === 0) {
      return NextResponse.json({ message: 'At least one image is required' }, { status: 400 });
    }
    if (imageFiles.length > 5) {
      return NextResponse.json({ message: 'Maximum 5 images allowed' }, { status: 400 });
    }

    let slug = generateSlug(news_title);

    // Cek slug unik — pakai try/catch pada create untuk handle race condition
    // daripada findUnique + create yang rawan duplikat kalau request bersamaan
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

      return NextResponse.json({ message: 'News created successfully', data: news }, { status: 201 });
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

        return NextResponse.json({ message: 'News created successfully', data: news }, { status: 201 });
      }
      throw e;
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

export const POST = withAuth(createHandler);
