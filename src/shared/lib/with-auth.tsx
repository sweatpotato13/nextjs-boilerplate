"use client";

import { useAuth } from "@entities/session";
import { TerminalFrame } from "@shared/ui";
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
            <main className="min-h-screen p-4 md:p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                    <TerminalFrame title="LOADING">
                        <div className="text-primary/60 text-sm">
                            <span className="text-secondary">&gt;</span>{" "}
                            Verifying credentials...
                            <span className="animate-blink">_</span>
                        </div>
                    </TerminalFrame>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen p-4 md:p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                    <TerminalFrame title="ACCESS_DENIED">
                        <div className="text-error text-sm">
                            <span className="text-error">&gt;</span>{" "}
                            Unauthorized. Redirecting to login...
                            <span className="animate-blink">_</span>
                        </div>
                    </TerminalFrame>
                </div>
            </main>
        );
    }

    return <>{children}</>;
};
