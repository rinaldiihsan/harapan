import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { generateSlug } from '@/lib/slug';

// GET by id — public, ambil semua field termasuk content untuk detail page
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const news = await prisma.news.findUnique({
      where: { id },
      select: {
        id: true,
        news_title: true,
        news_slug: true,
        news_content: true,
        news_images: true,
        createdAt: true,
      },
    });

    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    return NextResponse.json({ data: news }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const news = await prisma.news.findUnique({
      where: { id },
      select: {
        id: true,
        news_title: true,
        news_slug: true,
        news_content: true,
        news_images: true,
      },
    });

    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    const { fields, files } = await parseFormData(req);
    const { news_title, news_content } = fields;
    const imageFiles = files['news_images'] ?? [];

    let imageUrls = news.news_images;

    if (imageFiles.length > 0) {
      if (imageFiles.length > 5) {
        return NextResponse.json({ message: 'Maximum 5 images allowed' }, { status: 400 });
      }
      // Hapus lama dulu secara paralel, baru upload baru
      await Promise.all(news.news_images.map((url) => deleteFromCloudinary(url)));
      imageUrls = await Promise.all(imageFiles.map((file) => uploadToCloudinary(file.buffer, 'news', file.filename)));
    }

    const titleChanged = news_title && news_title !== news.news_title;

    const updated = await prisma.news.update({
      where: { id },
      data: {
        news_title: news_title || news.news_title,
        ...(titleChanged && { news_slug: generateSlug(news_title) }),
        news_content: news_content || news.news_content,
        news_images: imageUrls,
      },
      select: {
        id: true,
        news_title: true,
        news_slug: true,
        news_content: true,
        news_images: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ message: 'News updated successfully', data: updated }, { status: 200 });
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
    const news = await prisma.news.findUnique({
      where: { id },
      select: { id: true, news_images: true },
    });

    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    // Hapus semua gambar dari Cloudinary secara paralel, baru hapus dari DB
    await Promise.all(news.news_images.map((url) => deleteFromCloudinary(url)));
    await prisma.news.delete({ where: { id } });

    return NextResponse.json({ message: 'News deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
