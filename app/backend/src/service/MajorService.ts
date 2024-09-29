import { IMajor } from "@common/interfaces/IMajor.js";
import { Major, PrismaClient } from "@prisma/client";

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
    });
    return result.then((majors) =>
      majors.map((major) => {
        return this.mapMajorToIMajor(major);
      })
    );
  }

  getAllMajors(): Promise<IMajor[]> {
    const result = this.prismaClient.major.findMany();
    return result.then((majors) =>
      majors.map((major) => {
        return this.mapMajorToIMajor(major);
      })
    );
  }

  mapMajorToIMajor(major: Major) {
    return {
      name: major.majorName,
      university: String(major.universityId), //TODO: map ids to proper names,
      faculty: major.faculty,
      studyField: major.studyField,
      studyLevel: major.studyLevel,
      voivodeship: major.voivodeship,
      studyForm: major.studyForm,
      studyProfile: major.studyProfile,
      semesters: major.semesters,
      city: "Kraków", //TODO: add city to database
      numberOfGraduates: major.numberOfGraduates,
      jobSearchTime: major.timeOfLookingForJob,
      rank: 1, //TODO: add perspektywy.pl rank to db
      unemploymentPercent: 0.5, //TODO: add to db
      imageUrl: "https://dupakupa", //TODO: add to db
      employmentSalary: major.employmentSalary,
    };
  }
}
