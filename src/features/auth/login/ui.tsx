"use client";

import { useAuth } from "@entities/session";
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
        // Simulate authentication delay for terminal effect
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = login(userId, password);

        if (success) {
            router.push("/");
        } else {
            setError("ACCESS DENIED. Invalid credentials.");
            setIsAuthenticating(false);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsAuthenticating(true);
        void authenticateUser();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* User ID Input */}
            <div>
                <label className="block text-primary text-sm mb-1">
                    <span className="text-secondary">&gt;</span> USER_ID:
                </label>
                <input
                    type="text"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    className="w-full bg-base-100 border border-primary/50 px-3 py-2 text-primary font-mono focus:border-primary focus:outline-none"
                    placeholder="Enter user ID..."
                    disabled={isAuthenticating}
                    autoComplete="username"
                />
            </div>

            {/* Password Input */}
            <div>
                <label className="block text-primary text-sm mb-1">
                    <span className="text-secondary">&gt;</span> PASSWORD:
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-base-100 border border-primary/50 px-3 py-2 text-primary font-mono focus:border-primary focus:outline-none"
                    placeholder="Enter password..."
                    disabled={isAuthenticating}
                    autoComplete="current-password"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="text-error text-sm">
                    <span className="text-error">&gt;</span> {error}
                </div>
            )}

            {/* Authenticating Message */}
            {isAuthenticating && (
                <div className="text-primary/60 text-sm">
                    <span className="text-secondary">&gt;</span> Authenticating
                    user...
                    <span className="animate-blink">_</span>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isAuthenticating || !userId || !password}
                className="w-full border border-primary/50 px-4 py-2 text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                [ AUTHENTICATE ]
            </button>

            {/* Hint */}
            <div className="text-primary/40 text-xs mt-4 border-t border-primary/20 pt-4">
                <span className="text-secondary">&gt;</span> HINT: Demo
                credentials are admin / 1234
            </div>
        </form>
    );
};
