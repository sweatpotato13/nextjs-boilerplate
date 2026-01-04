"use client";

import { TerminalFrame } from "@shared/ui";
import { ProfileSection } from "@widgets/profile-section";

export const ProfilePage = () => {
    return (
        <main className="min-h-screen p-4 md:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <TerminalFrame title="USER_PROFILE">
                    {/* Boot sequence */}
                    <div className="text-primary/60 text-sm mb-6">
                        <span className="text-secondary">&gt;</span> whoami
                        <br />
                        <span className="text-secondary">&gt;</span>{" "}
                        <span className="text-success">
                            Loading user data...
                        </span>
                    </div>

                    <ProfileSection />
                </TerminalFrame>
            </div>
        </main>
    );
};
