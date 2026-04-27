"use client";

import { useAuth } from "@entities/session";
import { Button } from "@shared/ui/primitives/button";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sign out
        </Button>
    );
};
