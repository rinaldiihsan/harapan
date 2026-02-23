import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';

// GET all — public
export async function GET() {
  try {
    const data = await prisma.ketuaYayasan.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

// POST create — protected
async function createHandler(req: NextRequest) {
  try {
    const { fields, files } = await parseFormData(req);
    const { yayasanName, yayasanDesc } = fields;

    if (!yayasanName || !yayasanDesc) {
      return NextResponse.json({ message: 'Nama dan deskripsi harus diisi' }, { status: 400 });
    }

    const imageFiles = files['yayasanImage'] ?? [];

    let yayasanImage: string | null = null;
    if (imageFiles.length > 0) {
      yayasanImage = await uploadToCloudinary(imageFiles[0].buffer, 'ketuayayasan', imageFiles[0].filename);
    }

    const data = await prisma.ketuaYayasan.create({
      data: {
        yayasanName,
        yayasanDesc,
        yayasanImage,
      },
    });

    return NextResponse.json({ message: 'Berhasil menambahkan data ketua yayasan', data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

export const POST = withAuth(createHandler);
