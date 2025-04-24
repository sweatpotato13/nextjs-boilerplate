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

    return (
        <div className="card bg-base-100 shadow-md mt-6">
            <div className="card-body">
                <h3 className="card-title">Notification Preferences</h3>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Email Notifications</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={settings.email}
                            onChange={() => handleToggle("email")}
                        />
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Push Notifications</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={settings.push}
                            onChange={() => handleToggle("push")}
                        />
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Task Reminders</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={settings.taskReminders}
                            onChange={() => handleToggle("taskReminders")}
                        />
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Marketing Emails</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={settings.marketingEmails}
                            onChange={() => handleToggle("marketingEmails")}
                        />
                    </label>
                </div>

                <div className="mt-4">
                    <div className="badge badge-outline">
                        Settings saved automatically
                    </div>
                </div>
            </div>
        </div>
    );
};
