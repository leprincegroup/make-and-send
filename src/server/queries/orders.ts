import { prisma } from "@/lib/prisma";

export async function getOrdersByEmail(email: string) {
  return prisma.order.findMany({
    where: { buyerEmail: email },
    include: {
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      proofs: {
        orderBy: { version: "desc" },
        take: 1,
      },
      statusHistory: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
