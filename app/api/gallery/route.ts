// app/api/gallery/route.ts

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

// GET all gallery — public
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        gallery_title: true,
        gallery_category: true,
        gallery_image: true,
      },
    });

    return NextResponse.json({ data: gallery }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

// POST create gallery — protected
async function createHandler(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { fields, files } = await parseFormData(req);
    const { gallery_title, gallery_category } = fields;

    if (!gallery_title || !gallery_category) {
      return NextResponse.json({ message: 'Title and category are required' }, { status: 400, headers: corsHeaders(origin) });
    }

    const imageFiles = files['gallery_image'] ?? [];

    if (imageFiles.length === 0) {
      return NextResponse.json({ message: 'At least one image is required' }, { status: 400, headers: corsHeaders(origin) });
    }

    if (imageFiles.length > 5) {
      return NextResponse.json({ message: 'Maximum 5 images allowed' }, { status: 400, headers: corsHeaders(origin) });
    }

    const imageUrls = await Promise.all(imageFiles.map((file) => uploadToCloudinary(file.buffer, 'gallery', file.filename)));

    const gallery = await prisma.gallery.create({
      data: { gallery_title, gallery_category, gallery_image: imageUrls },
      select: {
        id: true,
        gallery_title: true,
        gallery_category: true,
        gallery_image: true,
      },
    });

    return NextResponse.json({ message: 'Gallery created successfully', data: gallery }, { status: 201, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const POST = withAuth(createHandler);
