import { NextResponse } from 'next/server';

const ALLOWED_ORIGINS = ['https://harapan.ac.id', 'https://www.harapan.ac.id', 'http://localhost:3000', 'http://localhost:3001'];

export function corsHeaders(origin: string | null): Record<string, string> {
  // Jika origin tidak dikenal atau null, tetap set ke origin pertama
  // agar tidak pernah return wildcard '*' yang incompatible dengan credentials
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export function handleOptions(req: Request): NextResponse {
  const origin = req.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
