"use client";

import { useState } from "react";

interface NotificationSettings {
    email: boolean;
    push: boolean;
    taskReminders: boolean;
    marketingEmails: boolean;
}

export const NotificationPreferences = () => {
    const [settings, setSettings] = useState<NotificationSettings>({
        email: true,
        push: true,
        taskReminders: true,
        marketingEmails: false,
    });

    const handleToggle = (key: keyof NotificationSettings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const options: { key: keyof NotificationSettings; label: string }[] = [
        { key: "email", label: "Email Notifications" },
        { key: "push", label: "Push Notifications" },
        { key: "taskReminders", label: "Task Reminders" },
        { key: "marketingEmails", label: "Marketing Emails" },
    ];

    return (
        <div className="card bg-base-200 border border-primary/30">
            <div className="card-body">
                <h3 className="text-primary text-sm mb-4">
                    <span className="text-secondary">&gt;</span>{" "}
                    NOTIFICATION_SETTINGS:
                </h3>

                <div className="form-control space-y-3">
                    {options.map(option => (
                        <label
                            key={option.key}
                            className="label cursor-pointer justify-between"
                        >
                            <span className="label-text text-primary/80">
                                {option.label}
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary toggle-sm"
                                checked={settings[option.key]}
                                onChange={() => handleToggle(option.key)}
                            />
                        </label>
                    ))}
                </div>

                <div className="mt-4 pt-3 border-t border-primary/20 text-xs text-primary/40">
                    <span className="badge badge-success badge-sm">
                        Auto-saved
                    </span>
                </div>
            </div>
        </div>
    );
};
