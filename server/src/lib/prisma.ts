import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "./env";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
}).$extends(withAccelerate());

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
