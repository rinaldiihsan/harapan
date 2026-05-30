// app/api/ketuayayasan/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';
import { corsHeaders, handleOptions } from '@/lib/cors';

const selectFields = {
  id: true,
  yayasanName: true,
  yayasanDesc: true,
  yayasanImage: true,
};

export async function OPTIONS(req: Request) {
  return handleOptions(req);
}

// GET by id — public
export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  const origin = req.headers.get('origin');
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400, headers: corsHeaders(origin) });
  }

  try {
    const data = await prisma.ketuaYayasan.findUnique({
      where: { id },
      select: selectFields,
    });

    if (!data) {
      return NextResponse.json({ message: 'Data tidak ditemukan' }, { status: 404, headers: corsHeaders(origin) });
    }

    return NextResponse.json({ data }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const origin = req.headers.get('origin');
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400, headers: corsHeaders(origin) });
  }

  try {
    const existing = await prisma.ketuaYayasan.findUnique({
      where: { id },
      select: { id: true, yayasanName: true, yayasanDesc: true, yayasanImage: true },
    });

    if (!existing) {
      return NextResponse.json({ message: 'Data tidak ditemukan' }, { status: 404, headers: corsHeaders(origin) });
    }

    const { fields, files } = await parseFormData(req);
    const { yayasanName, yayasanDesc } = fields;
    const imageFiles = files['yayasanImage'] ?? [];

    let yayasanImage = existing.yayasanImage;

    if (imageFiles.length > 0) {
      if (existing.yayasanImage) {
        await deleteFromCloudinary(existing.yayasanImage);
      }
      yayasanImage = await uploadToCloudinary(imageFiles[0].buffer, 'ketuayayasan', imageFiles[0].filename);
    }

    const updated = await prisma.ketuaYayasan.update({
      where: { id },
      data: {
        yayasanName: yayasanName || existing.yayasanName,
        yayasanDesc: yayasanDesc || existing.yayasanDesc,
        yayasanImage,
      },
      select: selectFields,
    });

    return NextResponse.json({ message: 'Berhasil mengupdate data ketua yayasan', data: updated }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500, headers: corsHeaders(origin) });
  }
}

// DELETE — protected
async function deleteHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const origin = req.headers.get('origin');
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400, headers: corsHeaders(origin) });
  }

  try {
    const existing = await prisma.ketuaYayasan.findUnique({
      where: { id },
      select: { id: true, yayasanImage: true },
    });

    if (!existing) {
      return NextResponse.json({ message: 'Data tidak ditemukan' }, { status: 404, headers: corsHeaders(origin) });
    }

    if (existing.yayasanImage) {
      await deleteFromCloudinary(existing.yayasanImage);
    }
    await prisma.ketuaYayasan.delete({ where: { id } });

    return NextResponse.json({ message: 'Berhasil menghapus data ketua yayasan' }, { status: 200, headers: corsHeaders(origin) });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
