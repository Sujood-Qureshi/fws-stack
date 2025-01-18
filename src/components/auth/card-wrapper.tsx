"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";

interface CardWrapperProps {
    children: React.ReactNode;
    heardLabel: string;
    backButtonLabel: string;
    backButtonhref: string;
    showSoical?: boolean;
}

export const CardWrapper = ({
    backButtonLabel,
    backButtonhref,
    children,
    heardLabel,
    showSoical
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={heardLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {
                showSoical && (
                    <CardFooter>
                        <Social/>
                    </CardFooter>
                )
            }
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonhref}
                />
            </CardFooter>
        </Card>
    )
}