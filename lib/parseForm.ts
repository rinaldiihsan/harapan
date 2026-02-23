import { NextRequest } from 'next/server';

export const parseFormData = async (
  req: NextRequest,
): Promise<{
  fields: Record<string, string>;
  files: Record<string, { buffer: Buffer; filename: string; mimetype: string }[]>;
}> => {
  const formData = await req.formData();
  const fields: Record<string, string> = {};
  const files: Record<string, { buffer: Buffer; filename: string; mimetype: string }[]> = {};

  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 3 * 1024 * 1024; // 3MB

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      if (!allowedMimeTypes.includes(value.type)) {
        throw new Error(`Format file tidak didukung: ${value.name}`);
      }

      if (value.size > maxSize) {
        throw new Error(`Ukuran file terlalu besar (maks 3MB): ${value.name}`);
      }

      const buffer = Buffer.from(await value.arrayBuffer());

      if (!files[key]) files[key] = [];
      files[key].push({
        buffer,
        filename: value.name,
        mimetype: value.type,
      });
    } else {
      fields[key] = value;
    }
  }

  return { fields, files };
};
