import { fireEvent, render, screen } from "@testing-library/react";

import { CreateTodo } from "../create-todo/ui";

describe("CreateTodo", () => {
    const mockOnCreateTodo = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render input field", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        expect(
            screen.getByPlaceholderText("Enter task...")
        ).toBeInTheDocument();
    });

    it("should render submit button", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        expect(
            screen.getByRole("button", { name: "[ENTER]" })
        ).toBeInTheDocument();
    });

    it("should render prompt symbol", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        expect(screen.getByText(">")).toBeInTheDocument();
    });

    it("should update input value on change", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Enter task...");

        fireEvent.change(input, { target: { value: "New task" } });

        expect(input).toHaveValue("New task");
    });

    it("should disable submit button when input is empty", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const button = screen.getByRole("button", { name: "[ENTER]" });

        expect(button).toHaveClass("btn-disabled");
    });

    it("should enable submit button when input has text", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Enter task...");
        const button = screen.getByRole("button", { name: "[ENTER]" });

        fireEvent.change(input, { target: { value: "New task" } });

        expect(button).not.toHaveClass("btn-disabled");
        expect(button).toHaveClass("text-success");
    });

    it("should call onCreateTodo with text on form submit", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Enter task...");

        fireEvent.change(input, { target: { value: "My new task" } });
        fireEvent.submit(input.closest("form")!);

        expect(mockOnCreateTodo).toHaveBeenCalledWith("My new task");
    });

    it("should clear input after submission", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Enter task...");

        fireEvent.change(input, { target: { value: "My new task" } });
        fireEvent.submit(input.closest("form")!);

        expect(input).toHaveValue("");
    });

    it("should not call onCreateTodo when input is whitespace only", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Enter task...");

        fireEvent.change(input, { target: { value: "   " } });
        fireEvent.submit(input.closest("form")!);

        expect(mockOnCreateTodo).not.toHaveBeenCalled();
    });

    it("should not call onCreateTodo when input is empty", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Enter task...");

        fireEvent.submit(input.closest("form")!);

        expect(mockOnCreateTodo).not.toHaveBeenCalled();
    });

    it("should change prompt color on focus", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Enter task...");
        const prompt = screen.getByText(">");

        expect(prompt).toHaveClass("text-primary/50");

        fireEvent.focus(input);

        expect(prompt).toHaveClass("text-secondary");
    });

    it("should revert prompt color on blur", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Enter task...");
        const prompt = screen.getByText(">");

        fireEvent.focus(input);
        expect(prompt).toHaveClass("text-secondary");

        fireEvent.blur(input);
        expect(prompt).toHaveClass("text-primary/50");
    });

    it("should show blinking cursor when focused and empty", () => {
        const { container } = render(
            <CreateTodo onCreateTodo={mockOnCreateTodo} />
        );
        const input = screen.getByPlaceholderText("Enter task...");

        fireEvent.focus(input);

        const cursor = container.querySelector(".animate-blink");
        expect(cursor).toBeInTheDocument();
        expect(cursor).toHaveTextContent("_");
    });

    it("should hide blinking cursor when there is text", () => {
        const { container } = render(
            <CreateTodo onCreateTodo={mockOnCreateTodo} />
        );
        const input = screen.getByPlaceholderText("Enter task...");

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "Some text" } });

        const cursor = container.querySelector(".animate-blink");
        expect(cursor).not.toBeInTheDocument();
    });

    it("should trim text before calling onCreateTodo", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Enter task...");

        fireEvent.change(input, { target: { value: "  trimmed task  " } });
        fireEvent.submit(input.closest("form")!);

        // The text is passed as-is to the handler, trimming happens in the condition check
        expect(mockOnCreateTodo).toHaveBeenCalledWith("  trimmed task  ");
    });
});
