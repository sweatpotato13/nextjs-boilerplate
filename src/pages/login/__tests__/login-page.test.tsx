/* eslint-disable @typescript-eslint/unbound-method */
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { LoginPage } from "../ui";

// Mock useAuth
const mockUseAuth = jest.fn();

jest.mock("@entities/session", () => ({
    useAuth: () => mockUseAuth(),
}));

// Mock TerminalFrame
jest.mock("@shared/ui", () => ({
    TerminalFrame: ({
        title,
        children,
    }: {
        title: string;
        children: React.ReactNode;
    }) => (
        <div data-testid="terminal-frame">
            <span data-testid="terminal-title">{title}</span>
            {children}
        </div>
    ),
}));

// Mock LoginForm
jest.mock("@features/auth", () => ({
    LoginForm: () => <div data-testid="login-form">Login Form</div>,
}));

describe("LoginPage", () => {
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

        it("should render loading state", () => {
            render(<LoginPage />);
            expect(screen.getByText(/Loading system/)).toBeInTheDocument();
        });

        it("should render terminal frame with ACCESS_TERMINAL title", () => {
            render(<LoginPage />);
            expect(screen.getByTestId("terminal-title")).toHaveTextContent(
                "ACCESS_TERMINAL"
            );
        });

        it("should not render login form", () => {
            render(<LoginPage />);
            expect(screen.queryByTestId("login-form")).not.toBeInTheDocument();
        });
    });

    describe("when authenticated", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                isAuthenticated: true,
                isLoading: false,
            });
        });

        it("should redirect to home", async () => {
            const router = useRouter();
            const pushMock = router.push;
            render(<LoginPage />);

            await waitFor(() => {
                expect(pushMock).toHaveBeenCalledWith("/");
            });
        });

        it("should return null", () => {
            const { container } = render(<LoginPage />);
            expect(container.firstChild).toBeNull();
        });
    });

    describe("when not authenticated", () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                isAuthenticated: false,
                isLoading: false,
            });
        });

        it("should render main element", () => {
            render(<LoginPage />);
            expect(screen.getByRole("main")).toBeInTheDocument();
        });

        it("should render terminal frame with ACCESS_TERMINAL title", () => {
            render(<LoginPage />);
            expect(screen.getByTestId("terminal-title")).toHaveTextContent(
                "ACCESS_TERMINAL"
            );
        });

        it("should render ASCII art header", () => {
            render(<LoginPage />);
            const preElement = document.querySelector("pre");
            expect(preElement).toBeInTheDocument();
            // Check for part of the ASCII art
            expect(preElement).toHaveTextContent(/___/);
        });

        it("should render security check message", () => {
            render(<LoginPage />);
            expect(
                screen.getByText(/SECURITY CHECK INITIATED/)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/ACCESS DENIED. AUTHENTICATION REQUIRED./)
            ).toBeInTheDocument();
        });

        it("should render login form", () => {
            render(<LoginPage />);
            expect(screen.getByTestId("login-form")).toBeInTheDocument();
        });

        it("should have responsive padding classes", () => {
            render(<LoginPage />);
            const main = screen.getByRole("main");
            expect(main).toHaveClass("p-4", "md:p-8", "lg:p-12");
        });

        it("should have max-width container", () => {
            const { container } = render(<LoginPage />);
            const maxWidthContainer = container.querySelector(".max-w-md");
            expect(maxWidthContainer).toBeInTheDocument();
        });
    });
});
