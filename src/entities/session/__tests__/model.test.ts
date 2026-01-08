import { DEMO_CREDENTIALS, demoUser, Session } from "../model";

describe("Session Model", () => {
    describe("DEMO_CREDENTIALS", () => {
        it("should have id property", () => {
            expect(DEMO_CREDENTIALS.id).toBe("admin");
        });

        it("should have password property", () => {
            expect(DEMO_CREDENTIALS.password).toBe("1234");
        });

        it("should be readonly", () => {
            // TypeScript ensures this is readonly, but we can verify the values exist
            expect(Object.keys(DEMO_CREDENTIALS)).toEqual(["id", "password"]);
        });
    });

    describe("demoUser", () => {
        it("should have correct id", () => {
            expect(demoUser.id).toBe("1");
        });

        it("should have correct username", () => {
            expect(demoUser.username).toBe("admin");
        });

        it("should have correct email", () => {
            expect(demoUser.email).toBe("admin@example.com");
        });

        it("should have correct fullName", () => {
            expect(demoUser.fullName).toBe("Admin User");
        });

        it("should have avatarUrl", () => {
            expect(demoUser.avatarUrl).toBe("https://i.pravatar.cc/150?img=12");
        });

        it("should have bio", () => {
            expect(demoUser.bio).toBe("System administrator");
        });

        it("should have joinedAt date", () => {
            expect(demoUser.joinedAt).toBeInstanceOf(Date);
            expect(demoUser.joinedAt.getFullYear()).toBe(2024);
        });

        it("should have admin role", () => {
            expect(demoUser.role).toBe("admin");
        });
    });

    describe("Session interface", () => {
        it("should allow creating a valid session object", () => {
            const session: Session = {
                user: demoUser,
                loginAt: new Date(),
            };

            expect(session.user).toBe(demoUser);
            expect(session.loginAt).toBeInstanceOf(Date);
        });
    });
});
