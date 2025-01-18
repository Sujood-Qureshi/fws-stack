"use client"
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { registerSchema, RegisterSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import LoadingButton from "@/components/ui/loading-button"
import { PhoneInput } from "@/components/ui/phone-input"
import { useState, useTransition } from "react"
import { register } from "@/app/(auth)/auth-actions"

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>();


    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),

    })

    async function onSubmit(values: RegisterSchema) {
        setError(undefined);
        startTransition(async () => {
            const { error } = await register(values)
            if (error) setError(error);
        })
    }

    return <CardWrapper
        heardLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonhref="/auth/login"
        showSoical
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {error && <p className="text-center text-destructive">{error}</p>}
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder="John Doe"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <PhoneInput
                                    disabled={isPending}
                                    placeholder="John Doe"
                                    defaultCountry="IN"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder="john.doe@example.com"

                                    type="email"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput disabled={isPending} placeholder="*******" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton loading={isPending} type="submit" className="w-full">Register</LoadingButton>
            </form>
        </Form>
    </CardWrapper>
}