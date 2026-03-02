import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';

export const dynamic = 'force-dynamic';

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
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
      return NextResponse.json({ message: 'Carousel not found' }, { status: 404 });
    }

    const { fields, files } = await parseFormData(req);
    const { carousel_caption, carousel_desc } = fields;
    const imageFiles = files['carousel_image'] ?? [];

    let imageUrl = carousel.carousel_image;

    if (imageFiles.length > 0) {
      // Hapus & upload paralel tidak bisa karena upload butuh hasil delete dulu
      // Tapi delete & upload tetap dijalankan sequential agar tidak orphan image
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

    return NextResponse.json({ message: 'Carousel updated successfully', data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — protected
async function deleteHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const carousel = await prisma.carousel.findUnique({
      where: { id },
      select: { id: true, carousel_image: true },
    });

    if (!carousel) {
      return NextResponse.json({ message: 'Carousel not found' }, { status: 404 });
    }

    // Hapus dari Cloudinary dan DB secara paralel tidak aman —
    // jalankan delete Cloudinary dulu, baru delete DB
    await deleteFromCloudinary(carousel.carousel_image);
    await prisma.carousel.delete({ where: { id } });

    return NextResponse.json({ message: 'Carousel deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
