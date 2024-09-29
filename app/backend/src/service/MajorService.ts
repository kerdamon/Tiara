import { IMajor } from "@common/interfaces/IMajor.js";
import { Major, PrismaClient, Prisma } from "@prisma/client";

type MajorWithUniversity = Prisma.MajorGetPayload<{
  include: { university: true };
}>;

export interface MajorService {
  /**
   * @param query the query to be parsed by an external AI service
   * @returns An array of Majors sorted descendingly, by how much they mach the query
   */

  getMajorsByQuery(query: string): Promise<IMajor[]>;

  getAllMajors(): Promise<IMajor[]>;
}

export class MockMajorServiceImpl implements MajorService {
  prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMajorsByQuery(query: string): Promise<IMajor[]> {
    const result = this.prismaClient.major.findMany({
      take: 5,
      include: {
        university: true,
      }
    });
    return result.then((majors) =>
      majors.map((major) => {
        return this.mapMajorToDTO(major);
      }),
    );
  }

  getAllMajors(): Promise<IMajor[]> {
    const result = this.prismaClient.major.findMany({
      include: {
        university: true,
      },
    });
    return result.then((majors) =>
      majors.map((major) => {
        return this.mapMajorToDTO(major);
      }),
    );
  }

  private mapMajorToDTO(major: MajorWithUniversity): IMajor {
    return {
      name: major.majorName,
      description: major.description,
      university: major.university.name,
      faculty: major.faculty,
      studyField: major.studyField,
      studyLevel: major.studyLevel,
      voivodeship: major.voivodeship,
      studyForm: major.studyForm,
      studyProfile: major.studyProfile,
      semesters: major.semesters,
      numberOfGraduates: major.numberOfGraduates,
      jobSearchTime: major.timeOfLookingForJob,
      rank: major.ranking,
      imageUrl: this.getRandomImageUrl(),
      employmentSalary: major.employmentSalary,
    };
  }


  private getRandomImageUrl(): string {
    const urls: string[] = [
      "https://www.otouczelnie.pl/assets/uploads/dzial_artykul/0dde0-agh-kierunki-studiow.jpg",
      "https://www.agh.edu.pl/repozytoria/__processed__/6/b/csm_studia_studenci_biblioteka_cf6a9de5dd.jpg",
      "https://studia.uj.edu.pl/documents/144324303/145714961/wmii.uj_02.jpg"
    ];
    return urls[Math.floor(Math.random() * urls.length)] ?? "";
  }
}
