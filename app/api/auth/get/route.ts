import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function handler(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        uuid: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const GET = withAuth(handler);
