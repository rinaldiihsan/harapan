// app/api/struktur-organisasi/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { corsHeaders, handleOptions } from '@/lib/cors';

export const revalidate = 60;

const selectFields = {
  id: true,
  image: true,
  description: true,
};

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

// GET — public, selalu hanya 1 record
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const data = await prisma.strukturOrganisasi.findFirst({
      select: selectFields,
    });
    return NextResponse.json({ data }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

// POST create — protected, hanya boleh 1 record
async function createHandler(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const existing = await prisma.strukturOrganisasi.findFirst({ select: { id: true } });
    if (existing) {
      return NextResponse.json({ message: 'Struktur organisasi sudah ada. Gunakan fitur edit untuk mengubahnya.' }, { status: 400, headers: corsHeaders(origin) });
    }

    const { fields, files } = await parseFormData(req);
    const { description } = fields;
    const imageFiles = files['image'] ?? [];

    if (imageFiles.length === 0) {
      return NextResponse.json({ message: 'Gambar struktur organisasi harus diisi' }, { status: 400, headers: corsHeaders(origin) });
    }

    const image = await uploadToCloudinary(imageFiles[0].buffer, 'struktur-organisasi', imageFiles[0].filename);

    const data = await prisma.strukturOrganisasi.create({
      data: { image, description: description ?? '' },
      select: selectFields,
    });

    return NextResponse.json({ message: 'Berhasil menambahkan struktur organisasi', data }, { status: 201, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

// PUT update — protected
async function updateHandler(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const existing = await prisma.strukturOrganisasi.findFirst({
      select: { id: true, image: true, description: true },
    });

    if (!existing) {
      return NextResponse.json({ message: 'Data tidak ditemukan. Buat data terlebih dahulu.' }, { status: 404, headers: corsHeaders(origin) });
    }

    const { fields, files } = await parseFormData(req);
    const { description } = fields;
    const imageFiles = files['image'] ?? [];

    let image = existing.image;

    if (imageFiles.length > 0) {
      await deleteFromCloudinary(existing.image);
      image = await uploadToCloudinary(imageFiles[0].buffer, 'struktur-organisasi', imageFiles[0].filename);
    }

    const updated = await prisma.strukturOrganisasi.update({
      where: { id: existing.id },
      data: {
        image,
        description: description ?? existing.description,
      },
      select: selectFields,
    });

    return NextResponse.json({ message: 'Berhasil mengupdate struktur organisasi', data: updated }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const POST = withAuth(createHandler);
export const PUT = withAuth(updateHandler);
