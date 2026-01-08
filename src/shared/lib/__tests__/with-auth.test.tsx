/* eslint-disable @typescript-eslint/unbound-method */
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { ProtectedRoute } from "../with-auth";

// Mock the useAuth hook
const mockUseAuth = jest.fn();

jest.mock("@entities/session", () => ({
    useAuth: () => mockUseAuth(),
}));

describe("ProtectedRoute", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("when loading", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                isAuthenticated: false,
                isLoading: true,
            });
        });

        it("should display loading state", () => {
            render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(
                screen.getByText(/Verifying credentials/)
            ).toBeInTheDocument();
            expect(
                screen.queryByText("Protected Content")
            ).not.toBeInTheDocument();
        });

        it("should show loading terminal frame", () => {
            render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(screen.getByText("[ LOADING ]")).toBeInTheDocument();
        });
    });

    describe("when not authenticated", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                isAuthenticated: false,
                isLoading: false,
            });
        });

        it("should redirect to login page", async () => {
            const router = useRouter();
            const pushMock = router.push;
            render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            await waitFor(() => {
                expect(pushMock).toHaveBeenCalledWith("/login");
            });
        });

        it("should display access denied message", () => {
            render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(screen.getByText(/Unauthorized/)).toBeInTheDocument();
            expect(
                screen.getByText(/Redirecting to login/)
            ).toBeInTheDocument();
        });

        it("should show access denied terminal frame", () => {
            render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(screen.getByText("[ ACCESS_DENIED ]")).toBeInTheDocument();
        });

        it("should not render protected content", () => {
            render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(
                screen.queryByText("Protected Content")
            ).not.toBeInTheDocument();
        });
    });

    describe("when authenticated", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
            });
        });

        it("should render protected content", () => {
            render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(screen.getByText("Protected Content")).toBeInTheDocument();
        });

        it("should not redirect", () => {
            const router = useRouter();
            const pushMock = router.push;
            render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(pushMock).not.toHaveBeenCalled();
        });

        it("should not display loading or access denied", () => {
            render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(
                screen.queryByText(/Verifying credentials/)
            ).not.toBeInTheDocument();
            expect(screen.queryByText(/Unauthorized/)).not.toBeInTheDocument();
        });
    });

    describe("transition from loading to authenticated", () => {
        it("should show content after loading completes when authenticated", () => {
            mockUseAuth.mockReturnValue({
                isAuthenticated: false,
                isLoading: true,
            });

            const { rerender } = render(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(
                screen.getByText(/Verifying credentials/)
            ).toBeInTheDocument();

            mockUseAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
            });

            rerender(
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            );

            expect(screen.getByText("Protected Content")).toBeInTheDocument();
        });
    });
});
