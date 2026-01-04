"use client";

import { TerminalFrame } from "@shared/ui";
import { SettingsWidget } from "@widgets/settings-widget";

export const SettingsPage = () => {
    return (
        <main className="min-h-screen p-4 md:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <TerminalFrame title="SYSTEM_CONFIG">
                    {/* Boot sequence */}
                    <div className="text-primary/60 text-sm mb-6">
                        <span className="text-secondary">&gt;</span> sudo config
                        --edit
                        <br />
                        <span className="text-secondary">&gt;</span>{" "}
                        <span className="text-success">
                            Configuration loaded.
                        </span>
                    </div>

                    <SettingsWidget />
                </TerminalFrame>
            </div>
        </main>
    );
};
