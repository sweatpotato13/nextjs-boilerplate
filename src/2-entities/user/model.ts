export interface User {
    id: string;
    username: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    bio?: string;
    joinedAt: Date;
    role: "user" | "admin";
}

export interface UserStats {
    tasksDone: number;
    tasksCreated: number;
    lastActive: Date;
}

export const mockUser: User = {
    id: "1",
    username: "john_doe",
    email: "john@example.com",
    fullName: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    bio: "Frontend developer passionate about clean architecture",
    joinedAt: new Date("2023-01-15"),
    role: "user",
};

export const mockUserStats: UserStats = {
    tasksDone: 42,
    tasksCreated: 58,
    lastActive: new Date(),
};
