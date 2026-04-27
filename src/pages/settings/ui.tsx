"use client";

import { PanelFrame } from "@shared/ui";
import { SettingsWidget } from "@widgets/settings-widget";

export const SettingsPage = () => {
    return (
        <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <PanelFrame title="Settings workspace">
                    <SettingsWidget />
                </PanelFrame>
            </div>
        </main>
    );
};
