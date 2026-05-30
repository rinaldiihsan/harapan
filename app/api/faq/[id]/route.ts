// app/api/faq/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { corsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const origin = req.headers.get('origin');
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400, headers: corsHeaders(origin) });
  }

  try {
    const faq = await prisma.faq.findUnique({
      where: { id },
      select: { id: true, faq_title: true, faq_desc: true },
    });

    if (!faq) {
      return NextResponse.json({ message: 'FAQ not found' }, { status: 404, headers: corsHeaders(origin) });
    }

    const { faq_title, faq_desc } = await req.json();

    if (faq_title && faq_title !== faq.faq_title) {
      const existing = await prisma.faq.findUnique({
        where: { faq_title },
        select: { id: true },
      });
      if (existing) {
        return NextResponse.json({ message: 'Title already exists' }, { status: 400, headers: corsHeaders(origin) });
      }
    }

    const updated = await prisma.faq.update({
      where: { id },
      data: {
        faq_title: faq_title || faq.faq_title,
        faq_desc: faq_desc || faq.faq_desc,
      },
      select: {
        id: true,
        faq_title: true,
        faq_desc: true,
      },
    });

    return NextResponse.json({ message: 'FAQ updated successfully', data: updated }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
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
    const deleted = await prisma.faq.deleteMany({
      where: { id },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ message: 'FAQ not found' }, { status: 404, headers: corsHeaders(origin) });
    }

    return NextResponse.json({ message: 'FAQ deleted successfully' }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
