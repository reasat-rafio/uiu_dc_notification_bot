/*
  Warnings:

  - You are about to drop the `data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "data";

-- CreateTable
CREATE TABLE "notice" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notice.title_index" ON "notice"("title");
