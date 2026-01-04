"use client";

import { NotificationPreferences } from "@features/notification-settings";
import { ThemeSwitcher } from "@features/theme-switcher";
import { useState } from "react";

export const SettingsWidget = () => {
    const [activeTab, setActiveTab] = useState<"general" | "notifications">(
        "general"
    );

    return (
        <div className="w-full">
            {/* Header */}
            <h1 className="text-primary text-lg mb-6">
                <span className="text-secondary">&gt;</span> CONFIG_OPTIONS:
            </h1>

            {/* Tab Navigation */}
            <div className="tabs tabs-bordered mb-6">
                <button
                    onClick={() => setActiveTab("general")}
                    className={`tab tab-lg ${
                        activeTab === "general"
                            ? "tab-active text-secondary"
                            : "text-primary/60"
                    }`}
                >
                    [{activeTab === "general" ? "*" : " "}GENERAL]
                </button>
                <button
                    onClick={() => setActiveTab("notifications")}
                    className={`tab tab-lg ${
                        activeTab === "notifications"
                            ? "tab-active text-secondary"
                            : "text-primary/60"
                    }`}
                >
                    [{activeTab === "notifications" ? "*" : " "}NOTIFICATIONS]
                </button>
            </div>

            {activeTab === "general" && (
                <div className="space-y-6">
                    <ThemeSwitcher />

                    {/* Language Section */}
                    <div className="card bg-base-200 border border-primary/30">
                        <div className="card-body">
                            <h3 className="text-primary text-sm mb-3">
                                <span className="text-secondary">&gt;</span>{" "}
                                LANGUAGE:
                            </h3>
                            <select className="select select-bordered select-primary w-full bg-transparent">
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="es">Spanish</option>
                                <option value="de">German</option>
                                <option value="ko">Korean</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "notifications" && (
                <div>
                    <NotificationPreferences />
                </div>
            )}
        </div>
    );
};
