"use client";

import { ProfilePage } from "@pages/profile";
import { ProtectedRoute } from "@shared/lib";

export default function Profile() {
    return (
        <ProtectedRoute>
            <ProfilePage />
        </ProtectedRoute>
    );
}
