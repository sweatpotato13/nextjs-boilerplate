"use client";

import { Todo, TodoItem } from "@entities/todo";
import { CreateTodo } from "@features/todo-operations";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: "1",
            text: "Morning exercise",
            completed: false,
            createdAt: new Date("2024-01-01T10:00:00Z"),
        },
        {
            id: "2",
            text: "Eat lunch",
            completed: true,
            createdAt: new Date("2024-01-01T12:00:00Z"),
        },
    ]);

    const handleCreateTodo = (text: string) => {
        const newTodo: Todo = {
            id: uuidv4(),
            text,
            completed: false,
            createdAt: new Date(),
        };
        setTodos([...todos, newTodo]);
    };

    const handleToggleTodo = (id: string) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDeleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <CreateTodo onCreateTodo={handleCreateTodo} />

            <h2 className="text-xl font-semibold mb-4">Todo List</h2>

            {todos.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No todos yet</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggleTodo}
                            onDelete={handleDeleteTodo}
                        />
                    ))}
                </ul>
            )}

            <div className="mt-4 text-sm text-gray-500">
                Total: {todos.length} items,{" "}
                {todos.filter(todo => todo.completed).length} completed
            </div>
        </div>
    );
};
