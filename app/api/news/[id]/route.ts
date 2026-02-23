import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';

// GET by id — public
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const news = await prisma.news.findUnique({
      where: { id: Number(params.id) },
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
  try {
    const news = await prisma.news.findUnique({
      where: { id: Number(params.id) },
    });

    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    const { fields, files } = await parseFormData(req);
    const { news_title, news_content } = fields;
    const imageFiles = files['news_images'] ?? [];

    let imageUrls = news.news_images;

    // Kalau ada gambar baru, hapus yang lama dan upload yang baru
    if (imageFiles.length > 0) {
      if (imageFiles.length > 5) {
        return NextResponse.json({ message: 'Maximum 5 images allowed' }, { status: 400 });
      }

      // Hapus semua gambar lama dari Cloudinary
      await Promise.all(news.news_images.map((url) => deleteFromCloudinary(url)));

      // Upload gambar baru
      imageUrls = await Promise.all(imageFiles.map((file) => uploadToCloudinary(file.buffer, 'news', file.filename)));
    }

    const updated = await prisma.news.update({
      where: { id: Number(params.id) },
      data: {
        news_title: news_title || news.news_title,
        news_content: news_content || news.news_content,
        news_images: imageUrls,
      },
    });

    return NextResponse.json({ message: 'News updated successfully', data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — protected
async function deleteHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const news = await prisma.news.findUnique({
      where: { id: Number(params.id) },
    });

    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    // Hapus semua gambar dari Cloudinary
    await Promise.all(news.news_images.map((url) => deleteFromCloudinary(url)));

    await prisma.news.delete({ where: { id: Number(params.id) } });

    return NextResponse.json({ message: 'News deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
