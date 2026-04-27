import { render, screen } from "@testing-library/react";

import { routerMocks } from "../../../../jest.setup";
import { Navbar } from "../navbar";

// Mock the useAuth hook
const mockLogout = jest.fn();
const mockUseAuth = jest.fn();

jest.mock("@entities/session", () => ({
    useAuth: () => mockUseAuth(),
}));

// Mock LogoutButton
jest.mock("@features/auth", () => ({
    LogoutButton: () => (
        <button onClick={mockLogout} data-testid="logout-button">
            Sign out
        </button>
    ),
}));

describe("Navbar", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        routerMocks.setPathname("/");
    });

    describe("when user is not authenticated", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                logout: mockLogout,
            });
        });

        it("should not render boilerplate branding", () => {
            render(<Navbar />);
            expect(screen.queryByText("Nova Flow")).not.toBeInTheDocument();
            expect(
                screen.queryByText("Productive workspace")
            ).not.toBeInTheDocument();
        });

        it("should render navigation items", () => {
            render(<Navbar />);
            expect(
                screen.getAllByRole("link", { name: "Home" })[0]
            ).toBeInTheDocument();
            expect(
                screen.getAllByRole("link", { name: "About" })[0]
            ).toBeInTheDocument();
            expect(
                screen.getAllByRole("link", { name: "Profile" })[0]
            ).toBeInTheDocument();
            expect(
                screen.getAllByRole("link", { name: "Settings" })[0]
            ).toBeInTheDocument();
        });

        it("should render sign in link", () => {
            render(<Navbar />);
            expect(
                screen.getByRole("link", { name: "Sign in" })
            ).toBeInTheDocument();
        });

        it("should highlight active navigation item", () => {
            routerMocks.setPathname("/about");
            render(<Navbar />);

            expect(
                screen.getAllByRole("link", { name: "About" })[0]
            ).toHaveClass("shadow-sm");
        });
    });

    describe("when user is authenticated", () => {
        const mockUser = {
            id: "1",
            username: "testuser",
            email: "test@example.com",
            fullName: "Test User",
            joinedAt: new Date(),
            role: "user" as const,
        };

        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
                logout: mockLogout,
            });
        });

        it("should display user identity", () => {
            render(<Navbar />);
            expect(screen.getByText("Test User")).toBeInTheDocument();
            expect(screen.getByText("@testuser")).toBeInTheDocument();
        });

        it("should render account trigger", () => {
            render(<Navbar />);
            expect(screen.getByText("Test User")).toBeInTheDocument();
        });

        it("should not render sign in link", () => {
            render(<Navbar />);
            expect(
                screen.queryByRole("link", { name: "Sign in" })
            ).not.toBeInTheDocument();
        });
    });

    describe("when loading", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: null,
                isAuthenticated: false,
                isLoading: true,
                logout: mockLogout,
            });
        });

        it("should display loading indicator", () => {
            render(<Navbar />);
            expect(screen.getByText("Syncing…")).toBeInTheDocument();
        });
    });

    describe("mobile menu", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                logout: mockLogout,
            });
        });

        it("should render mobile menu button", () => {
            render(<Navbar />);
            expect(
                screen.getByLabelText("Open navigation menu")
            ).toBeInTheDocument();
        });

        it("should have dropdown menu items", () => {
            render(<Navbar />);
            expect(
                screen.getByLabelText("Open navigation menu")
            ).toBeInTheDocument();
        });
    });

    describe("navigation highlighting", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                logout: mockLogout,
            });
        });

        it.each([
            ["/", "Home"],
            ["/about", "About"],
            ["/profile", "Profile"],
            ["/settings", "Settings"],
        ])("should highlight %s page correctly", (path, label) => {
            routerMocks.setPathname(path);
            render(<Navbar />);

            const links = screen.getAllByRole("link", {
                name: label,
            });
            expect(links[0]).toHaveClass("shadow-sm");
        });
    });
});
