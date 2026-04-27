import { render, screen } from "@testing-library/react";

import { HomePage } from "../ui";

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

// Mock TodoList
jest.mock("@widgets/todo-list", () => ({
    TodoList: () => <div data-testid="todo-list">Todo List Content</div>,
}));

describe("HomePage", () => {
    it("should render main element", () => {
        render(<HomePage />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render the hero copy", () => {
        render(<HomePage />);
        expect(screen.getByText("Next.js Boilerplate")).toBeInTheDocument();
        expect(
            screen.getByText("Organize work with clarity and calm.")
        ).toBeInTheDocument();
    });

    it("should render supporting badges", () => {
        render(<HomePage />);
        expect(screen.getByText("Task planning")).toBeInTheDocument();
        expect(screen.getByText("Progress tracking")).toBeInTheDocument();
        expect(screen.getByText("Clean settings")).toBeInTheDocument();
    });

    it("should render the focus state card", () => {
        render(<HomePage />);
        expect(screen.getByText("Focus state")).toBeInTheDocument();
    });

    it("should render TodoList widget", () => {
        render(<HomePage />);
        expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    });

    it("should have responsive padding classes", () => {
        render(<HomePage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("px-4", "py-8", "md:px-8", "lg:px-12");
    });

    it("should have min-height screen class", () => {
        render(<HomePage />);
        const main = screen.getByRole("main");
        expect(main).toHaveClass("min-h-screen");
    });

    it("should have max-width container", () => {
        const { container } = render(<HomePage />);
        const maxWidthContainer = container.querySelector(".max-w-7xl");
        expect(maxWidthContainer).toBeInTheDocument();
    });
});
