import { AuthUtils } from "@/service/auth/AuthUtils.js";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
const testUserEmail = "test@gmail.com";
const testUserPasswordText = "dupakupa123";

describe("PosgreSQL user integration test", () => {
  beforeAll(async () => {
    const { salt, passwordHash } =
      AuthUtils.generatePasswordHash(testUserPasswordText);

    await prisma.user.create({
      data: {
        email: testUserEmail,
        passwordHash,
        salt,
      },
    });
  });

  afterAll(async () => {
    const deleteUsers = prisma.user.delete({
      where: {
        email: testUserEmail,
      },
    });

    await prisma.$transaction([deleteUsers]);

    await prisma.$disconnect();
  });

  it("should correctly create a new user", async () => {
    const email = "test2@gmail.com";
    const password = "bubabiba";
    const { salt, passwordHash } = AuthUtils.generatePasswordHash(password);
    const user = {
      email,
      salt,
      passwordHash,
    };

    await prisma.user.create({ data: user });

    const foundUser = await prisma.user.findFirst({
      where: {
        passwordHash: AuthUtils.hashPassword(password, salt),
      },
    });

    expect(foundUser?.email).toBe(email);

    await prisma.user.delete({
      where: {
        email,
      },
    });
  });
});
