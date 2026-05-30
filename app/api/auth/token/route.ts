// app/api/auth/token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '@/lib/auth';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');

  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token not provided' }, { status: 401, headers: corsHeaders(origin) });
    }

    const user = await prisma.user.findFirst({ where: { refreshToken } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403, headers: corsHeaders(origin) });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY!) as {
        id: number;
        name: string;
        email: string;
      };

      const accessToken = generateAccessToken({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      });

      return NextResponse.json({ accessToken }, { status: 200, headers: corsHeaders(origin) });
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        return NextResponse.json({ error: 'Refresh token expired' }, { status: 401, headers: corsHeaders(origin) });
      }
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403, headers: corsHeaders(origin) });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}
