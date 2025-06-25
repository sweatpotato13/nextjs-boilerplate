"use client";

import { Button } from "@shared/ui";
import { useState } from "react";

interface CreateTodoProps {
    onCreateTodo: (text: string) => void;
}

export const CreateTodo = ({ onCreateTodo }: CreateTodoProps) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onCreateTodo(text);
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Enter a todo..."
                    className="flex-1 px-4 py-2 border rounded-md"
                />
                <Button type="submit" disabled={!text.trim()}>
                    Add
                </Button>
            </div>
        </form>
    );
};
