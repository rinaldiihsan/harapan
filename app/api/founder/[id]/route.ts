import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';

const selectFields = {
  id: true,
  name: true,
  photo: true,
  order: true,
};

// PUT update — protected
async function updateHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

  try {
    const existing = await prisma.founder.findUnique({
      where: { id },
      select: { id: true, name: true, photo: true, order: true },
    });

    if (!existing) return NextResponse.json({ message: 'Data tidak ditemukan' }, { status: 404 });

    const { fields, files } = await parseFormData(req);
    const { name, order } = fields;
    const imageFiles = files['photo'] ?? [];

    let photo = existing.photo;

    if (imageFiles.length > 0) {
      await deleteFromCloudinary(existing.photo);
      photo = await uploadToCloudinary(imageFiles[0].buffer, 'founder', imageFiles[0].filename);
    }

    const updated = await prisma.founder.update({
      where: { id },
      data: {
        name: name || existing.name,
        photo,
        order: order !== undefined ? parseInt(order) : existing.order,
      },
      select: selectFields,
    });

    return NextResponse.json({ message: 'Berhasil mengupdate pendiri', data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — protected
async function deleteHandler(req: NextRequest, { params }: { params: Record<string, string> }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

  try {
    const existing = await prisma.founder.findUnique({
      where: { id },
      select: { id: true, photo: true },
    });

    if (!existing) return NextResponse.json({ message: 'Data tidak ditemukan' }, { status: 404 });

    await deleteFromCloudinary(existing.photo);
    await prisma.founder.delete({ where: { id } });

    return NextResponse.json({ message: 'Berhasil menghapus pendiri' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
