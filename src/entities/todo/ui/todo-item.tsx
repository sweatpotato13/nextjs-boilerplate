"use client";

import { Button } from "@shared/ui";

import { Todo } from "../model";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    return (
        <li className="flex items-center justify-between p-4 mb-2 border rounded-lg">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="w-5 h-5 mr-3"
                />
                <span
                    className={`${todo.completed ? "line-through text-gray-500" : ""}`}
                >
                    {todo.text}
                </span>
            </div>
            <Button
                variant="error"
                onClick={() => onDelete(todo.id)}
                className="ml-4"
            >
                Delete
            </Button>
        </li>
    );
};
