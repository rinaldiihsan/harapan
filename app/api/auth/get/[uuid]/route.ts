// app/api/auth/get/[uuid]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

async function handler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const origin = req.headers.get('origin');

  try {
    const user = await prisma.user.findUnique({
      where: { uuid: params.uuid },
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
      return NextResponse.json({ message: 'User not found' }, { status: 404, headers: corsHeaders(origin) });
    }

    return NextResponse.json({ data: user }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const GET = withAuth(handler);
