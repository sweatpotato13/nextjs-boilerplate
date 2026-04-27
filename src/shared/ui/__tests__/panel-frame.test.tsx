import { render, screen } from "@testing-library/react";

import { PanelFrame } from "../panel-frame";

describe("PanelFrame", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2024-01-15"));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should render children correctly", () => {
        render(
            <PanelFrame title="Test Panel">
                <div data-testid="child-content">Content</div>
            </PanelFrame>
        );
        expect(screen.getByTestId("child-content")).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("should display the title", () => {
        render(<PanelFrame title="My Title">Content</PanelFrame>);
        expect(screen.getByText("My Title")).toBeInTheDocument();
    });

    it("should not render controls", () => {
        const { container } = render(
            <PanelFrame title="Test">Content</PanelFrame>
        );
        expect(container.querySelectorAll("button")).toHaveLength(0);
    });

    it("should display current date after mount", async () => {
        render(<PanelFrame title="Test">Content</PanelFrame>);
        expect(
            await screen.findByText(/Mon, Jan 15, 2024/)
        ).toBeInTheDocument();
    });

    it("should have a card-like structure with content", () => {
        const { container } = render(
            <PanelFrame title="Structure Test">
                <p>Test content</p>
            </PanelFrame>
        );

        expect(screen.getByText("Structure Test")).toBeInTheDocument();
        expect(screen.getByText("Test content")).toBeInTheDocument();
        expect(container.firstChild).toBeInTheDocument();
    });
});
