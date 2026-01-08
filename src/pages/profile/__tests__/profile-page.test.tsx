import { render, screen } from "@testing-library/react";

import { ProfilePage } from "../ui";

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

// Mock ProfileSection
jest.mock("@widgets/profile-section", () => ({
    ProfileSection: () => (
        <div data-testid="profile-section">Profile Section Content</div>
    ),
}));

describe("ProfilePage", () => {
    it("should render main element", () => {
        render(<ProfilePage />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render TerminalFrame with correct title", () => {
        render(<ProfilePage />);
        expect(screen.getByTestId("terminal-title")).toHaveTextContent(
            "USER_PROFILE"
        );
    });

    it("should render terminal boot sequence", () => {
        render(<ProfilePage />);
        expect(screen.getByText(/whoami/)).toBeInTheDocument();
        expect(screen.getByText(/Loading user data/)).toBeInTheDocument();
    });

    it("should render ProfileSection widget", () => {
        render(<ProfilePage />);
        expect(screen.getByTestId("profile-section")).toBeInTheDocument();
    });

    it("should have responsive padding classes", () => {
        render(<ProfilePage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("p-4", "md:p-8", "lg:p-12");
    });

    it("should have min-height screen class", () => {
        render(<ProfilePage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("min-h-screen");
    });

    it("should have max-width container", () => {
        const { container } = render(<ProfilePage />);
        const maxWidthContainer = container.querySelector(".max-w-4xl");
        expect(maxWidthContainer).toBeInTheDocument();
    });

    it("should have terminal frame as container", () => {
        render(<ProfilePage />);
        expect(screen.getByTestId("terminal-frame")).toBeInTheDocument();
    });
});
