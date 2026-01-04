import Image from "next/image";

import { User } from "../model";

interface UserCardProps {
    user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <div className="card bg-base-200 border border-primary/30">
            <div className="card-body">
                <div className="flex items-center mb-4">
                    {user.avatarUrl ? (
                        <div className="avatar mr-4">
                            <div className="w-16 rounded border-2 border-primary/50">
                                <Image
                                    src={user.avatarUrl}
                                    alt={`${user.fullName}'s avatar`}
                                    width={64}
                                    height={64}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="avatar placeholder mr-4">
                            <div className="bg-base-300 text-primary rounded w-16 border-2 border-primary/50">
                                <span className="text-xl">
                                    {user.fullName.charAt(0)}
                                </span>
                            </div>
                        </div>
                    )}
                    <div>
                        <h2 className="text-lg text-primary font-bold">
                            {user.fullName}
                        </h2>
                        <p className="text-secondary text-sm">
                            @{user.username}
                        </p>
                        <div className="text-xs text-primary/40 mt-1">
                            Member since{" "}
                            {new Date(user.joinedAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {user.bio && (
                    <div className="mb-4 border-l-2 border-primary/30 pl-3">
                        <h3 className="text-xs text-primary/60 mb-1">
                            <span className="text-secondary">&gt;</span> BIO:
                        </h3>
                        <p className="text-primary/70 text-sm">{user.bio}</p>
                    </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-primary/20">
                    <div className="text-xs text-primary/50">
                        Role:{" "}
                        <span className="badge badge-warning badge-sm">
                            {user.role.toUpperCase()}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <button className="btn btn-ghost btn-xs text-primary">
                            [EDIT]
                        </button>
                        <button className="btn btn-ghost btn-xs text-accent">
                            [CONTACT]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
