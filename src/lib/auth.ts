import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import type { Session } from "@prisma/client";
import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "@/lib/db";
import type { UserType } from "@/types/user.type";

export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    };

    await db.session.create({
        data: session
    });
    return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await db.session.findUnique({
        where: {
            id: sessionId
        },
        select: {
            user: {
                select: {
                    createdAt: true,
                    email: true,
                    fullname: true,
                    id: true,
                    role: true,
                    phone: true,
                }
            },
            expiresAt: true,
            id: true,
            userId: true,
        }
    });
    if (result === null) {
        return { session: null, user: null };
    }
    const { user, ...session } = result;
    if (Date.now() >= session.expiresAt.getTime()) {
        await db.session.delete({ where: { id: sessionId } });
        return { session: null, user: null };
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await db.session.update({
            where: {
                id: session.id
            },
            data: {
                expiresAt: session.expiresAt
            }
        });
    }
    return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
    await db.session.delete({ where: { id: sessionId } });
}

export type SessionValidationResult =
    | { session: Session; user: UserType }
    | { session: null; user: null };
