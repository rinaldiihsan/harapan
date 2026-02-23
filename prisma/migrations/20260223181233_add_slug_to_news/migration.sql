/*
  Warnings:

  - A unique constraint covering the columns `[news_slug]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `news_slug` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "news_slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "News_news_slug_key" ON "News"("news_slug");
