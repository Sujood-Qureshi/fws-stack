"use client"
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { loginSchema, LoginSchema } from "@/lib/validation"
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
import { useState, useTransition } from "react"
import LoadingButton from "@/components/ui/loading-button"
import { login } from "@/app/(auth)/auth-actions"

export const LogInForm = ({ callback }: { callback?: string }) => {

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),

    })

    async function onSubmit(values: LoginSchema) {
        setError(undefined);
        startTransition(async () => {
            const { error } = await login(values, callback)
            if (error) setError(error);
        })
    }

    return <CardWrapper
        heardLabel="Welcome Back"
        backButtonLabel="Don't have an account?"
        backButtonhref="/register"
        showSoical
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {error && <p className="text-center text-destructive">{error}</p>}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
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
                                <PasswordInput placeholder="*******" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton loading={isPending} type="submit" className="w-full">Login</LoadingButton>
            </form>
        </Form>
    </CardWrapper>
}