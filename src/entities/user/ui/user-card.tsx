import Image from "next/image";

import { User } from "../model";

interface UserCardProps {
    user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <div className="card bg-base-100 shadow-md mb-6">
            <div className="card-body">
                <div className="flex items-center mb-4">
                    {user.avatarUrl ? (
                        <div className="avatar mr-4">
                            <div className="w-16 h-16 rounded-full">
                                <Image
                                    src={user.avatarUrl}
                                    alt={`${user.fullName}'s avatar`}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="avatar placeholder mr-4">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                <span className="text-xl">
                                    {user.fullName.charAt(0)}
                                </span>
                            </div>
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl font-bold">{user.fullName}</h2>
                        <p className="text-base-content opacity-70">
                            @{user.username}
                        </p>
                        <div className="text-xs opacity-50 mt-1">
                            Member since{" "}
                            {new Date(user.joinedAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {user.bio && (
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-base-content opacity-70 mb-1">
                            Bio
                        </h3>
                        <p className="text-base-content opacity-60">
                            {user.bio}
                        </p>
                    </div>
                )}

                <div className="flex justify-between items-center mt-2">
                    <div className="text-xs opacity-50">
                        Role:{" "}
                        <span className="badge badge-primary">{user.role}</span>
                    </div>

                    <div className="flex gap-2">
                        <button className="btn btn-outline btn-xs">Edit</button>
                        <button className="btn btn-ghost btn-xs">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
