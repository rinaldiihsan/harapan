import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Cache per artikel — konten berita jarang berubah setelah publish
export const revalidate = 60;

export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  if (!params.slug) {
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
  }

  try {
    const news = await prisma.news.findUnique({
      where: { news_slug: params.slug },
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
