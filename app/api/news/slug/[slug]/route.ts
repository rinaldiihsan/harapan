import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const news = await prisma.news.findUnique({
      where: { news_slug: params.slug },
    });

    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    return NextResponse.json({ data: news }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
