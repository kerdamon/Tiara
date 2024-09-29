/*
  Warnings:

  - You are about to drop the `Degree` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Degree" DROP CONSTRAINT "Degree_universityId_fkey";

-- DropTable
DROP TABLE "Degree";

-- CreateTable
CREATE TABLE "Major" (
    "id" SERIAL NOT NULL,
    "majorName" TEXT NOT NULL,
    "studyField" TEXT NOT NULL,
    "studyLevel" TEXT NOT NULL,
    "voivodeship" TEXT NOT NULL,
    "studyForm" TEXT NOT NULL,
    "studyProfile" TEXT NOT NULL,
    "semesters" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "numberOfGraduates" INTEGER NOT NULL,
    "employmentSalary" DOUBLE PRECISION NOT NULL,
    "timeOfLookingForJob" DOUBLE PRECISION NOT NULL,
    "universityId" INTEGER NOT NULL,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
