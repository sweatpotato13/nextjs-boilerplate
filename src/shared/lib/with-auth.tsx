"use client";

import { useAuth } from "@entities/session";
import { PanelFrame } from "@shared/ui";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

/**
 * Wrapper component that protects routes from unauthenticated access.
 * Redirects to /login if the user is not authenticated.
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
                <div className="mx-auto max-w-md">
                    <PanelFrame title="Checking access">
                        <p className="text-sm text-muted-foreground">
                            Verifying your session before opening the workspace.
                        </p>
                    </PanelFrame>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
                <div className="mx-auto max-w-md">
                    <PanelFrame title="Sign in required">
                        <p className="text-sm text-destructive">
                            Redirecting you to the sign-in page.
                        </p>
                    </PanelFrame>
                </div>
            </main>
        );
    }

    return <>{children}</>;
};
