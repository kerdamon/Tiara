import {PrismaClient, Major} from "@prisma/client";

export interface MajorService {
  /**
   * @param query the query to be parsed by an external AI service
   * @returns An array of Majors sorted descendingly, by how much they mach the query
   */

  getMajorsByQuery(query: string): Promise<Major[]>;

  getAllMajors(): Promise<Major[]>;
}

export class MockMajorServiceImpl implements MajorService {
  prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMajorsByQuery(query: string): Promise<Major[]> {
    return this.prismaClient.major.findMany({
      take: 5
    })
  }

  getAllMajors(): Promise<Major[]> {
    return this.prismaClient.major.findMany();
  }
}
