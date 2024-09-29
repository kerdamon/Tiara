-- AlterTable
ALTER TABLE "Major" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Opis kierunku',
ADD COLUMN     "ranking" INTEGER NOT NULL DEFAULT -1;
