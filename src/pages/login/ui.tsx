"use client";

import { useAuth } from "@entities/session";
import { LoginForm } from "@features/auth";
import { TerminalFrame } from "@shared/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LoginPage = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <main className="min-h-screen p-4 md:p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                    <TerminalFrame title="ACCESS_TERMINAL">
                        <div className="text-primary/60 text-sm">
                            <span className="text-secondary">&gt;</span> Loading
                            system...
                            <span className="animate-blink">_</span>
                        </div>
                    </TerminalFrame>
                </div>
            </main>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return (
        <main className="min-h-screen p-4 md:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
                <TerminalFrame title="ACCESS_TERMINAL">
                    {/* ASCII Art Header */}
                    <pre className="text-primary text-xs md:text-sm mb-6 text-center leading-tight">
                        {`
 _    ___   ___ ___ _  _ 
| |  / _ \\ / __|_ _| \\| |
| |_| (_) | (_ || || .\` |
|____\\___/ \\___|___|_|\\_|
                         `}
                    </pre>

                    {/* Terminal Boot Sequence */}
                    <div className="text-primary/60 text-sm mb-6">
                        <span className="text-secondary">&gt;</span> SECURITY
                        CHECK INITIATED...
                        <br />
                        <span className="text-secondary">&gt;</span>{" "}
                        <span className="text-warning">
                            ACCESS DENIED. AUTHENTICATION REQUIRED.
                        </span>
                    </div>

                    <div className="border-t border-primary/20 pt-4">
                        <LoginForm />
                    </div>
                </TerminalFrame>
            </div>
        </main>
    );
};
