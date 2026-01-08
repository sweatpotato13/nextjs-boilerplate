import { act, renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";

import { AuthProvider, useAuth } from "../context";
import { DEMO_CREDENTIALS, demoUser } from "../model";

describe("AuthContext", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
    );

    beforeEach(() => {
        localStorage.clear();
    });

    describe("useAuth hook", () => {
        it("should throw error when used outside AuthProvider", () => {
            // Suppress console.error for this test
            const consoleSpy = jest
                .spyOn(console, "error")
                .mockImplementation(() => {});

            expect(() => {
                renderHook(() => useAuth());
            }).toThrow("useAuth must be used within an AuthProvider");

            consoleSpy.mockRestore();
        });
    });

    describe("initial state", () => {
        it("should have null user initially after loading", async () => {
            const { result } = renderHook(() => useAuth(), { wrapper });

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
        });

        it("should complete loading", async () => {
            const { result } = renderHook(() => useAuth(), { wrapper });

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });
        });
    });

    describe("login", () => {
        it("should login successfully with correct credentials", async () => {
            const { result } = renderHook(() => useAuth(), { wrapper });

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            let loginResult: boolean;
            act(() => {
                loginResult = result.current.login(
                    DEMO_CREDENTIALS.id,
                    DEMO_CREDENTIALS.password
                );
            });

            expect(loginResult!).toBe(true);
            expect(result.current.user).toEqual(demoUser);
            expect(result.current.isAuthenticated).toBe(true);
        });

        it("should fail login with incorrect credentials", async () => {
            const { result } = renderHook(() => useAuth(), { wrapper });

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            let loginResult: boolean;
            act(() => {
                loginResult = result.current.login("wrong", "credentials");
            });

            expect(loginResult!).toBe(false);
            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
        });

        it("should persist user to localStorage on successful login", async () => {
            const { result } = renderHook(() => useAuth(), { wrapper });

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            act(() => {
                result.current.login(
                    DEMO_CREDENTIALS.id,
                    DEMO_CREDENTIALS.password
                );
            });

            const storedUser = localStorage.getItem("auth-user");
            expect(storedUser).not.toBeNull();
            expect(JSON.parse(storedUser!)).toEqual(
                expect.objectContaining({
                    id: demoUser.id,
                    username: demoUser.username,
                    email: demoUser.email,
                })
            );
        });
    });

    describe("logout", () => {
        it("should clear user on logout", async () => {
            const { result } = renderHook(() => useAuth(), { wrapper });

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            act(() => {
                result.current.login(
                    DEMO_CREDENTIALS.id,
                    DEMO_CREDENTIALS.password
                );
            });

            expect(result.current.isAuthenticated).toBe(true);

            act(() => {
                result.current.logout();
            });

            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
        });

        it("should remove user from localStorage on logout", async () => {
            const { result } = renderHook(() => useAuth(), { wrapper });

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            act(() => {
                result.current.login(
                    DEMO_CREDENTIALS.id,
                    DEMO_CREDENTIALS.password
                );
            });

            expect(localStorage.getItem("auth-user")).not.toBeNull();

            act(() => {
                result.current.logout();
            });

            expect(localStorage.getItem("auth-user")).toBeNull();
        });
    });

    describe("persistence", () => {
        it("should restore user from localStorage on mount", async () => {
            // Pre-populate localStorage
            localStorage.setItem("auth-user", JSON.stringify(demoUser));

            const { result } = renderHook(() => useAuth(), { wrapper });

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.user).toEqual(
                expect.objectContaining({
                    id: demoUser.id,
                    username: demoUser.username,
                })
            );
            expect(result.current.isAuthenticated).toBe(true);
        });

        it("should handle corrupted localStorage data gracefully", async () => {
            // Set invalid JSON
            localStorage.setItem("auth-user", "invalid-json");

            const { result } = renderHook(() => useAuth(), { wrapper });

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
            // Should have cleared the corrupted data
            expect(localStorage.getItem("auth-user")).toBeNull();
        });
    });
});
