import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';

async function handler(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const user = await prisma.user.findUnique({
      where: { uuid: params.uuid as string },
      select: {
        id: true,
        uuid: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const GET = withAuth(handler);
