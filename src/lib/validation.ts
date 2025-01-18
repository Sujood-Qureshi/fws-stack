import z from 'zod'

const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export type LoginSchema = z.infer<typeof loginSchema>


export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }).regex(
        passwordValidationRegex,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
    fullname: z.string(),
    phone: z.string(),
})

export type RegisterSchema = z.infer<typeof registerSchema>