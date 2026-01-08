import { render, screen } from "@testing-library/react";

import { TerminalFrame } from "../terminal-frame";

describe("TerminalFrame", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2024-01-15"));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should render children correctly", () => {
        render(
            <TerminalFrame title="Test Terminal">
                <div data-testid="child-content">Content</div>
            </TerminalFrame>
        );
        expect(screen.getByTestId("child-content")).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("should display the title in brackets", () => {
        render(<TerminalFrame title="My Title">Content</TerminalFrame>);
        expect(screen.getByText("[ My Title ]")).toBeInTheDocument();
    });

    it("should render traffic light buttons", () => {
        const { container } = render(
            <TerminalFrame title="Test">Content</TerminalFrame>
        );
        const trafficLights = container.querySelectorAll(
            ".w-3.h-3.rounded-full"
        );
        expect(trafficLights).toHaveLength(3);
    });

    it("should display current date after mount", async () => {
        render(<TerminalFrame title="Test">Content</TerminalFrame>);

        // The date is set in useEffect, so we need to wait for it
        // Format: Mon, Jan 15, 2024
        expect(
            await screen.findByText(/Mon, Jan 15, 2024/)
        ).toBeInTheDocument();
    });

    it("should display MODE: NORMAL in status bar", () => {
        render(<TerminalFrame title="Test">Content</TerminalFrame>);
        expect(screen.getByText("MODE: NORMAL")).toBeInTheDocument();
    });

    it("should have proper structure with title bar, content, and status bar", () => {
        const { container } = render(
            <TerminalFrame title="Structure Test">
                <p>Test content</p>
            </TerminalFrame>
        );

        // Check for border on main container
        const mainContainer = container.firstChild;
        expect(mainContainer).toHaveClass("border-2", "border-primary");

        // Check for title bar bg
        const titleBar = container.querySelector(".bg-base-200.border-b");
        expect(titleBar).toBeInTheDocument();

        // Check for content area
        const contentArea = container.querySelector(".p-6.bg-base-100");
        expect(contentArea).toBeInTheDocument();

        // Check for status bar
        const statusBar = container.querySelector(".border-t.bg-base-200");
        expect(statusBar).toBeInTheDocument();
    });
});
