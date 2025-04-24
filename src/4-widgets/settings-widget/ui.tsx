"use client";

import { NotificationPreferences } from "@features/notification-settings";
import { ThemeSwitcher } from "@features/theme-switcher";
import { useState } from "react";

export const SettingsWidget = () => {
    const [activeTab, setActiveTab] = useState<"general" | "notifications">(
        "general"
    );

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <div className="tabs tabs-bordered mb-6">
                <button
                    onClick={() => setActiveTab("general")}
                    className={`tab tab-lg ${
                        activeTab === "general" ? "tab-active" : ""
                    }`}
                >
                    General
                </button>
                <button
                    onClick={() => setActiveTab("notifications")}
                    className={`tab tab-lg ${
                        activeTab === "notifications" ? "tab-active" : ""
                    }`}
                >
                    Notifications
                </button>
            </div>

            {activeTab === "general" && (
                <div className="space-y-6">
                    <ThemeSwitcher />

                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h3 className="card-title">Language</h3>
                            <select className="select select-bordered w-full">
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
