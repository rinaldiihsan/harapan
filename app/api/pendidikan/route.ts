import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { getSchoolContent } from '@/lib/queries/school';

export const revalidate = 60;

const VALID_SCHOOLS = ['SD1', 'SD2', 'SD3', 'SMP1', 'SMP2', 'SMP3', 'SMA1', 'SMA3'] as const;
type SchoolUnit = (typeof VALID_SCHOOLS)[number];

function isValidSchool(value: string): value is SchoolUnit {
  return VALID_SCHOOLS.includes(value as SchoolUnit);
}

const selectFields = {
  id: true,
  school: true,
  kepalaSekolah: true,
  visi: true,
  misi: true,
  programUnggulan: true,
  fasilitas: true,
  ekstrakurikuler: true,
  kegiatanSekolah: true,
};

// GET /api/pendidikan?sekolah=SD1
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sekolah = searchParams.get('sekolah');

  if (!sekolah) {
    return NextResponse.json({ message: 'Parameter sekolah harus diisi' }, { status: 400 });
  }

  if (!isValidSchool(sekolah)) {
    return NextResponse.json({ message: `Sekolah tidak valid. Pilihan: ${VALID_SCHOOLS.join(', ')}` }, { status: 400 });
  }

  try {
    const data = await getSchoolContent(sekolah);

    return NextResponse.json({ data: data ?? null }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

// PUT /api/pendidikan?sekolah=SD1 — protected, upsert
async function updateHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sekolah = searchParams.get('sekolah');

  if (!sekolah) {
    return NextResponse.json({ message: 'Parameter sekolah harus diisi' }, { status: 400 });
  }

  if (!isValidSchool(sekolah)) {
    return NextResponse.json({ message: `Sekolah tidak valid. Pilihan: ${VALID_SCHOOLS.join(', ')}` }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { kepalaSekolah, visi, misi, programUnggulan, fasilitas, ekstrakurikuler, kegiatanSekolah } = body;

    // Validasi tipe array
    const arrayFields = { misi, programUnggulan, fasilitas, ekstrakurikuler, kegiatanSekolah };
    for (const [key, value] of Object.entries(arrayFields)) {
      if (value !== undefined && !Array.isArray(value)) {
        return NextResponse.json({ message: `Field ${key} harus berupa array` }, { status: 400 });
      }
    }

    const data = await prisma.schoolContent.upsert({
      where: { school: sekolah },
      update: {
        ...(kepalaSekolah !== undefined && { kepalaSekolah }),
        ...(visi !== undefined && { visi }),
        ...(misi !== undefined && { misi }),
        ...(programUnggulan !== undefined && { programUnggulan }),
        ...(fasilitas !== undefined && { fasilitas }),
        ...(ekstrakurikuler !== undefined && { ekstrakurikuler }),
        ...(kegiatanSekolah !== undefined && { kegiatanSekolah }),
      },
      create: {
        school: sekolah,
        kepalaSekolah: kepalaSekolah ?? null,
        visi: visi ?? null,
        misi: misi ?? [],
        programUnggulan: programUnggulan ?? [],
        fasilitas: fasilitas ?? [],
        ekstrakurikuler: ekstrakurikuler ?? [],
        kegiatanSekolah: kegiatanSekolah ?? [],
      },
      select: selectFields,
    });

    return NextResponse.json({ message: `Konten ${sekolah} berhasil disimpan`, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

export const PUT = withAuth(updateHandler);
