import { User } from "@entities/user";

/**
 * Demo credentials for the boilerplate
 * In a real application, this would be validated against a backend
 */
export const DEMO_CREDENTIALS = {
    id: "admin",
    password: "1234",
} as const;

/**
 * Demo user that is returned upon successful login
 */
export const demoUser: User = {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    fullName: "Admin User",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    bio: "System administrator",
    joinedAt: new Date("2024-01-01"),
    role: "admin",
};

export interface Session {
    user: User;
    loginAt: Date;
}
