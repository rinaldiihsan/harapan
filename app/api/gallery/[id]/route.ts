// app/api/gallery/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { corsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

// GET by id — public
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const origin = req.headers.get('origin');
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400, headers: corsHeaders(origin) });
  }

  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id },
      select: {
        id: true,
        gallery_title: true,
        gallery_category: true,
        gallery_image: true,
      },
    });

    if (!gallery) {
      return NextResponse.json({ message: 'Gallery not found' }, { status: 404, headers: corsHeaders(origin) });
    }

    return NextResponse.json({ data: gallery }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const origin = req.headers.get('origin');
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400, headers: corsHeaders(origin) });
  }

  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id },
      select: {
        id: true,
        gallery_title: true,
        gallery_category: true,
        gallery_image: true,
      },
    });

    if (!gallery) {
      return NextResponse.json({ message: 'Gallery not found' }, { status: 404, headers: corsHeaders(origin) });
    }

    const { fields, files } = await parseFormData(req);
    const { gallery_title, gallery_category } = fields;
    const imageFiles = files['gallery_image'] ?? [];

    let imageUrls = gallery.gallery_image;

    if (imageFiles.length > 0) {
      if (imageFiles.length > 5) {
        return NextResponse.json({ message: 'Maximum 5 images allowed' }, { status: 400, headers: corsHeaders(origin) });
      }
      await Promise.all(gallery.gallery_image.map((url) => deleteFromCloudinary(url)));
      imageUrls = await Promise.all(imageFiles.map((file) => uploadToCloudinary(file.buffer, 'gallery', file.filename)));
    }

    const updated = await prisma.gallery.update({
      where: { id },
      data: {
        gallery_title: gallery_title || gallery.gallery_title,
        gallery_category: gallery_category || gallery.gallery_category,
        gallery_image: imageUrls,
      },
      select: {
        id: true,
        gallery_title: true,
        gallery_category: true,
        gallery_image: true,
      },
    });

    return NextResponse.json({ message: 'Gallery updated successfully', data: updated }, { status: 200, headers: corsHeaders(origin) });
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
    const gallery = await prisma.gallery.findUnique({
      where: { id },
      select: { id: true, gallery_image: true },
    });

    if (!gallery) {
      return NextResponse.json({ message: 'Gallery not found' }, { status: 404, headers: corsHeaders(origin) });
    }

    await Promise.all(gallery.gallery_image.map((url) => deleteFromCloudinary(url)));
    await prisma.gallery.delete({ where: { id } });

    return NextResponse.json({ message: 'Gallery deleted successfully' }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
