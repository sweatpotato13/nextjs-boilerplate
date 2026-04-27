"use client";

import { cn } from "@shared/lib/utils";
import { Button } from "@shared/ui/primitives/button";
import { Input } from "@shared/ui/primitives/input";
import { FormEvent, useState } from "react";

interface CreateTodoProps {
    onCreateTodo: (text: string) => void;
}

export const CreateTodo = ({ onCreateTodo }: CreateTodoProps) => {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!text.trim()) {
            return;
        }

        onCreateTodo(text.trim());
        setText("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center"
        >
            <Input
                value={text}
                onChange={e => setText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Add a new task"
                className={cn(
                    "h-11 bg-background/70",
                    isFocused && "ring-2 ring-ring/20"
                )}
            />

            <Button
                type="submit"
                disabled={!text.trim()}
                className="h-11 rounded-xl px-5"
            >
                Add task
            </Button>
        </form>
    );
};
