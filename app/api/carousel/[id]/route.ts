import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const carousel = await prisma.carousel.findUnique({
      where: { id: Number(params.id) },
    });

    if (!carousel) {
      return NextResponse.json({ message: 'Carousel not found' }, { status: 404 });
    }

    const { fields, files } = await parseFormData(req);
    const { carousel_caption, carousel_desc } = fields;
    const imageFiles = files['carousel_image'] ?? [];

    let imageUrl = carousel.carousel_image;

    if (imageFiles.length > 0) {
      // Hapus gambar lama dari Cloudinary
      await deleteFromCloudinary(carousel.carousel_image);

      // Upload gambar baru
      imageUrl = await uploadToCloudinary(imageFiles[0].buffer, 'carousel', imageFiles[0].filename);
    }

    const updated = await prisma.carousel.update({
      where: { id: Number(params.id) },
      data: {
        carousel_image: imageUrl,
        carousel_caption: carousel_caption || carousel.carousel_caption,
        carousel_desc: carousel_desc || carousel.carousel_desc,
      },
    });

    return NextResponse.json({ message: 'Carousel updated successfully', data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — protected
async function deleteHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const carousel = await prisma.carousel.findUnique({
      where: { id: Number(params.id) },
    });

    if (!carousel) {
      return NextResponse.json({ message: 'Carousel not found' }, { status: 404 });
    }

    // Hapus gambar dari Cloudinary
    await deleteFromCloudinary(carousel.carousel_image);

    await prisma.carousel.delete({ where: { id: Number(params.id) } });

    return NextResponse.json({ message: 'Carousel deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
