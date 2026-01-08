import { render, screen } from "@testing-library/react";

import { Providers } from "../providers";

// Mock AuthProvider
jest.mock("@entities/session", () => ({
    AuthProvider: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="auth-provider">{children}</div>
    ),
}));

describe("Providers", () => {
    it("should render children inside AuthProvider", () => {
        render(
            <Providers>
                <div data-testid="child-content">Test Content</div>
            </Providers>
        );

        expect(screen.getByTestId("auth-provider")).toBeInTheDocument();
        expect(screen.getByTestId("child-content")).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should wrap children with AuthProvider", () => {
        render(
            <Providers>
                <span>Wrapped Content</span>
            </Providers>
        );

        const authProvider = screen.getByTestId("auth-provider");
        expect(authProvider).toContainElement(
            screen.getByText("Wrapped Content")
        );
    });

    it("should render multiple children", () => {
        render(
            <Providers>
                <div data-testid="child-1">First</div>
                <div data-testid="child-2">Second</div>
            </Providers>
        );

        expect(screen.getByTestId("child-1")).toBeInTheDocument();
        expect(screen.getByTestId("child-2")).toBeInTheDocument();
    });
});
