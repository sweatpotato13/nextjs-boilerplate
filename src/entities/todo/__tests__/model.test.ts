import { createTodo, createTodoDTO, Todo, TodoCreateDTO } from "../model";

describe("Todo Model", () => {
    describe("Todo interface", () => {
        it("should allow creating a valid todo object", () => {
            const todo: Todo = {
                id: "test-id",
                text: "Test todo item",
                completed: false,
                createdAt: new Date(),
            };

            expect(todo.id).toBe("test-id");
            expect(todo.text).toBe("Test todo item");
            expect(todo.completed).toBe(false);
            expect(todo.createdAt).toBeInstanceOf(Date);
        });

        it("should allow completed to be true", () => {
            const todo: Todo = {
                id: "1",
                text: "Completed task",
                completed: true,
                createdAt: new Date(),
            };

            expect(todo.completed).toBe(true);
        });

        it("should handle empty text", () => {
            const todo: Todo = {
                id: "1",
                text: "",
                completed: false,
                createdAt: new Date(),
            };

            expect(todo.text).toBe("");
        });

        it("should handle long text", () => {
            const longText = "A".repeat(1000);
            const todo: Todo = {
                id: "1",
                text: longText,
                completed: false,
                createdAt: new Date(),
            };

            expect(todo.text).toBe(longText);
            expect(todo.text.length).toBe(1000);
        });
    });

    describe("TodoCreateDTO type", () => {
        it("should only require text and completed fields", () => {
            const dto: TodoCreateDTO = {
                text: "New todo",
                completed: false,
            };

            expect(dto.text).toBe("New todo");
            expect(dto.completed).toBe(false);
            // id and createdAt should not be required
            expect((dto as Todo).id).toBeUndefined();
            expect((dto as Todo).createdAt).toBeUndefined();
        });

        it("should allow creating dto with completed true", () => {
            const dto: TodoCreateDTO = {
                text: "Pre-completed todo",
                completed: true,
            };

            expect(dto.completed).toBe(true);
        });
    });

    describe("createTodo factory function", () => {
        it("should create a todo with required fields", () => {
            const todo = createTodo("1", "Test task");

            expect(todo.id).toBe("1");
            expect(todo.text).toBe("Test task");
            expect(todo.completed).toBe(false);
            expect(todo.createdAt).toBeInstanceOf(Date);
        });

        it("should create a todo with completed set to true", () => {
            const todo = createTodo("2", "Completed task", true);

            expect(todo.id).toBe("2");
            expect(todo.text).toBe("Completed task");
            expect(todo.completed).toBe(true);
        });

        it("should set createdAt to current date", () => {
            const before = new Date();
            const todo = createTodo("3", "Task");
            const after = new Date();

            expect(todo.createdAt.getTime()).toBeGreaterThanOrEqual(
                before.getTime()
            );
            expect(todo.createdAt.getTime()).toBeLessThanOrEqual(
                after.getTime()
            );
        });
    });

    describe("createTodoDTO factory function", () => {
        it("should create a DTO with text and default completed", () => {
            const dto = createTodoDTO("New task");

            expect(dto.text).toBe("New task");
            expect(dto.completed).toBe(false);
        });

        it("should create a DTO with completed set to true", () => {
            const dto = createTodoDTO("Pre-completed", true);

            expect(dto.text).toBe("Pre-completed");
            expect(dto.completed).toBe(true);
        });
    });
});
