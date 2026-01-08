import { render, screen } from "@testing-library/react";

import { HomePage } from "../ui";

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

// Mock TodoList
jest.mock("@widgets/todo-list", () => ({
    TodoList: () => <div data-testid="todo-list">Todo List Content</div>,
}));

describe("HomePage", () => {
    it("should render main element", () => {
        render(<HomePage />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render TerminalFrame with correct title", () => {
        render(<HomePage />);
        expect(screen.getByTestId("terminal-title")).toHaveTextContent(
            "TODO TERMINAL v1.0"
        );
    });

    it("should render ASCII art header", () => {
        render(<HomePage />);
        const preElement = document.querySelector("pre");
        expect(preElement).toBeInTheDocument();
        // Check for part of the ASCII art
        expect(preElement).toHaveTextContent(/___/);
    });

    it("should render boot sequence messages", () => {
        render(<HomePage />);
        expect(screen.getByText(/System initialized/)).toBeInTheDocument();
        expect(screen.getByText(/Loading task manager/)).toBeInTheDocument();
        expect(screen.getByText(/Ready/)).toBeInTheDocument();
    });

    it("should render TodoList widget", () => {
        render(<HomePage />);
        expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    });

    it("should have responsive padding classes", () => {
        render(<HomePage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("p-4", "md:p-8", "lg:p-12");
    });

    it("should have min-height screen class", () => {
        render(<HomePage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("min-h-screen");
    });

    it("should have max-width container", () => {
        const { container } = render(<HomePage />);
        const maxWidthContainer = container.querySelector(".max-w-2xl");
        expect(maxWidthContainer).toBeInTheDocument();
    });
});
