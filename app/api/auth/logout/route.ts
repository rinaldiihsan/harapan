// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

export async function DELETE(req: NextRequest) {
  const origin = req.headers.get('origin');

  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (refreshToken) {
      const user = await prisma.user.findFirst({ where: { refreshToken } });
      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken: null },
        });
      }
    }

    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200, headers: corsHeaders(origin) });

    // Harus sama persis dengan waktu set agar browser hapus cookie
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}
