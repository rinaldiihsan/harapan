// app/api/news/slug/[slug]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const revalidate = 60;

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  const origin = req.headers.get('origin');

  if (!params.slug) {
    return NextResponse.json({ message: 'Slug is required' }, { status: 400, headers: corsHeaders(origin) });
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
      return NextResponse.json({ message: 'News not found' }, { status: 404, headers: corsHeaders(origin) });
    }

    return NextResponse.json({ data: news }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}
