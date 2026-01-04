"use client";

import { useState } from "react";

interface CreateTodoProps {
    onCreateTodo: (text: string) => void;
}

export const CreateTodo = ({ onCreateTodo }: CreateTodoProps) => {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onCreateTodo(text);
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            {/* Prompt Symbol */}
            <span
                className={`text-lg shrink-0 transition-colors duration-150 ${
                    isFocused ? "text-secondary" : "text-primary/50"
                }`}
            >
                &gt;
            </span>

            {/* Input Field */}
            <div className="flex-1 relative">
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter task..."
                    className="input input-bordered input-primary w-full bg-transparent text-primary placeholder:text-primary/40"
                />
                {isFocused && text === "" && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary animate-blink">
                        _
                    </span>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!text.trim()}
                className={`btn btn-ghost text-sm font-medium ${
                    text.trim()
                        ? "text-success hover:bg-success/10"
                        : "text-primary/30 btn-disabled"
                }`}
            >
                [ENTER]
            </button>
        </form>
    );
};
