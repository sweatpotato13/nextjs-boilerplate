"use client";

import { useAuth } from "@entities/session";
import { Badge } from "@shared/ui/primitives/badge";
import { Button } from "@shared/ui/primitives/button";
import { Input } from "@shared/ui/primitives/input";
import { Label } from "@shared/ui/primitives/label";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const LoginForm = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const authenticateUser = async () => {
        await new Promise(resolve => setTimeout(resolve, 600));

        const success = login(userId, password);

        if (success) {
            router.push("/");
            return;
        }

        setError("Invalid credentials. Please try again.");
        setIsAuthenticating(false);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsAuthenticating(true);
        void authenticateUser();
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                    id="userId"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder="Enter your user ID"
                    disabled={isAuthenticating}
                    autoComplete="username"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isAuthenticating}
                    autoComplete="current-password"
                />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <div className="flex flex-wrap items-center gap-3">
                <Button
                    type="submit"
                    disabled={isAuthenticating || !userId || !password}
                    className="min-w-40"
                >
                    {isAuthenticating ? "Signing in…" : "Sign in"}
                </Button>
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                    Demo: admin / 1234
                </Badge>
            </div>

            {isAuthenticating ? (
                <p className="text-sm text-muted-foreground">
                    Verifying your session…
                </p>
            ) : null}
        </form>
    );
};
