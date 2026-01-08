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
            [LOGOUT]
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
            });
        });

        it("should render the logo", () => {
            render(<Navbar />);
            // The logo text is split across multiple elements
            expect(screen.getByText("TERMINAL_")).toBeInTheDocument();
        });

        it("should render navigation items", () => {
            render(<Navbar />);
            expect(screen.getAllByText(/HOME/)[0]).toBeInTheDocument();
            expect(screen.getAllByText(/ABOUT/)[0]).toBeInTheDocument();
            expect(screen.getAllByText(/PROFILE/)[0]).toBeInTheDocument();
            expect(screen.getAllByText(/SETTINGS/)[0]).toBeInTheDocument();
        });

        it("should render login link", () => {
            render(<Navbar />);
            expect(screen.getByText("[LOGIN]")).toBeInTheDocument();
        });

        it("should highlight active navigation item", () => {
            routerMocks.setPathname("/about");
            render(<Navbar />);

            // The active item should have the asterisk
            const aboutLinks = screen.getAllByRole("link", { name: /ABOUT/ });
            const desktopAboutLink = aboutLinks[0];
            expect(desktopAboutLink).toHaveTextContent("[*ABOUT]");
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
            });
        });

        it("should display username", () => {
            render(<Navbar />);
            expect(screen.getByText("testuser")).toBeInTheDocument();
        });

        it("should render logout button in dropdown", () => {
            render(<Navbar />);
            expect(
                screen.getAllByTestId("logout-button")[0]
            ).toBeInTheDocument();
        });

        it("should not render login link", () => {
            render(<Navbar />);
            expect(screen.queryByText("[LOGIN]")).not.toBeInTheDocument();
        });
    });

    describe("when loading", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: null,
                isAuthenticated: false,
                isLoading: true,
            });
        });

        it("should display loading indicator", () => {
            render(<Navbar />);
            expect(screen.getByText("[LOADING...]")).toBeInTheDocument();
        });
    });

    describe("mobile menu", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        });

        it("should render mobile menu button", () => {
            render(<Navbar />);
            expect(screen.getByText("[MENU]")).toBeInTheDocument();
        });

        it("should have dropdown menu items", () => {
            render(<Navbar />);
            // Mobile menu items are duplicated in the dropdown
            const homeLinks = screen.getAllByRole("link", { name: /HOME/ });
            expect(homeLinks.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe("navigation highlighting", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        });

        it.each([
            ["/", "HOME"],
            ["/about", "ABOUT"],
            ["/profile", "PROFILE"],
            ["/settings", "SETTINGS"],
        ])("should highlight %s page correctly", (path, label) => {
            routerMocks.setPathname(path);
            render(<Navbar />);

            const links = screen.getAllByRole("link", {
                name: new RegExp(label),
            });
            // Desktop nav link should have active indicator
            expect(links[0]).toHaveTextContent(`[*${label}]`);
        });
    });
});
