// app/api/founder/route.ts

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

// GET all — public, sort by order asc
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const data = await prisma.founder.findMany({
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
      return NextResponse.json({ message: 'Nama pendiri harus diisi' }, { status: 400, headers: corsHeaders(origin) });
    }

    const imageFiles = files['photo'] ?? [];
    if (imageFiles.length === 0) {
      return NextResponse.json({ message: 'Foto pendiri harus diisi' }, { status: 400, headers: corsHeaders(origin) });
    }

    const photo = await uploadToCloudinary(imageFiles[0].buffer, 'founder', imageFiles[0].filename);

    const data = await prisma.founder.create({
      data: {
        name,
        photo,
        order: order ? parseInt(order) : 0,
      },
      select: selectFields,
    });

    return NextResponse.json({ message: 'Berhasil menambahkan pendiri', data }, { status: 201, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const POST = withAuth(createHandler);
