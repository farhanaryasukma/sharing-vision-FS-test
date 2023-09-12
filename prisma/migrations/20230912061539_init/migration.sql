/*
  Warnings:

  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Category` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `Content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `Created_date` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `Updated_date` on the `posts` table. All the data in the column will be lost.
  - Added the required column `category` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_date` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_date` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP CONSTRAINT "posts_pkey",
DROP COLUMN "Category",
DROP COLUMN "Content",
DROP COLUMN "Created_date",
DROP COLUMN "Id",
DROP COLUMN "Status",
DROP COLUMN "Title",
DROP COLUMN "Updated_date",
ADD COLUMN     "category" VARCHAR(100) NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "created_date" TIMESTAMP NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "status" VARCHAR(100) NOT NULL,
ADD COLUMN     "title" VARCHAR(200) NOT NULL,
ADD COLUMN     "updated_date" TIMESTAMP NOT NULL,
ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");
