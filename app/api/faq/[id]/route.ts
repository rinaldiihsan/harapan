import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const faq = await prisma.faq.findUnique({
      where: { id: Number(params.id) },
    });

    if (!faq) {
      return NextResponse.json({ message: 'FAQ not found' }, { status: 404 });
    }

    const { faq_title, faq_desc } = await req.json();

    // Kalau title berubah, cek duplikat
    if (faq_title && faq_title !== faq.faq_title) {
      const existing = await prisma.faq.findUnique({ where: { faq_title } });
      if (existing) {
        return NextResponse.json({ message: 'Title already exists' }, { status: 400 });
      }
    }

    const updated = await prisma.faq.update({
      where: { id: Number(params.id) },
      data: {
        faq_title: faq_title || faq.faq_title,
        faq_desc: faq_desc || faq.faq_desc,
      },
    });

    return NextResponse.json({ message: 'FAQ updated successfully', data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

// DELETE — protected
async function deleteHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const faq = await prisma.faq.findUnique({
      where: { id: Number(params.id) },
    });

    if (!faq) {
      return NextResponse.json({ message: 'FAQ not found' }, { status: 404 });
    }

    await prisma.faq.delete({ where: { id: Number(params.id) } });

    return NextResponse.json({ message: 'FAQ deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
