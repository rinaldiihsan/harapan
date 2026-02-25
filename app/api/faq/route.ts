import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';

// Cache 60 detik — data FAQ jarang berubah
export const revalidate = 60;

// GET all faq — public
export async function GET() {
  try {
    const faq = await prisma.faq.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        faq_title: true,
        faq_desc: true,
      },
    });

    return NextResponse.json({ data: faq }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

// POST create faq — protected
async function createHandler(req: NextRequest) {
  try {
    const { faq_title, faq_desc } = await req.json();

    if (!faq_title || !faq_desc) {
      return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
    }

    // Cek count dan duplikat secara paralel — lebih efisien
    const [faqCount, existing] = await Promise.all([prisma.faq.count(), prisma.faq.findUnique({ where: { faq_title } })]);

    if (faqCount >= 6) {
      return NextResponse.json({ message: 'Maximum number of FAQs reached' }, { status: 400 });
    }

    if (existing) {
      return NextResponse.json({ message: 'Title already exists' }, { status: 400 });
    }

    const faq = await prisma.faq.create({
      data: { faq_title, faq_desc },
      select: {
        id: true,
        faq_title: true,
        faq_desc: true,
      },
    });

    return NextResponse.json({ message: 'FAQ created successfully', data: faq }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const POST = withAuth(createHandler);
