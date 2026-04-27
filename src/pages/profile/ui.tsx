"use client";

import { PanelFrame } from "@shared/ui";
import { ProfileSection } from "@widgets/profile-section";

export const ProfilePage = () => {
    return (
        <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <PanelFrame title="Profile workspace">
                    <ProfileSection />
                </PanelFrame>
            </div>
        </main>
    );
};
