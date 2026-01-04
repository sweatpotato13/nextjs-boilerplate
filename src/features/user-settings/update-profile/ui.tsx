"use client";

import { User } from "@entities/user";
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
        <div className="card bg-base-200 border border-primary/30">
            <div className="card-body">
                <h3 className="text-primary text-sm mb-4">
                    <span className="text-secondary">&gt;</span> EDIT_PROFILE:
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-primary/60">
                                Full Name:
                            </span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="input input-bordered input-primary bg-transparent"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-primary/60">
                                Avatar URL:
                            </span>
                        </label>
                        <input
                            type="url"
                            name="avatarUrl"
                            value={formData.avatarUrl}
                            onChange={handleChange}
                            className="input input-bordered input-primary bg-transparent"
                            placeholder="https://example.com/avatar.jpg"
                        />

                        {formData.avatarUrl && (
                            <div className="mt-2 flex justify-center">
                                <div className="avatar">
                                    <div className="w-16 rounded border border-primary/50">
                                        <Image
                                            src={formData.avatarUrl}
                                            alt="Avatar preview"
                                            width={64}
                                            height={64}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-primary/60">
                                Bio:
                            </span>
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="textarea textarea-bordered textarea-primary bg-transparent"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <div className="card-actions justify-end pt-2">
                        <button
                            type="submit"
                            className="btn btn-success btn-sm"
                        >
                            [SAVE]
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
