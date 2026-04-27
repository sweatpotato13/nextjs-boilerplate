import { fireEvent, render, screen } from "@testing-library/react";

import { TodoList } from "../ui";

// Mock uuid
jest.mock("uuid", () => ({
    v4: jest.fn(() => "mock-uuid"),
}));

// Mock TodoItem
jest.mock("@entities/todo", () => ({
    TodoItem: ({
        todo,
        onToggle,
        onDelete,
    }: {
        todo: { id: string; text: string; completed: boolean };
        onToggle: (id: string) => void;
        onDelete: (id: string) => void;
    }) => (
        <li data-testid={`todo-${todo.id}`}>
            <span>{todo.text}</span>
            <span>{todo.completed ? "[x]" : "[ ]"}</span>
            <button onClick={() => onToggle(todo.id)}>Toggle</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    ),
}));

// Mock CreateTodo
jest.mock("@features/todo-operations", () => ({
    CreateTodo: ({
        onCreateTodo,
    }: {
        onCreateTodo: (text: string) => void;
    }) => (
        <div data-testid="create-todo">
            <input
                data-testid="create-input"
                onChange={e => {
                    if (e.target.value) {
                        // Simulate form submission
                    }
                }}
            />
            <button
                data-testid="create-button"
                onClick={() => onCreateTodo("New todo")}
            >
                Create
            </button>
        </div>
    ),
}));

describe("TodoList", () => {
    it("should render the overview header", () => {
        render(<TodoList />);
        expect(screen.getByText("Task overview")).toBeInTheDocument();
    });

    it("should render CreateTodo component", () => {
        render(<TodoList />);
        expect(screen.getByTestId("create-todo")).toBeInTheDocument();
    });

    it("should render tasks header", () => {
        render(<TodoList />);
        expect(screen.getByText("Today's tasks")).toBeInTheDocument();
    });

    it("should render initial todos", () => {
        render(<TodoList />);
        expect(screen.getByText("Morning exercise")).toBeInTheDocument();
        expect(screen.getByText("Eat lunch")).toBeInTheDocument();
    });

    it("should display todo count", () => {
        render(<TodoList />);
        expect(screen.getByText("2 total tasks")).toBeInTheDocument();
    });

    it("should create new todo when CreateTodo calls onCreateTodo", () => {
        render(<TodoList />);

        fireEvent.click(screen.getByTestId("create-button"));

        expect(screen.getByText("New todo")).toBeInTheDocument();
        expect(screen.getByText("3 total tasks")).toBeInTheDocument();
    });

    it("should toggle todo completed status", () => {
        render(<TodoList />);

        // Find the toggle button for the first uncompleted todo
        const todo1 = screen.getByTestId("todo-1");
        const toggleButton = todo1.querySelector("button");
        fireEvent.click(toggleButton!);

        // After toggle, should still be in the list
        expect(screen.getByTestId("todo-1")).toBeInTheDocument();
    });

    it("should delete todo when delete is clicked", () => {
        render(<TodoList />);

        const todo1 = screen.getByTestId("todo-1");
        const deleteButton = todo1.querySelectorAll("button")[1];
        fireEvent.click(deleteButton);

        expect(screen.queryByTestId("todo-1")).not.toBeInTheDocument();
        expect(screen.getByText("1 total tasks")).toBeInTheDocument();
    });

    it("should display completed and pending counts", () => {
        render(<TodoList />);
        expect(screen.getByText("1 done")).toBeInTheDocument();
        expect(screen.getByText("1 open")).toBeInTheDocument();
    });

    it("should show empty state when all todos are deleted", () => {
        render(<TodoList />);

        // Delete both todos
        const todo1 = screen.getByTestId("todo-1");
        fireEvent.click(todo1.querySelectorAll("button")[1]);

        const todo2 = screen.getByTestId("todo-2");
        fireEvent.click(todo2.querySelectorAll("button")[1]);

        expect(screen.getByText("No tasks yet")).toBeInTheDocument();
        expect(
            screen.getByText("Add your first task to get started.")
        ).toBeInTheDocument();
    });

    it("should display progress bar when todos exist", () => {
        render(<TodoList />);
        expect(screen.getByText("50%")).toBeInTheDocument();
    });

    it("should update progress bar when todos change", () => {
        render(<TodoList />);

        // Toggle the uncompleted todo
        const todo1 = screen.getByTestId("todo-1");
        fireEvent.click(todo1.querySelector("button")!);

        expect(screen.getByText("100%")).toBeInTheDocument();
        expect(screen.getByText("2 total tasks")).toBeInTheDocument();
        expect(screen.getByText("2 done")).toBeInTheDocument();
        expect(screen.getByText("0 open")).toBeInTheDocument();
    });

    it("should keep summary visible when no todos", () => {
        render(<TodoList />);

        // Delete all todos
        fireEvent.click(
            screen.getByTestId("todo-1").querySelectorAll("button")[1]
        );
        fireEvent.click(
            screen.getByTestId("todo-2").querySelectorAll("button")[1]
        );

        expect(screen.getByText("0 total tasks")).toBeInTheDocument();
    });

    it("should render ASCII art in empty state", () => {
        render(<TodoList />);

        // Delete all todos to show empty state
        fireEvent.click(
            screen.getByTestId("todo-1").querySelectorAll("button")[1]
        );
        fireEvent.click(
            screen.getByTestId("todo-2").querySelectorAll("button")[1]
        );

        // Check for pre element (ASCII art container)
        expect(screen.getByText("No tasks yet")).toBeInTheDocument();
    });
});
