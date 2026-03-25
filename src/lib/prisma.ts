import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createPrismaClient() {
  return new PrismaClient()
}

// Lazy initialization to avoid build-time errors when DATABASE_URL is not set
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient()
    }
    const client = globalForPrisma.prisma
    const value = (client as unknown as Record<string | symbol, unknown>)[prop]
    if (typeof value === "function") {
      return value.bind(client)
    }
    return value
  },
})
