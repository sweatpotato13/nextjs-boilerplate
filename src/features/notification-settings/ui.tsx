"use client";

import { Badge } from "@shared/ui/primitives/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from "@shared/ui/primitives/field";
import { Switch } from "@shared/ui/primitives/switch";
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

    const options: {
        key: keyof NotificationSettings;
        label: string;
        description: string;
    }[] = [
        {
            key: "email",
            label: "Email Notifications",
            description: "Daily summaries and project updates.",
        },
        {
            key: "push",
            label: "Push Notifications",
            description: "Instant alerts for important changes.",
        },
        {
            key: "taskReminders",
            label: "Task Reminders",
            description: "Keep deadlines and follow-ups visible.",
        },
        {
            key: "marketingEmails",
            label: "Marketing Emails",
            description: "Product news and occasional offers.",
        },
    ];

    return (
        <Card className="border-border/70 bg-card shadow-sm">
            <CardHeader className="border-b border-border/60">
                <CardTitle className="text-base">
                    Notification preferences
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
                <FieldSet className="grid gap-3">
                    {options.map(option => (
                        <Field
                            key={option.key}
                            orientation="horizontal"
                            className="items-center justify-between rounded-2xl border border-border/60 bg-muted/30 px-4 py-3"
                        >
                            <FieldContent>
                                <FieldLabel>
                                    <FieldTitle>{option.label}</FieldTitle>
                                </FieldLabel>
                                <FieldDescription>
                                    {option.description}
                                </FieldDescription>
                            </FieldContent>
                            <Switch
                                aria-label={option.label}
                                checked={settings[option.key]}
                                onCheckedChange={() =>
                                    setSettings(prev => ({
                                        ...prev,
                                        [option.key]: !prev[option.key],
                                    }))
                                }
                            />
                        </Field>
                    ))}
                </FieldSet>

                <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                    <span>Preferences save automatically.</span>
                    <Badge variant="secondary" className="rounded-full">
                        Auto-saved
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};
