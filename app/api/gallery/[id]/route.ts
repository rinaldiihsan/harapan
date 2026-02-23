import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';

// GET by id — public
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id: Number(params.id) },
    });

    if (!gallery) {
      return NextResponse.json({ message: 'Gallery not found' }, { status: 404 });
    }

    return NextResponse.json({ data: gallery }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id: Number(params.id) },
    });

    if (!gallery) {
      return NextResponse.json({ message: 'Gallery not found' }, { status: 404 });
    }

    const { fields, files } = await parseFormData(req);
    const { gallery_title, gallery_category } = fields;
    const imageFiles = files['gallery_image'] ?? [];

    let imageUrls = gallery.gallery_image;

    if (imageFiles.length > 0) {
      if (imageFiles.length > 5) {
        return NextResponse.json({ message: 'Maximum 5 images allowed' }, { status: 400 });
      }

      // Hapus semua gambar lama dari Cloudinary
      await Promise.all(gallery.gallery_image.map((url) => deleteFromCloudinary(url)));

      // Upload gambar baru
      imageUrls = await Promise.all(imageFiles.map((file) => uploadToCloudinary(file.buffer, 'gallery', file.filename)));
    }

    const updated = await prisma.gallery.update({
      where: { id: Number(params.id) },
      data: {
        gallery_title: gallery_title || gallery.gallery_title,
        gallery_category: gallery_category || gallery.gallery_category,
        gallery_image: imageUrls,
      },
    });

    return NextResponse.json({ message: 'Gallery updated successfully', data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — protected
async function deleteHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id: Number(params.id) },
    });

    if (!gallery) {
      return NextResponse.json({ message: 'Gallery not found' }, { status: 404 });
    }

    // Hapus semua gambar dari Cloudinary
    await Promise.all(gallery.gallery_image.map((url) => deleteFromCloudinary(url)));

    await prisma.gallery.delete({ where: { id: Number(params.id) } });

    return NextResponse.json({ message: 'Gallery deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
