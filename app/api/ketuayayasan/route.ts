// app/api/ketuayayasan/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const revalidate = 60;

const selectFields = {
  id: true,
  yayasanName: true,
  yayasanDesc: true,
  yayasanImage: true,
};

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

// GET all — public
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const data = await prisma.ketuaYayasan.findMany({
      orderBy: { createdAt: 'desc' },
      select: selectFields,
    });

    return NextResponse.json({ data }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

// POST create — protected
async function createHandler(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { fields, files } = await parseFormData(req);
    const { yayasanName, yayasanDesc } = fields;

    if (!yayasanName || !yayasanDesc) {
      return NextResponse.json({ message: 'Nama dan deskripsi harus diisi' }, { status: 400, headers: corsHeaders(origin) });
    }

    const imageFiles = files['yayasanImage'] ?? [];

    let yayasanImage: string | null = null;
    if (imageFiles.length > 0) {
      yayasanImage = await uploadToCloudinary(imageFiles[0].buffer, 'ketuayayasan', imageFiles[0].filename);
    }

    const data = await prisma.ketuaYayasan.create({
      data: { yayasanName, yayasanDesc, yayasanImage },
      select: selectFields,
    });

    return NextResponse.json({ message: 'Berhasil menambahkan data ketua yayasan', data }, { status: 201, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const POST = withAuth(createHandler);
