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
            screen.getByPlaceholderText("Add a new task")
        ).toBeInTheDocument();
    });

    it("should render submit button", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        expect(
            screen.getByRole("button", { name: "Add task" })
        ).toBeInTheDocument();
    });

    it("should update input value on change", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");

        fireEvent.change(input, { target: { value: "New task" } });

        expect(input).toHaveValue("New task");
    });

    it("should disable submit button when input is empty", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const button = screen.getByRole("button", { name: "Add task" });

        expect(button).toBeDisabled();
    });

    it("should enable submit button when input has text", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");
        const button = screen.getByRole("button", { name: "Add task" });

        fireEvent.change(input, { target: { value: "New task" } });

        expect(button).toBeEnabled();
    });

    it("should call onCreateTodo with text on form submit", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");

        fireEvent.change(input, { target: { value: "My new task" } });
        fireEvent.submit(input.closest("form") as HTMLFormElement);

        expect(mockOnCreateTodo).toHaveBeenCalledWith("My new task");
    });

    it("should clear input after submission", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");

        fireEvent.change(input, { target: { value: "My new task" } });
        fireEvent.submit(input.closest("form") as HTMLFormElement);

        expect(input).toHaveValue("");
    });

    it("should not call onCreateTodo when input is whitespace only", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");

        fireEvent.change(input, { target: { value: "   " } });
        fireEvent.submit(input.closest("form") as HTMLFormElement);

        expect(mockOnCreateTodo).not.toHaveBeenCalled();
    });

    it("should not call onCreateTodo when input is empty", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");

        fireEvent.submit(input.closest("form") as HTMLFormElement);

        expect(mockOnCreateTodo).not.toHaveBeenCalled();
    });

    it("should change prompt color on focus", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");

        fireEvent.focus(input);
        expect(input).toBeInTheDocument();
    });

    it("should revert prompt color on blur", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");

        fireEvent.focus(input);
        fireEvent.blur(input);
        expect(input).not.toHaveFocus();
    });

    it("should disable submit until text is entered", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");
        const button = screen.getByRole("button", { name: "Add task" });

        fireEvent.focus(input);

        expect(button).toBeDisabled();
    });

    it("should enable submit after text is entered", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");
        const button = screen.getByRole("button", { name: "Add task" });

        fireEvent.change(input, { target: { value: "Some text" } });

        expect(button).toBeEnabled();
    });

    it("should trim text before calling onCreateTodo", () => {
        render(<CreateTodo onCreateTodo={mockOnCreateTodo} />);
        const input = screen.getByPlaceholderText("Add a new task");

        fireEvent.change(input, { target: { value: "  trimmed task  " } });
        fireEvent.submit(input.closest("form") as HTMLFormElement);

        expect(mockOnCreateTodo).toHaveBeenCalledWith("trimmed task");
    });
});
