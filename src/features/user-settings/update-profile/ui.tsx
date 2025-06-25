"use client";

import { User } from "@entities/user";
import { Button } from "@shared/ui";
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
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onUpdateProfile(formData);
    };

    return (
        <div className="card bg-base-100 shadow-md">
            <form onSubmit={handleSubmit} className="card-body">
                <h3 className="card-title mb-4">Update Profile</h3>

                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Full Name</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Avatar URL</span>
                    </label>
                    <input
                        type="url"
                        name="avatarUrl"
                        value={formData.avatarUrl}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="https://example.com/avatar.jpg"
                    />

                    {formData.avatarUrl && (
                        <div className="mt-2 flex justify-center">
                            <div className="avatar">
                                <div className="w-16 h-16 rounded-full">
                                    <img
                                        src={formData.avatarUrl}
                                        alt="Avatar preview"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Bio</span>
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="textarea textarea-bordered w-full"
                        placeholder="Tell us about yourself..."
                    />
                </div>

                <div className="card-actions justify-end">
                    <Button type="submit" variant="primary">
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};
