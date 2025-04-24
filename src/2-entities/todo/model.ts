export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export type TodoCreateDTO = Omit<Todo, "id" | "createdAt">;
