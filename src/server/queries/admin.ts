import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@prisma/client";

// ---------------------------------------------------------------------------
// Mock data — used when the DB is not connected. Structured to match Prisma
// return types so the swap is seamless.
// ---------------------------------------------------------------------------

const MOCK_ORDERS = [
  {
    id: "ord_1",
    orderNumber: "MAS-2026-A1B2C",
    userId: "usr_1",
    organizationId: null,
    status: "PAID" as OrderStatus,
    buyerEmail: "sarah@acme.com",
    buyerFirstName: "Sarah",
    buyerLastName: "Chen",
    materialTier: "STANDARD" as const,
    subtotal: 258,
    discountPercent: 0,
    discountAmount: 0,
    total: 258,
    stripePaymentId: "pi_mock_1",
    stripeSessionId: null,
    shipToOneAddress: true,
    sharedAddress: {
      line1: "123 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "US",
    },
    isGift: false,
    giftMessage: null,
    giftToken: null,
    createdAt: new Date("2026-03-20T10:00:00Z"),
    updatedAt: new Date("2026-03-20T10:00:00Z"),
    items: [
      {
        id: "itm_1",
        orderId: "ord_1",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Mike Johnson",
        plaqueText: "Top Seller 2026",
        photoUrl: "/images/placeholder.jpg",
        photoName: "mike.jpg",
        shippingAddress: null,
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-20T10:00:00Z"),
        updatedAt: new Date("2026-03-20T10:00:00Z"),
      },
      {
        id: "itm_2",
        orderId: "ord_1",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Lisa Park",
        plaqueText: "Welcome to the team!",
        photoUrl: "/images/placeholder.jpg",
        photoName: "lisa.jpg",
        shippingAddress: null,
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-20T10:00:00Z"),
        updatedAt: new Date("2026-03-20T10:00:00Z"),
      },
    ],
    proofs: [],
    statusHistory: [
      {
        id: "ev_1",
        orderId: "ord_1",
        status: "PAID" as OrderStatus,
        note: "Payment received via Stripe",
        createdAt: new Date("2026-03-20T10:05:00Z"),
      },
      {
        id: "ev_0",
        orderId: "ord_1",
        status: "PENDING_PAYMENT" as OrderStatus,
        note: null,
        createdAt: new Date("2026-03-20T10:00:00Z"),
      },
    ],
    user: { id: "usr_1", name: "Sarah Chen", email: "sarah@acme.com" },
    organization: null,
  },
  {
    id: "ord_2",
    orderNumber: "MAS-2026-D3E4F",
    userId: "usr_2",
    organizationId: null,
    status: "IN_PRODUCTION" as OrderStatus,
    buyerEmail: "james@bigcorp.io",
    buyerFirstName: "James",
    buyerLastName: "Wilson",
    materialTier: "STANDARD" as const,
    subtotal: 645,
    discountPercent: 10,
    discountAmount: 64.5,
    total: 580.5,
    stripePaymentId: "pi_mock_2",
    stripeSessionId: null,
    shipToOneAddress: false,
    sharedAddress: null,
    isGift: true,
    giftMessage: "Thank you for an amazing year!",
    giftToken: null,
    createdAt: new Date("2026-03-18T14:30:00Z"),
    updatedAt: new Date("2026-03-19T09:00:00Z"),
    items: [
      {
        id: "itm_3",
        orderId: "ord_2",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Alice Martin",
        plaqueText: "5 Year Anniversary",
        photoUrl: "/images/placeholder.jpg",
        photoName: "alice.jpg",
        shippingAddress: {
          line1: "456 Oak Ave",
          city: "Austin",
          state: "TX",
          zip: "73301",
          country: "US",
        },
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-18T14:30:00Z"),
        updatedAt: new Date("2026-03-18T14:30:00Z"),
      },
      {
        id: "itm_4",
        orderId: "ord_2",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Bob Taylor",
        plaqueText: "MVP Award",
        photoUrl: "/images/placeholder.jpg",
        photoName: "bob.jpg",
        shippingAddress: {
          line1: "789 Pine St",
          city: "Denver",
          state: "CO",
          zip: "80201",
          country: "US",
        },
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-18T14:30:00Z"),
        updatedAt: new Date("2026-03-18T14:30:00Z"),
      },
      {
        id: "itm_5",
        orderId: "ord_2",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Carol Davis",
        plaqueText: "Top Performer",
        photoUrl: "/images/placeholder.jpg",
        photoName: "carol.jpg",
        shippingAddress: {
          line1: "321 Elm Dr",
          city: "Seattle",
          state: "WA",
          zip: "98101",
          country: "US",
        },
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-18T14:30:00Z"),
        updatedAt: new Date("2026-03-18T14:30:00Z"),
      },
      {
        id: "itm_6",
        orderId: "ord_2",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Dan Brown",
        plaqueText: "Sales Champion",
        photoUrl: "/images/placeholder.jpg",
        photoName: "dan.jpg",
        shippingAddress: {
          line1: "654 Maple Ln",
          city: "Portland",
          state: "OR",
          zip: "97201",
          country: "US",
        },
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-18T14:30:00Z"),
        updatedAt: new Date("2026-03-18T14:30:00Z"),
      },
      {
        id: "itm_7",
        orderId: "ord_2",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Eve White",
        plaqueText: "Client Hero",
        photoUrl: "/images/placeholder.jpg",
        photoName: "eve.jpg",
        shippingAddress: {
          line1: "987 Cedar Ct",
          city: "Chicago",
          state: "IL",
          zip: "60601",
          country: "US",
        },
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-18T14:30:00Z"),
        updatedAt: new Date("2026-03-18T14:30:00Z"),
      },
    ],
    proofs: [],
    statusHistory: [
      {
        id: "ev_4",
        orderId: "ord_2",
        status: "IN_PRODUCTION" as OrderStatus,
        note: "Started sculpting",
        createdAt: new Date("2026-03-19T09:00:00Z"),
      },
      {
        id: "ev_3",
        orderId: "ord_2",
        status: "PAID" as OrderStatus,
        note: "Payment received",
        createdAt: new Date("2026-03-18T14:35:00Z"),
      },
      {
        id: "ev_2",
        orderId: "ord_2",
        status: "PENDING_PAYMENT" as OrderStatus,
        note: null,
        createdAt: new Date("2026-03-18T14:30:00Z"),
      },
    ],
    user: { id: "usr_2", name: "James Wilson", email: "james@bigcorp.io" },
    organization: null,
  },
  {
    id: "ord_3",
    orderNumber: "MAS-2026-G5H6I",
    userId: "usr_3",
    organizationId: null,
    status: "PROOF_REVISION" as OrderStatus,
    buyerEmail: "maria@startup.co",
    buyerFirstName: "Maria",
    buyerLastName: "Garcia",
    materialTier: "STANDARD" as const,
    subtotal: 129,
    discountPercent: 0,
    discountAmount: 0,
    total: 129,
    stripePaymentId: "pi_mock_3",
    stripeSessionId: null,
    shipToOneAddress: true,
    sharedAddress: {
      line1: "555 Broadway",
      city: "New York",
      state: "NY",
      zip: "10012",
      country: "US",
    },
    isGift: false,
    giftMessage: null,
    giftToken: null,
    createdAt: new Date("2026-03-15T08:00:00Z"),
    updatedAt: new Date("2026-03-22T11:00:00Z"),
    items: [
      {
        id: "itm_8",
        orderId: "ord_3",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Tom Richards",
        plaqueText: "Founding Engineer",
        photoUrl: "/images/placeholder.jpg",
        photoName: "tom.jpg",
        shippingAddress: null,
        aiPreviewUrl: null,
        proofStatus: "REVISION_REQUESTED" as const,
        trackingNumber: null,
        createdAt: new Date("2026-03-15T08:00:00Z"),
        updatedAt: new Date("2026-03-22T11:00:00Z"),
      },
    ],
    proofs: [
      {
        id: "prf_1",
        orderId: "ord_3",
        version: 1,
        status: "REVISION_REQUESTED" as const,
        imageUrls: ["/images/placeholder.jpg"],
        approvalToken: "tok_mock_1",
        approvedAt: null,
        revisionNotes: "The hair color is too dark, should be lighter brown.",
        createdAt: new Date("2026-03-21T16:00:00Z"),
        updatedAt: new Date("2026-03-22T11:00:00Z"),
      },
    ],
    statusHistory: [
      {
        id: "ev_8",
        orderId: "ord_3",
        status: "PROOF_REVISION" as OrderStatus,
        note: "Customer requested revision: hair color",
        createdAt: new Date("2026-03-22T11:00:00Z"),
      },
      {
        id: "ev_7",
        orderId: "ord_3",
        status: "PROOF_READY" as OrderStatus,
        note: "Proof sent to customer",
        createdAt: new Date("2026-03-21T16:00:00Z"),
      },
      {
        id: "ev_6",
        orderId: "ord_3",
        status: "IN_PRODUCTION" as OrderStatus,
        note: null,
        createdAt: new Date("2026-03-16T09:00:00Z"),
      },
      {
        id: "ev_5",
        orderId: "ord_3",
        status: "PAID" as OrderStatus,
        note: null,
        createdAt: new Date("2026-03-15T08:05:00Z"),
      },
    ],
    user: { id: "usr_3", name: "Maria Garcia", email: "maria@startup.co" },
    organization: null,
  },
  {
    id: "ord_4",
    orderNumber: "MAS-2026-J7K8L",
    userId: "usr_4",
    organizationId: null,
    status: "SHIPPING" as OrderStatus,
    buyerEmail: "dave@enterprise.com",
    buyerFirstName: "Dave",
    buyerLastName: "Thompson",
    materialTier: "STANDARD" as const,
    subtotal: 129,
    discountPercent: 0,
    discountAmount: 0,
    total: 129,
    stripePaymentId: "pi_mock_4",
    stripeSessionId: null,
    shipToOneAddress: true,
    sharedAddress: {
      line1: "100 Tech Blvd",
      city: "San Jose",
      state: "CA",
      zip: "95110",
      country: "US",
    },
    isGift: true,
    giftMessage: "Congrats on the promotion!",
    giftToken: null,
    createdAt: new Date("2026-03-10T12:00:00Z"),
    updatedAt: new Date("2026-03-23T15:00:00Z"),
    items: [
      {
        id: "itm_9",
        orderId: "ord_4",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Rachel Kim",
        plaqueText: "VP of Engineering",
        photoUrl: "/images/placeholder.jpg",
        photoName: "rachel.jpg",
        shippingAddress: null,
        aiPreviewUrl: null,
        proofStatus: "APPROVED" as const,
        trackingNumber: "1Z999AA10123456784",
        createdAt: new Date("2026-03-10T12:00:00Z"),
        updatedAt: new Date("2026-03-23T15:00:00Z"),
      },
    ],
    proofs: [
      {
        id: "prf_2",
        orderId: "ord_4",
        version: 1,
        status: "APPROVED" as const,
        imageUrls: ["/images/placeholder.jpg"],
        approvalToken: "tok_mock_2",
        approvedAt: new Date("2026-03-20T10:00:00Z"),
        revisionNotes: null,
        createdAt: new Date("2026-03-19T14:00:00Z"),
        updatedAt: new Date("2026-03-20T10:00:00Z"),
      },
    ],
    statusHistory: [
      {
        id: "ev_12",
        orderId: "ord_4",
        status: "SHIPPING" as OrderStatus,
        note: "Tracking: 1Z999AA10123456784",
        createdAt: new Date("2026-03-23T15:00:00Z"),
      },
      {
        id: "ev_11",
        orderId: "ord_4",
        status: "PROOF_APPROVED" as OrderStatus,
        note: "Customer approved proof",
        createdAt: new Date("2026-03-20T10:00:00Z"),
      },
      {
        id: "ev_10",
        orderId: "ord_4",
        status: "PROOF_READY" as OrderStatus,
        note: null,
        createdAt: new Date("2026-03-19T14:00:00Z"),
      },
      {
        id: "ev_9",
        orderId: "ord_4",
        status: "IN_PRODUCTION" as OrderStatus,
        note: null,
        createdAt: new Date("2026-03-11T09:00:00Z"),
      },
    ],
    user: {
      id: "usr_4",
      name: "Dave Thompson",
      email: "dave@enterprise.com",
    },
    organization: null,
  },
  {
    id: "ord_5",
    orderNumber: "MAS-2026-M9N0P",
    userId: "usr_5",
    organizationId: null,
    status: "DELIVERED" as OrderStatus,
    buyerEmail: "anna@design.co",
    buyerFirstName: "Anna",
    buyerLastName: "Lee",
    materialTier: "STANDARD" as const,
    subtotal: 258,
    discountPercent: 0,
    discountAmount: 0,
    total: 258,
    stripePaymentId: "pi_mock_5",
    stripeSessionId: null,
    shipToOneAddress: true,
    sharedAddress: {
      line1: "200 Creative Way",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "US",
    },
    isGift: false,
    giftMessage: null,
    giftToken: null,
    createdAt: new Date("2026-03-01T09:00:00Z"),
    updatedAt: new Date("2026-03-15T18:00:00Z"),
    items: [
      {
        id: "itm_10",
        orderId: "ord_5",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Chris Patel",
        plaqueText: "Design Lead",
        photoUrl: "/images/placeholder.jpg",
        photoName: "chris.jpg",
        shippingAddress: null,
        aiPreviewUrl: null,
        proofStatus: "APPROVED" as const,
        trackingNumber: "1Z999AA10123456785",
        createdAt: new Date("2026-03-01T09:00:00Z"),
        updatedAt: new Date("2026-03-15T18:00:00Z"),
      },
      {
        id: "itm_11",
        orderId: "ord_5",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Nina Zhao",
        plaqueText: "Creative Director",
        photoUrl: "/images/placeholder.jpg",
        photoName: "nina.jpg",
        shippingAddress: null,
        aiPreviewUrl: null,
        proofStatus: "APPROVED" as const,
        trackingNumber: "1Z999AA10123456786",
        createdAt: new Date("2026-03-01T09:00:00Z"),
        updatedAt: new Date("2026-03-15T18:00:00Z"),
      },
    ],
    proofs: [
      {
        id: "prf_3",
        orderId: "ord_5",
        version: 1,
        status: "APPROVED" as const,
        imageUrls: ["/images/placeholder.jpg"],
        approvalToken: "tok_mock_3",
        approvedAt: new Date("2026-03-10T12:00:00Z"),
        revisionNotes: null,
        createdAt: new Date("2026-03-08T11:00:00Z"),
        updatedAt: new Date("2026-03-10T12:00:00Z"),
      },
    ],
    statusHistory: [
      {
        id: "ev_16",
        orderId: "ord_5",
        status: "DELIVERED" as OrderStatus,
        note: "Package delivered",
        createdAt: new Date("2026-03-15T18:00:00Z"),
      },
      {
        id: "ev_15",
        orderId: "ord_5",
        status: "SHIPPING" as OrderStatus,
        note: null,
        createdAt: new Date("2026-03-12T10:00:00Z"),
      },
    ],
    user: { id: "usr_5", name: "Anna Lee", email: "anna@design.co" },
    organization: null,
  },
  {
    id: "ord_6",
    orderNumber: "MAS-2026-Q1R2S",
    userId: "usr_6",
    organizationId: null,
    status: "PENDING_PAYMENT" as OrderStatus,
    buyerEmail: "frank@agency.io",
    buyerFirstName: "Frank",
    buyerLastName: "Rivera",
    materialTier: "STANDARD" as const,
    subtotal: 387,
    discountPercent: 0,
    discountAmount: 0,
    total: 387,
    stripePaymentId: null,
    stripeSessionId: null,
    shipToOneAddress: true,
    sharedAddress: null,
    isGift: false,
    giftMessage: null,
    giftToken: null,
    createdAt: new Date("2026-03-24T16:00:00Z"),
    updatedAt: new Date("2026-03-24T16:00:00Z"),
    items: [
      {
        id: "itm_12",
        orderId: "ord_6",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Grace Hopper",
        plaqueText: "Engineering Pioneer",
        photoUrl: "/images/placeholder.jpg",
        photoName: "grace.jpg",
        shippingAddress: null,
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-24T16:00:00Z"),
        updatedAt: new Date("2026-03-24T16:00:00Z"),
      },
      {
        id: "itm_13",
        orderId: "ord_6",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Alan Turing",
        plaqueText: "Code Breaker",
        photoUrl: "/images/placeholder.jpg",
        photoName: "alan.jpg",
        shippingAddress: null,
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-24T16:00:00Z"),
        updatedAt: new Date("2026-03-24T16:00:00Z"),
      },
      {
        id: "itm_14",
        orderId: "ord_6",
        materialTier: "STANDARD" as const,
        unitPrice: 129,
        recipientName: "Ada Lovelace",
        plaqueText: "First Programmer",
        photoUrl: "/images/placeholder.jpg",
        photoName: "ada.jpg",
        shippingAddress: null,
        aiPreviewUrl: null,
        proofStatus: null,
        trackingNumber: null,
        createdAt: new Date("2026-03-24T16:00:00Z"),
        updatedAt: new Date("2026-03-24T16:00:00Z"),
      },
    ],
    proofs: [],
    statusHistory: [
      {
        id: "ev_17",
        orderId: "ord_6",
        status: "PENDING_PAYMENT" as OrderStatus,
        note: null,
        createdAt: new Date("2026-03-24T16:00:00Z"),
      },
    ],
    user: { id: "usr_6", name: "Frank Rivera", email: "frank@agency.io" },
    organization: null,
  },
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isMockMode(): boolean {
  return !process.env.DATABASE_URL;
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export async function getAdminStats() {
  if (isMockMode()) {
    return {
      totalOrders: MOCK_ORDERS.length,
      revenue: MOCK_ORDERS.reduce((sum, o) => sum + Number(o.total), 0),
      pendingProofs: MOCK_ORDERS.filter(
        (o) =>
          o.status === "IN_PRODUCTION" ||
          o.status === "PROOF_REVISION"
      ).length,
      inProduction: MOCK_ORDERS.filter(
        (o) => o.status === "IN_PRODUCTION"
      ).length,
    };
  }

  try {
    const [totalOrders, revenueResult, pendingProofs, inProduction] =
      await Promise.all([
        prisma.order.count(),
        prisma.order.aggregate({
          _sum: { total: true },
          where: {
            status: {
              notIn: ["DRAFT", "CANCELLED"],
            },
          },
        }),
        prisma.order.count({
          where: { status: { in: ["IN_PRODUCTION", "PROOF_REVISION"] } },
        }),
        prisma.order.count({ where: { status: "IN_PRODUCTION" } }),
      ]);

    return {
      totalOrders,
      revenue: Number(revenueResult._sum.total ?? 0),
      pendingProofs,
      inProduction,
    };
  } catch {
    return { totalOrders: 0, revenue: 0, pendingProofs: 0, inProduction: 0 };
  }
}

export async function getAllOrders(
  status?: OrderStatus,
  page: number = 1,
  pageSize: number = 20
) {
  if (isMockMode()) {
    let filtered = [...MOCK_ORDERS];
    if (status) {
      filtered = filtered.filter((o) => o.status === status);
    }
    const start = (page - 1) * pageSize;
    return {
      orders: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
    };
  }

  try {
    const where = status ? { status } : {};
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: true,
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.order.count({ where }),
    ]);
    return { orders, total, page, pageSize };
  } catch {
    return { orders: [], total: 0, page, pageSize };
  }
}

