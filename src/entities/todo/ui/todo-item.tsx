"use client";

import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/primitives/badge";
import { Button } from "@shared/ui/primitives/button";
import { Card } from "@shared/ui/primitives/card";
import { Checkbox } from "@shared/ui/primitives/checkbox";

import { Todo } from "../model";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    const createdAtLabel = new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(todo.createdAt);

    return (
        <Card className="border-border/70 bg-card/90 px-4 py-4 shadow-sm transition-transform hover:-translate-y-0.5">
            <div className="flex items-start gap-4">
                <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => onToggle(todo.id)}
                    aria-label={
                        todo.completed
                            ? "Mark as incomplete"
                            : "Mark as complete"
                    }
                    className="mt-1"
                />

                <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                        <p
                            className={cn(
                                "truncate text-sm font-medium md:text-base",
                                todo.completed &&
                                    "text-muted-foreground line-through"
                            )}
                        >
                            {todo.text}
                        </p>
                        <Badge
                            variant={todo.completed ? "secondary" : "outline"}
                            className="rounded-full"
                        >
                            {todo.completed ? "Done" : "Open"}
                        </Badge>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Added {createdAtLabel}
                    </p>
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete task"
                >
                    ×
                </Button>
            </div>
        </Card>
    );
};
