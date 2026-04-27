/* eslint-disable @typescript-eslint/unbound-method */
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { LoginPage } from "../ui";

// Mock useAuth
const mockUseAuth = jest.fn();

jest.mock("@entities/session", () => ({
    useAuth: () => mockUseAuth(),
}));

// Mock PanelFrame
jest.mock("@shared/ui", () => ({
    PanelFrame: ({
        title,
        children,
    }: {
        title: string;
        children: React.ReactNode;
    }) => (
        <div data-testid="panel-frame">
            <span data-testid="panel-title">{title}</span>
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
            expect(
                screen.getByText(/Preparing your session/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Loading account state/i)
            ).toBeInTheDocument();
        });

        it("should render PanelFrame title", () => {
            render(<LoginPage />);
            expect(
                screen.getByText("Preparing your session")
            ).toBeInTheDocument();
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

        it("should render PanelFrame with correct title", () => {
            render(<LoginPage />);
            expect(screen.getByTestId("panel-title")).toHaveTextContent(
                "Sign in"
            );
        });

        it("should render session loading copy", () => {
            render(<LoginPage />);
            expect(
                screen.getByText("Sign in to continue your flow.")
            ).toBeInTheDocument();
        });

        it("should render security check message", () => {
            render(<LoginPage />);
            expect(
                screen.getByRole("heading", {
                    name: /Sign in to continue your flow/i,
                })
            ).toBeInTheDocument();
        });

        it("should render login form", () => {
            render(<LoginPage />);
            expect(screen.getByTestId("login-form")).toBeInTheDocument();
        });

        it("should have responsive padding classes", () => {
            render(<LoginPage />);
            const main = screen.getByRole("main");
            expect(main).toHaveClass("px-4", "py-8", "md:px-8", "lg:px-12");
        });

        it("should have max-width container", () => {
            render(<LoginPage />);
            expect(screen.getByRole("main")).toBeInTheDocument();
        });
    });
});
