"use client";

import { User } from "@entities/user";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@shared/ui/primitives/avatar";
import { Badge } from "@shared/ui/primitives/badge";
import { Button } from "@shared/ui/primitives/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";
import { Input } from "@shared/ui/primitives/input";
import { Label } from "@shared/ui/primitives/label";
import { Textarea } from "@shared/ui/primitives/textarea";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface UpdateProfileFormProps {
    user: User;
    onUpdateProfile: (updatedUser: Partial<User>) => void;
}

export const UpdateProfileForm = ({
    user,
    onUpdateProfile,
}: UpdateProfileFormProps) => {
    const [formData, setFormData] = useState({
        fullName: user.fullName,
        bio: user.bio || "",
        avatarUrl: user.avatarUrl || "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onUpdateProfile(formData);
    };

    return (
        <Card className="border-border/70 bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60">
                <CardTitle className="text-base">Edit profile</CardTitle>
                <Badge variant="secondary" className="rounded-full">
                    Profile settings
                </Badge>
            </CardHeader>

            <CardContent className="grid gap-5 pt-6">
                <form onSubmit={handleSubmit} className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="fullName">Full Name:</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="avatarUrl">Avatar URL:</Label>
                        <Input
                            id="avatarUrl"
                            name="avatarUrl"
                            type="url"
                            value={formData.avatarUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/avatar.jpg"
                        />

                        {formData.avatarUrl ? (
                            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/40 p-3">
                                <Avatar className="size-12">
                                    <AvatarImage
                                        src={formData.avatarUrl}
                                        alt="Avatar preview"
                                    />
                                    <AvatarFallback>
                                        {user.fullName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                    <Image
                                        src={formData.avatarUrl}
                                        alt="Avatar preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Live preview is enabled.
                                </p>
                            </div>
                        ) : null}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio:</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <CardFooter className="justify-end border-t border-border/60 px-0 pb-0 pt-4">
                        <Button type="submit">Save changes</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};
