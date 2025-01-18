"use server"

import { createSession, generateSessionToken, invalidateSession, validateSessionToken } from "@/lib/auth";
import { SESSION_NAME } from "@/lib/constant";
import { db } from "@/lib/db";
import { loginSchema, LoginSchema, registerSchema, RegisterSchema } from "@/lib/validation";
import { UserType } from "@/types/user.type";
import { Session } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const validateRequest = cache(
    async (userToken?: string): Promise<
        { user: UserType, session: Session } | { user: null, session: null }
    > => {
        const token = userToken ?? (await cookies()).get(SESSION_NAME)?.value ?? null;

        if (!token) {
            return {
                user: null,
                session: null
            }
        }

        const result = await validateSessionToken(token);

        return result;
    }
)

export async function register(credentials: RegisterSchema): Promise<{ error: string }> {
    try {
        const { error, data } = registerSchema.safeParse(credentials);

        if (error) {
            console.log(error);
            return { error: "Validation Error" }
        }

        const { email, fullname, password, phone } = data;


        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    { email: { equals: email, mode: "insensitive" } },
                    { phone: { equals: phone, mode: "insensitive" } },
                ],
            }
        })

        if (existingUser) {
            if (existingUser.email.toLowerCase() === email.toLowerCase()) {
                return {
                    error: "Email already exists"
                }
            } else if (existingUser.phone === phone) {
                return {
                    error: "Phone number already exists"
                }
            }
        }

        const passwordHash = await hash(password, 8)


        const user = await db.user.create({
            data: {
                fullname,
                email,
                phone,
                passwordHash: passwordHash
            }
        })

        const token = generateSessionToken()

        const session = await createSession(token, user.id);

        (await cookies()).set(
            SESSION_NAME,
            token,
            {
                expires: session.expiresAt,
                path: "/",
            }
        )

        return redirect('/')
    } catch (error) {
        if (isRedirectError(error)) throw error
        console.log(error);
        return {
            error: "Something went wrong. please try again"
        }
    }
}

export async function login(
    credentials: LoginSchema,
    callback?: string
): Promise<{ error: string }> {
    try {

        const { data, error } = loginSchema.safeParse(credentials)

        if (error) {
            console.log(error);
            return { error: "Validation Error" }
        }

        const { email, password } = data;

        const existingUser = await db.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: "insensitive"
                }
            }
        })

        if (!existingUser?.passwordHash) {
            return {
                error: "Invalid credentials."
            }
        }

        const validPassword = await compare(password, existingUser.passwordHash);

        if (!validPassword) {
            return {
                error: "Invalid credentials."
            }
        }

        const token = generateSessionToken()

        const session = await createSession(token, existingUser.id);

        (await cookies()).set(
            SESSION_NAME,
            token,
            {
                expires: session.expiresAt,
                path: "/",
            }
        )

        return redirect(callback ?? "/")
    } catch (error) {
        if (isRedirectError(error)) throw error;
        console.log(error);
        return { error: "An error occurred while trying to log in." };
    }
}

export async function logout() {
    const { session } = await validateRequest();
    if (!session) {
        throw new Error("Unauthorized");
    }
    await invalidateSession(session.id);

    (await cookies()).delete(SESSION_NAME)
}