"use client";

import { Todo } from "../model";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    return (
        <li className="group flex items-center justify-between py-2 px-3 hover:bg-primary/5 transition-colors duration-150 animate-fade-in">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* ASCII Checkbox */}
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`font-mono text-sm font-bold shrink-0 cursor-pointer select-none transition-all duration-200 ${
                        todo.completed
                            ? "text-success"
                            : "text-primary/60 hover:text-primary"
                    }`}
                    aria-label={
                        todo.completed
                            ? "Mark as incomplete"
                            : "Mark as complete"
                    }
                >
                    [{todo.completed ? "x" : " "}]
                </button>

                {/* Task Text */}
                <span
                    className={`truncate transition-all duration-200 ${
                        todo.completed
                            ? "line-through text-primary/40"
                            : "text-primary"
                    }`}
                >
                    {todo.text}
                </span>
            </div>

            {/* Delete Button */}
            <button
                onClick={() => onDelete(todo.id)}
                className="text-error/60 hover:text-error text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0 ml-2"
                aria-label="Delete task"
            >
                [DEL]
            </button>
        </li>
    );
};
