import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { generateSlug } from '@/lib/slug';

// GET all news — public
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: news }, { status: 200 });
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

    // Generate slug dari judul
    let slug = generateSlug(news_title);

    // Pastikan slug unik — kalau sudah ada tambahkan angka di belakang
    const existing = await prisma.news.findUnique({ where: { news_slug: slug } });
    if (existing) {
      const count = await prisma.news.count({
        where: { news_slug: { startsWith: slug } },
      });
      slug = `${slug}-${count + 1}`;
    }

    const imageUrls = await Promise.all(imageFiles.map((file) => uploadToCloudinary(file.buffer, 'news', file.filename)));

    const news = await prisma.news.create({
      data: {
        news_title,
        news_slug: slug,
        news_content,
        news_images: imageUrls,
      },
    });

    return NextResponse.json({ message: 'News created successfully', data: news }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

export const POST = withAuth(createHandler);
