import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { parseFormData } from '@/lib/parseForm';

// GET all carousel — public
export async function GET() {
  try {
    const carousel = await prisma.carousel.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: carousel }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

// POST create carousel — protected
async function createHandler(req: NextRequest) {
  try {
    const { fields, files } = await parseFormData(req);
    const { carousel_caption, carousel_desc } = fields;

    if (!carousel_caption || !carousel_desc) {
      return NextResponse.json({ message: 'Caption and description are required' }, { status: 400 });
    }

    const imageFiles = files['carousel_image'] ?? [];
    if (imageFiles.length === 0) {
      return NextResponse.json({ message: 'Image is required' }, { status: 400 });
    }

    const imageUrl = await uploadToCloudinary(imageFiles[0].buffer, 'carousel', imageFiles[0].filename);

    const carousel = await prisma.carousel.create({
      data: {
        carousel_image: imageUrl,
        carousel_caption,
        carousel_desc,
      },
    });

    return NextResponse.json({ message: 'Carousel created successfully', data: carousel }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message ?? 'Internal Server Error' }, { status: 500 });
  }
}

export const POST = withAuth(createHandler);
