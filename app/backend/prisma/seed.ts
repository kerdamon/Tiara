import { PrismaClient } from "@prisma/client";
import { AuthUtils } from "../src/service/auth/AuthUtils";

const prisma  = new PrismaClient();


async function main() {
  const password = "bleble"
  const {salt, passwordHash } = AuthUtils.generatePasswordHash(password)

  await prisma.user.create({
    data: {
      email: "example@gmail.com",
      passwordHash,
      salt,
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })

