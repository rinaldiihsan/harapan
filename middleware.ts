import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteksi semua route /admin/*
  if (pathname.startsWith('/admin')) {
    const refreshToken = request.cookies.get('refreshToken');

    if (!refreshToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Redirect jika sudah login tapi akses /auth/login
  if (pathname === '/auth/login') {
    const refreshToken = request.cookies.get('refreshToken');
    if (refreshToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/login'],
};
