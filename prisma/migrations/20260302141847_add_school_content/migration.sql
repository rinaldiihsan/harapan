-- CreateEnum
CREATE TYPE "SchoolUnit" AS ENUM ('SD1', 'SD2', 'SD3', 'SMP1', 'SMP2', 'SMP3', 'SMA1', 'SMA3');

-- CreateTable
CREATE TABLE "SchoolContent" (
    "id" SERIAL NOT NULL,
    "school" "SchoolUnit" NOT NULL,
    "kepalaSekolah" TEXT,
    "visi" TEXT,
    "misi" TEXT[],
    "programUnggulan" TEXT[],
    "fasilitas" TEXT[],
    "ekstrakurikuler" TEXT[],
    "kegiatanSekolah" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolContent_school_key" ON "SchoolContent"("school");
