"use client";

import { useAuth } from "@entities/session";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <button
            onClick={handleLogout}
            className="text-primary/70 hover:text-error transition-colors"
        >
            [LOGOUT]
        </button>
    );
};
