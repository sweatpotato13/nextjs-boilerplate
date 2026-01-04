"use client";

import { AuthProvider } from "@entities/session";
import { ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

/**
 * Client-side providers wrapper for the application.
 * This component wraps all client-side context providers.
 */
export const Providers = ({ children }: ProvidersProps) => {
    return <AuthProvider>{children}</AuthProvider>;
};
