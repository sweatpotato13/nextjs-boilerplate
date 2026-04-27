"use client";

import {
    mockUser,
    mockUserStats,
    User,
    UserCard,
    UserStatsCard,
} from "@entities/user";
import { UpdateProfileForm } from "@features/user-settings";
import { Badge } from "@shared/ui/primitives/badge";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@shared/ui/primitives/tabs";
import { useState } from "react";

export const ProfileSection = () => {
    const [user, setUser] = useState<User>(mockUser);

    const handleUpdateProfile = (updatedUser: Partial<User>) => {
        setUser(current => ({ ...current, ...updatedUser }));
    };

    return (
        <div className="grid gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="grid gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Profile
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Review your identity, activity, and quick actions.
                    </p>
                </div>
                <Badge variant="secondary" className="rounded-full px-3">
                    Active member
                </Badge>
            </div>

            <Tabs defaultValue="overview" className="grid gap-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                </TabsList>

                <TabsContent
                    value="overview"
                    className="grid gap-6 lg:grid-cols-[2fr_1fr]"
                >
                    <UserCard user={user} />
                    <UserStatsCard stats={mockUserStats} />
                </TabsContent>

                <TabsContent value="edit">
                    <UpdateProfileForm
                        user={user}
                        onUpdateProfile={handleUpdateProfile}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};
