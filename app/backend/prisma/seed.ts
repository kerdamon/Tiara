import { PrismaClient, Major} from "@prisma/client";
import { AuthUtils } from "../src/service/auth/AuthUtils";
import fs from "fs";
const prisma = new PrismaClient();

interface IRawDataEnty {
  majorExternalCode: string;
  majorName: string;
  institutionName: string;
  studyField: string;
  studyLevel: string;
  voivodeship: string;
  studyForm: string;
  studyProfile: string;
  semesters: string;
  faculty: string;
  numberOfGraduates: number;
  employmentData: IEmploymentData;
  ranking: number,
  description: string,
}

interface IEmploymentData {
  salary: number;
  timeOfLookingForJob: number;
}

async function seedUser() {
  const password = "bleble";
  const { salt, passwordHash } = AuthUtils.generatePasswordHash(password);

  await prisma.user.upsert({
    where: {
      email: "example@gmail.com",
    },
    update: {},
    create: {
      email: "example@gmail.com",
      passwordHash,
      salt,
    }
  });
}

function seedDegrees() {
  const rawData: Record<string, IRawDataEnty> = JSON.parse(fs.readFileSync("./prisma/initial_data.json", "utf-8"));

  return Object.values(rawData).map((entry) => {
    return prisma.major.create({
      data: {
        majorName: entry.majorName,
        studyField: entry.studyField,
        studyLevel: entry.studyLevel,
        voivodeship: entry.voivodeship,
        studyForm: entry.studyForm,
        studyProfile: entry.studyProfile,
        semesters: entry.semesters,
        faculty: entry.faculty,
        numberOfGraduates: entry.numberOfGraduates,
        university: {
          connectOrCreate: {
            where: {
              name: entry.institutionName,
            },
            create: {
              name: entry.institutionName,
            }
          }
        },
        employmentSalary: entry.employmentData.salary,
        timeOfLookingForJob: entry.employmentData.timeOfLookingForJob,
        ranking: Math.floor(Math.random() * 10) + 1,
        description: entry.description,
      }
    })
  });
}

async function main() {
  await seedUser();
  await prisma.$transaction(seedDegrees());
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
