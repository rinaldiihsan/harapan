// app/api/carousel/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const origin = req.headers.get('origin');
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400, headers: corsHeaders(origin) });
  }

  try {
    const carousel = await prisma.carousel.findUnique({
      where: { id },
      select: {
        id: true,
        carousel_image: true,
        carousel_caption: true,
        carousel_desc: true,
      },
    });

    if (!carousel) {
      return NextResponse.json({ message: 'Carousel not found' }, { status: 404, headers: corsHeaders(origin) });
    }

    const { fields, files } = await parseFormData(req);
    const { carousel_caption, carousel_desc } = fields;
    const imageFiles = files['carousel_image'] ?? [];

    let imageUrl = carousel.carousel_image;

    if (imageFiles.length > 0) {
      await deleteFromCloudinary(carousel.carousel_image);
      imageUrl = await uploadToCloudinary(imageFiles[0].buffer, 'carousel', imageFiles[0].filename);
    }

    const updated = await prisma.carousel.update({
      where: { id },
      data: {
        carousel_image: imageUrl,
        carousel_caption: carousel_caption || carousel.carousel_caption,
        carousel_desc: carousel_desc || carousel.carousel_desc,
      },
      select: {
        id: true,
        carousel_image: true,
        carousel_caption: true,
        carousel_desc: true,
      },
    });

    return NextResponse.json({ message: 'Carousel updated successfully', data: updated }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

// DELETE — protected
async function deleteHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const origin = req.headers.get('origin');
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400, headers: corsHeaders(origin) });
  }

  try {
    const carousel = await prisma.carousel.findUnique({
      where: { id },
      select: { id: true, carousel_image: true },
    });

    if (!carousel) {
      return NextResponse.json({ message: 'Carousel not found' }, { status: 404, headers: corsHeaders(origin) });
    }

    await deleteFromCloudinary(carousel.carousel_image);
    await prisma.carousel.delete({ where: { id } });

    return NextResponse.json({ message: 'Carousel deleted successfully' }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