export async function getRecentOrders(limit: number = 10) {
  if (isMockMode()) {
    return MOCK_ORDERS.slice(0, limit);
  }

  try {
    return await prisma.order.findMany({
      include: {
        items: true,
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getOrderDetail(id: string) {
  if (isMockMode()) {
    return MOCK_ORDERS.find((o) => o.id === id) ?? null;
  }

  try {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        proofs: { orderBy: { version: "desc" } },
        statusHistory: { orderBy: { createdAt: "desc" } },
        user: { select: { id: true, name: true, email: true } },
        organization: { select: { id: true, name: true } },
      },
    });
  } catch {
    return null;
  }
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  note?: string
) {
  if (isMockMode()) {
    // In mock mode, just return success
    return { success: true };
  }

  try {
    await prisma.$transaction([
      prisma.order.update({ where: { id }, data: { status } }),
      prisma.orderStatusEvent.create({
        data: { orderId: id, status, note: note ?? null },
      }),
    ]);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function uploadProof(orderId: string, imageUrls: string[]) {
  if (isMockMode()) {
    return { success: true, proofId: "prf_mock_new" };
  }

  try {
    // Get current max version for this order
    const latestProof = await prisma.proof.findFirst({
      where: { orderId },
      orderBy: { version: "desc" },
    });
    const nextVersion = (latestProof?.version ?? 0) + 1;

    const proof = await prisma.proof.create({
      data: {
        orderId,
        version: nextVersion,
        imageUrls,
        status: "PENDING",
        approvalToken: crypto.randomUUID(),
      },
    });

    // Update order status to PROOF_READY
    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: { status: "PROOF_READY" },
      }),
      prisma.orderStatusEvent.create({
        data: {
          orderId,
          status: "PROOF_READY",
          note: `Proof v${nextVersion} uploaded`,
        },
      }),
    ]);

    return { success: true, proofId: proof.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getProofQueue() {
  if (isMockMode()) {
    const needsProof = MOCK_ORDERS.filter(
      (o) => o.status === "IN_PRODUCTION"
    );
    const needsRevision = MOCK_ORDERS.filter(
      (o) => o.status === "PROOF_REVISION"
    );
    return { needsProof, needsRevision };
  }

  try {
    const [needsProof, needsRevision] = await Promise.all([
      prisma.order.findMany({
        where: { status: "IN_PRODUCTION" },
        include: {
          items: true,
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.order.findMany({
        where: { status: "PROOF_REVISION" },
        include: {
          items: true,
          proofs: {
            orderBy: { version: "desc" },
            take: 1,
          },
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "asc" },
      }),
    ]);
    return { needsProof, needsRevision };
  } catch {
    return { needsProof: [], needsRevision: [] };
  }
}
