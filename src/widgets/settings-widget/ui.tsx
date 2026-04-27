"use client";

import { NotificationPreferences } from "@features/notification-settings";
import { ThemeSwitcher } from "@features/theme-switcher";
import { Badge } from "@shared/ui/primitives/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@shared/ui/primitives/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@shared/ui/primitives/tabs";
import { useState } from "react";

export const SettingsWidget = () => {
    const [language, setLanguage] = useState("en");

    return (
        <div className="grid gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="grid gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Workspace settings
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Tune the experience without leaving the flow.
                    </p>
                </div>
                <Badge variant="secondary" className="rounded-full px-3">
                    Synced locally
                </Badge>
            </div>

            <Tabs defaultValue="general" className="grid gap-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="grid gap-6">
                    <ThemeSwitcher />

                    <Card className="border-border/70 bg-card shadow-sm">
                        <CardHeader className="border-b border-border/60">
                            <CardTitle className="text-base">
                                Language
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Select
                                value={language}
                                onValueChange={value => {
                                    if (value) {
                                        setLanguage(value);
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                    <SelectItem value="de">German</SelectItem>
                                    <SelectItem value="ko">Korean</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <NotificationPreferences />
                </TabsContent>
            </Tabs>
        </div>
    );
};
