"use client";

import {
    mockUser,
    mockUserStats,
    User,
    UserCard,
    UserStatsCard,
} from "@entities/user";
import { UpdateProfileForm } from "@features/user-settings";
import { useState } from "react";

export const ProfileSection = () => {
    const [user, setUser] = useState<User>(mockUser);
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateProfile = (updatedUser: Partial<User>) => {
        setUser(currentUser => ({
            ...currentUser,
            ...updatedUser,
        }));
        setIsEditing(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Profile</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn btn-outline btn-sm"
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    {isEditing ? (
                        <UpdateProfileForm
                            user={user}
                            onUpdateProfile={handleUpdateProfile}
                        />
                    ) : (
                        <UserCard user={user} />
                    )}
                </div>
                <div className="md:col-span-1">
                    <UserStatsCard stats={mockUserStats} />
                </div>
            </div>
        </div>
    );
};
