export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export type TodoCreateDTO = Omit<Todo, "id" | "createdAt">;

/**
 * Creates a new Todo object with the given parameters.
 */
export const createTodo = (
    id: string,
    text: string,
    completed: boolean = false
): Todo => ({
    id,
    text,
    completed,
    createdAt: new Date(),
});

/**
 * Creates a TodoCreateDTO object.
 */
export const createTodoDTO = (
    text: string,
    completed: boolean = false
): TodoCreateDTO => ({
    text,
    completed,
});
