// app/api/carousel/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const revalidate = 60;

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

// GET all carousel — public
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const carousel = await prisma.carousel.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        carousel_image: true,
        carousel_caption: true,
        carousel_desc: true,
      },
    });

    return NextResponse.json({ data: carousel }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

// POST create carousel — protected
async function createHandler(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { fields, files } = await parseFormData(req);
    const { carousel_caption, carousel_desc } = fields;

    if (!carousel_caption || !carousel_desc) {
      return NextResponse.json({ message: 'Caption and description are required' }, { status: 400, headers: corsHeaders(origin) });
    }

    const imageFiles = files['carousel_image'] ?? [];
    if (imageFiles.length === 0) {
      return NextResponse.json({ message: 'Image is required' }, { status: 400, headers: corsHeaders(origin) });
    }

    const imageUrl = await uploadToCloudinary(imageFiles[0].buffer, 'carousel', imageFiles[0].filename);

    const carousel = await prisma.carousel.create({
      data: {
        carousel_image: imageUrl,
        carousel_caption,
        carousel_desc,
      },
      select: {
        id: true,
        carousel_image: true,
        carousel_caption: true,
        carousel_desc: true,
      },
    });

    return NextResponse.json({ message: 'Carousel created successfully', data: carousel }, { status: 201, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const POST = withAuth(createHandler);
