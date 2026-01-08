import { render, screen } from "@testing-library/react";

import { AboutPage } from "../ui";

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

describe("AboutPage", () => {
    it("should render main element", () => {
        render(<AboutPage />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render TerminalFrame with correct title", () => {
        render(<AboutPage />);
        expect(screen.getByTestId("terminal-title")).toHaveTextContent(
            "ABOUT.md"
        );
    });

    it("should render terminal boot sequence", () => {
        render(<AboutPage />);
        expect(screen.getByText(/cat ABOUT.md/)).toBeInTheDocument();
        expect(screen.getByText(/Loading documentation/)).toBeInTheDocument();
    });

    it("should render ASCII art header", () => {
        render(<AboutPage />);
        const preElement = document.querySelector("pre");
        expect(preElement).toBeInTheDocument();
        // Check for part of the ASCII art
        expect(preElement).toHaveTextContent(/___/);
    });

    it("should render WHAT_IS_FSD section", () => {
        render(<AboutPage />);
        expect(screen.getByText(/WHAT_IS_FSD:/)).toBeInTheDocument();
        expect(
            screen.getByText(
                /Feature-Sliced Design \(FSD\) is an architectural/
            )
        ).toBeInTheDocument();
    });

    it("should render KEY_PRINCIPLES section", () => {
        render(<AboutPage />);
        expect(screen.getByText(/KEY_PRINCIPLES:/)).toBeInTheDocument();
        expect(screen.getByText(/Layers:/)).toBeInTheDocument();
        expect(screen.getByText(/Slices:/)).toBeInTheDocument();
        expect(screen.getByText(/Segments:/)).toBeInTheDocument();
        expect(screen.getByText(/Public API:/)).toBeInTheDocument();
    });

    it("should render BENEFITS section", () => {
        render(<AboutPage />);
        expect(screen.getByText(/BENEFITS:/)).toBeInTheDocument();
        expect(
            screen.getByText(/Clear structure for large applications/)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Promotes code reusability/)
        ).toBeInTheDocument();
    });

    it("should render all benefits", () => {
        render(<AboutPage />);

        const benefits = [
            "Clear structure for large applications",
            "Promotes code reusability",
            "Makes onboarding new developers easier",
            "Prevents dependency issues",
            "Facilitates parallel development",
        ];

        benefits.forEach(benefit => {
            expect(screen.getByText(benefit)).toBeInTheDocument();
        });
    });

    it("should render EOF marker", () => {
        render(<AboutPage />);
        expect(screen.getByText(/EOF/)).toBeInTheDocument();
    });

    it("should have responsive padding classes", () => {
        render(<AboutPage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("p-4", "md:p-8", "lg:p-12");
    });

    it("should have max-width container", () => {
        const { container } = render(<AboutPage />);
        const maxWidthContainer = container.querySelector(".max-w-4xl");
        expect(maxWidthContainer).toBeInTheDocument();
    });
});
