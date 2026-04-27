"use client";

import { useAuth } from "@entities/session";
import { LoginForm } from "@features/auth";
import { PanelFrame } from "@shared/ui";
import { Badge } from "@shared/ui/primitives/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LoginPage = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md border-border/70 bg-card/90 shadow-sm">
                    <CardHeader className="border-b border-border/60">
                        <CardTitle className="text-base">
                            Preparing your session
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 text-sm text-muted-foreground">
                        Loading account state…
                    </CardContent>
                </Card>
            </main>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return (
        <main className="min-h-[calc(100vh-5rem)] px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <section className="grid gap-4">
                    <Badge
                        variant="secondary"
                        className="w-fit rounded-full px-3"
                    >
                        Welcome back
                    </Badge>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                        Sign in to continue your flow.
                    </h1>
                    <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                        Access your profile, preferences, and task workspace
                        with a clean, focused login experience.
                    </p>
                </section>

                <PanelFrame title="Sign in">
                    <LoginForm />
                </PanelFrame>
            </div>
        </main>
    );
};
