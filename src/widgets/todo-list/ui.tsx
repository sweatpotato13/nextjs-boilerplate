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

    const completedCount = todos.filter(todo => todo.completed).length;
    const pendingCount = todos.length - completedCount;

    return (
        <div className="space-y-4">
            {/* Input Section */}
            <div className="mb-6">
                <div className="text-primary/70 text-sm mb-2">
                    <span className="text-secondary">&gt;</span> NEW_TASK:
                </div>
                <CreateTodo onCreateTodo={handleCreateTodo} />
            </div>

            {/* Tasks Section */}
            <div>
                <div className="text-primary text-sm mb-3 flex items-center gap-2">
                    <span className="text-secondary">&gt;</span>
                    <span>TASKS:</span>
                    <span className="text-primary/50">
                        ({todos.length} total)
                    </span>
                </div>

                {todos.length === 0 ? (
                    <div className="text-center py-8 text-primary/40">
                        <pre className="text-xs leading-tight mb-2">
                            {`
    _____
   /     \\
  | () () |
   \\  ^  /
    |||||
    |||||
                            `}
                        </pre>
                        <p className="text-sm">No tasks found.</p>
                        <p className="text-xs text-primary/30">
                            Type a task above to get started.
                        </p>
                    </div>
                ) : (
                    <ul className="space-y-1">
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
            </div>

            {/* Status Line */}
            {todos.length > 0 && (
                <div className="pt-4 border-t border-primary/20 text-xs">
                    <div className="text-primary/70">
                        <span className="text-secondary">&gt;</span> STATUS:{" "}
                        <span className="text-success">{completedCount}</span>{" "}
                        completed |{" "}
                        <span className="text-warning">{pendingCount}</span>{" "}
                        pending
                    </div>
                    <div className="mt-1 flex gap-1">
                        <span className="text-primary/30">[</span>
                        {todos.map(todo => (
                            <span
                                key={todo.id}
                                className={
                                    todo.completed
                                        ? "text-success"
                                        : "text-primary/30"
                                }
                            >
                                {todo.completed ? "█" : "░"}
                            </span>
                        ))}
                        <span className="text-primary/30">]</span>
                        <span className="text-primary/50 ml-2">
                            {Math.round((completedCount / todos.length) * 100)}%
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
