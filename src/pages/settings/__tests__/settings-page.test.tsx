import { render, screen } from "@testing-library/react";

import { SettingsPage } from "../ui";

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

    it("should render TerminalFrame with correct title", () => {
        render(<SettingsPage />);
        expect(screen.getByTestId("terminal-title")).toHaveTextContent(
            "SYSTEM_CONFIG"
        );
    });

    it("should render terminal boot sequence", () => {
        render(<SettingsPage />);
        expect(screen.getByText(/sudo config --edit/)).toBeInTheDocument();
        expect(screen.getByText(/Configuration loaded/)).toBeInTheDocument();
    });

    it("should render SettingsWidget", () => {
        render(<SettingsPage />);
        expect(screen.getByTestId("settings-widget")).toBeInTheDocument();
    });

    it("should have responsive padding classes", () => {
        render(<SettingsPage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("p-4", "md:p-8", "lg:p-12");
    });

    it("should have min-height screen class", () => {
        render(<SettingsPage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("min-h-screen");
    });

    it("should have max-width container", () => {
        const { container } = render(<SettingsPage />);
        const maxWidthContainer = container.querySelector(".max-w-4xl");
        expect(maxWidthContainer).toBeInTheDocument();
    });

    it("should have terminal frame as container", () => {
        render(<SettingsPage />);
        expect(screen.getByTestId("terminal-frame")).toBeInTheDocument();
    });
});
