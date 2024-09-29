-- CreateTable
CREATE TABLE "University" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

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
    "description" TEXT NOT NULL DEFAULT 'Opis kierunku',
    "ranking" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
