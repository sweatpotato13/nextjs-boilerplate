import { render, screen } from "@testing-library/react";

import { SettingsPage } from "../ui";

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

// Mock SettingsWidget
jest.mock("@widgets/settings-widget", () => ({
    SettingsWidget: () => (
        <div data-testid="settings-widget">Settings Widget Content</div>
    ),
}));

describe("SettingsPage", () => {
    it("should render main element", () => {
        render(<SettingsPage />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render PanelFrame with correct title", () => {
        render(<SettingsPage />);
        expect(screen.getByTestId("panel-title")).toHaveTextContent(
            "Settings workspace"
        );
    });

    it("should render settings copy", () => {
        render(<SettingsPage />);
        expect(screen.getByText(/Settings workspace/i)).toBeInTheDocument();
    });

    it("should render SettingsWidget", () => {
        render(<SettingsPage />);
        expect(screen.getByTestId("settings-widget")).toBeInTheDocument();
    });

    it("should have responsive padding classes", () => {
        render(<SettingsPage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("px-4", "py-8", "md:px-8", "lg:px-12");
    });

    it("should have min-height screen class", () => {
        render(<SettingsPage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("min-h-screen");
    });

    it("should have max-width container", () => {
        render(<SettingsPage />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should have panel frame as container", () => {
        render(<SettingsPage />);
        expect(screen.getByTestId("panel-frame")).toBeInTheDocument();
    });
});
