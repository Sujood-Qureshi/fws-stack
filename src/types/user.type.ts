import { Prisma } from "@prisma/client";

export type UserType = Prisma.UserGetPayload<{
    select: {
        createdAt: true,
        email: true,
        fullname: true,
        id: true,
        role: true,
        phone: true,
    }
}>