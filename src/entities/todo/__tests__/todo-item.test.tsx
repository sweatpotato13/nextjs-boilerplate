import { fireEvent, render, screen } from "@testing-library/react";

import { Todo } from "../model";
import { TodoItem } from "../ui/todo-item";

describe("TodoItem", () => {
    const mockTodo: Todo = {
        id: "1",
        text: "Test todo item",
        completed: false,
        createdAt: new Date("2024-01-15"),
    };

    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render todo text", () => {
        render(
            <TodoItem
                todo={mockTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByText("Test todo item")).toBeInTheDocument();
    });

    it("should render unchecked checkbox for incomplete todo", () => {
        render(
            <TodoItem
                todo={mockTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByText("[ ]")).toBeInTheDocument();
    });

    it("should render checked checkbox for completed todo", () => {
        const completedTodo = { ...mockTodo, completed: true };
        render(
            <TodoItem
                todo={completedTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByText("[x]")).toBeInTheDocument();
    });

    it("should call onToggle with todo id when checkbox is clicked", () => {
        render(
            <TodoItem
                todo={mockTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        const checkbox = screen.getByRole("button", {
            name: /Mark as complete/,
        });
        fireEvent.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith("1");
    });

    it("should have correct aria-label for incomplete todo", () => {
        render(
            <TodoItem
                todo={mockTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        expect(
            screen.getByRole("button", { name: "Mark as complete" })
        ).toBeInTheDocument();
    });

    it("should have correct aria-label for completed todo", () => {
        const completedTodo = { ...mockTodo, completed: true };
        render(
            <TodoItem
                todo={completedTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        expect(
            screen.getByRole("button", { name: "Mark as incomplete" })
        ).toBeInTheDocument();
    });

    it("should render delete button", () => {
        render(
            <TodoItem
                todo={mockTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );
        expect(
            screen.getByRole("button", { name: "Delete task" })
        ).toBeInTheDocument();
        expect(screen.getByText("[DEL]")).toBeInTheDocument();
    });

    it("should call onDelete with todo id when delete button is clicked", () => {
        render(
            <TodoItem
                todo={mockTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        const deleteButton = screen.getByRole("button", {
            name: "Delete task",
        });
        fireEvent.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalledTimes(1);
        expect(mockOnDelete).toHaveBeenCalledWith("1");
    });

    it("should apply line-through style to completed todo text", () => {
        const completedTodo = { ...mockTodo, completed: true };
        render(
            <TodoItem
                todo={completedTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        const todoText = screen.getByText("Test todo item");
        expect(todoText).toHaveClass("line-through");
    });

    it("should not have line-through style for incomplete todo", () => {
        render(
            <TodoItem
                todo={mockTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        const todoText = screen.getByText("Test todo item");
        expect(todoText).not.toHaveClass("line-through");
    });

    it("should handle todo with long text", () => {
        const longTextTodo = { ...mockTodo, text: "A".repeat(200) };
        render(
            <TodoItem
                todo={longTextTodo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        expect(screen.getByText("A".repeat(200))).toBeInTheDocument();
    });
});
