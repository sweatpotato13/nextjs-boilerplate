"use client";

import { SettingsPage } from "@pages/settings";
import { ProtectedRoute } from "@shared/lib";

export default function Settings() {
    return (
        <ProtectedRoute>
            <SettingsPage />
        </ProtectedRoute>
    );
}
