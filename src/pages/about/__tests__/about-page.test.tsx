import { render, screen } from "@testing-library/react";

import { AboutPage } from "../ui";

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

describe("AboutPage", () => {
    it("should render main element", () => {
        render(<AboutPage />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render PanelFrame with correct title", () => {
        render(<AboutPage />);
        expect(screen.getByTestId("panel-title")).toHaveTextContent(
            "Design system"
        );
    });

    it("should render intro copy", () => {
        render(<AboutPage />);
        expect(
            screen.getByText("Built around Feature-Sliced Design.")
        ).toBeInTheDocument();
        expect(screen.getByText("Architecture overview")).toBeInTheDocument();
        expect(screen.getByText("Principles")).toBeInTheDocument();
    });

    it("should render content sections", () => {
        render(<AboutPage />);
        expect(
            screen.getByText("Promotes reusable building blocks")
        ).toBeInTheDocument();
    });

    it("should render benefits copy", () => {
        render(<AboutPage />);
        expect(
            screen.getByText("Scales across teams and features")
        ).toBeInTheDocument();
    });

    it("should render main element and container", () => {
        render(<AboutPage />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should have responsive padding classes", () => {
        render(<AboutPage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("px-4", "py-8", "md:px-8", "lg:px-12");
    });

    it("should have max-width container", () => {
        const { container } = render(<AboutPage />);
        const maxWidthContainer = container.querySelector(".max-w-5xl");
        expect(maxWidthContainer).toBeInTheDocument();
    });
});
