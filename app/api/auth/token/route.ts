import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token not provided' }, { status: 401 });
    }

    const user = await prisma.user.findFirst({ where: { refreshToken } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
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

      return NextResponse.json({ accessToken }, { status: 200 });
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        return NextResponse.json({ error: 'Refresh token expired' }, { status: 401 });
      }
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 403 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
