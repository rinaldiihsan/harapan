// app/api/program-unggulan/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const revalidate = 60;

const selectFields = {
  id: true,
  name: true,
  photo: true,
  order: true,
};

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

// GET all — public
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const data = await prisma.programUnggulan.findMany({
      orderBy: { order: 'asc' },
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
    const { name, order } = fields;

    if (!name) {
      return NextResponse.json({ message: 'Nama program harus diisi' }, { status: 400, headers: corsHeaders(origin) });
    }

    const imageFiles = files['photo'] ?? [];
    if (imageFiles.length === 0) {
      return NextResponse.json({ message: 'Foto program harus diisi' }, { status: 400, headers: corsHeaders(origin) });
    }

    const photo = await uploadToCloudinary(imageFiles[0].buffer, 'program-unggulan', imageFiles[0].filename);

    const data = await prisma.programUnggulan.create({
      data: { name, photo, order: order ? parseInt(order) : 0 },
      select: selectFields,
    });

    return NextResponse.json({ message: 'Berhasil menambahkan program unggulan', data }, { status: 201, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const POST = withAuth(createHandler);
