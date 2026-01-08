import { mockUser, mockUserStats, User, UserStats } from "../model";

describe("User Model", () => {
    describe("User interface", () => {
        it("should allow creating a valid user object", () => {
            const user: User = {
                id: "test-id",
                username: "testuser",
                email: "test@example.com",
                fullName: "Test User",
                joinedAt: new Date(),
                role: "user",
            };

            expect(user.id).toBe("test-id");
            expect(user.username).toBe("testuser");
            expect(user.email).toBe("test@example.com");
            expect(user.role).toBe("user");
        });

        it("should allow optional avatarUrl", () => {
            const user: User = {
                id: "1",
                username: "test",
                email: "test@test.com",
                fullName: "Test",
                joinedAt: new Date(),
                role: "user",
                avatarUrl: "https://example.com/avatar.jpg",
            };

            expect(user.avatarUrl).toBe("https://example.com/avatar.jpg");
        });

        it("should allow optional bio", () => {
            const user: User = {
                id: "1",
                username: "test",
                email: "test@test.com",
                fullName: "Test",
                joinedAt: new Date(),
                role: "user",
                bio: "Hello world",
            };

            expect(user.bio).toBe("Hello world");
        });

        it("should support admin role", () => {
            const admin: User = {
                id: "1",
                username: "admin",
                email: "admin@test.com",
                fullName: "Admin",
                joinedAt: new Date(),
                role: "admin",
            };

            expect(admin.role).toBe("admin");
        });
    });

    describe("UserStats interface", () => {
        it("should allow creating a valid user stats object", () => {
            const stats: UserStats = {
                tasksDone: 10,
                tasksCreated: 20,
                lastActive: new Date(),
            };

            expect(stats.tasksDone).toBe(10);
            expect(stats.tasksCreated).toBe(20);
            expect(stats.lastActive).toBeInstanceOf(Date);
        });
    });

    describe("mockUser", () => {
        it("should have correct id", () => {
            expect(mockUser.id).toBe("1");
        });

        it("should have correct username", () => {
            expect(mockUser.username).toBe("john_doe");
        });

        it("should have correct email", () => {
            expect(mockUser.email).toBe("john@example.com");
        });

        it("should have correct fullName", () => {
            expect(mockUser.fullName).toBe("John Doe");
        });

        it("should have avatarUrl", () => {
            expect(mockUser.avatarUrl).toBe("https://i.pravatar.cc/150?img=12");
        });

        it("should have bio", () => {
            expect(mockUser.bio).toBe(
                "Frontend developer passionate about clean architecture"
            );
        });

        it("should have joinedAt date", () => {
            expect(mockUser.joinedAt).toBeInstanceOf(Date);
        });

        it("should have user role", () => {
            expect(mockUser.role).toBe("user");
        });
    });

    describe("mockUserStats", () => {
        it("should have tasksDone", () => {
            expect(mockUserStats.tasksDone).toBe(42);
        });

        it("should have tasksCreated", () => {
            expect(mockUserStats.tasksCreated).toBe(58);
        });

        it("should have lastActive date", () => {
            expect(mockUserStats.lastActive).toBeInstanceOf(Date);
        });
    });
});
