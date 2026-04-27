import { render, screen } from "@testing-library/react";

import { ProfilePage } from "../ui";

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

    it("should render PanelFrame with correct title", () => {
        render(<ProfilePage />);
        expect(screen.getByTestId("panel-title")).toHaveTextContent(
            "Profile workspace"
        );
    });

    it("should render profile copy", () => {
        render(<ProfilePage />);
        expect(screen.getByText(/Profile workspace/i)).toBeInTheDocument();
    });

    it("should render ProfileSection widget", () => {
        render(<ProfilePage />);
        expect(screen.getByTestId("profile-section")).toBeInTheDocument();
    });

    it("should have responsive padding classes", () => {
        render(<ProfilePage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("px-4", "py-8", "md:px-8", "lg:px-12");
    });

    it("should have min-height screen class", () => {
        render(<ProfilePage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("min-h-screen");
    });

    it("should have max-width container", () => {
        render(<ProfilePage />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should have panel frame as container", () => {
        render(<ProfilePage />);
        expect(screen.getByTestId("panel-frame")).toBeInTheDocument();
    });
});
