import { prisma } from '@/lib/prisma';

export async function getSchoolContent(school: string) {
  return prisma.schoolContent.findUnique({
    where: { school: school as any },
  });
}
