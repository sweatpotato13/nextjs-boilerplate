"use client";

import { Todo, TodoItem } from "@entities/todo";
import { CreateTodo } from "@features/todo-operations";
import { Badge } from "@shared/ui/primitives/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";
import { Progress } from "@shared/ui/primitives/progress";
import { Separator } from "@shared/ui/primitives/separator";
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

    const completedCount = todos.filter(todo => todo.completed).length;
    const pendingCount = todos.length - completedCount;
    const progress = todos.length
        ? Math.round((completedCount / todos.length) * 100)
        : 0;

    const handleCreateTodo = (text: string) => {
        setTodos(current => [
            ...current,
            { id: uuidv4(), text, completed: false, createdAt: new Date() },
        ]);
    };

    const handleToggleTodo = (id: string) => {
        setTodos(current =>
            current.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDeleteTodo = (id: string) => {
        setTodos(current => current.filter(todo => todo.id !== id));
    };

    return (
        <div className="grid gap-6">
            <Card className="border-border/70 bg-card/95 shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-border/60">
                    <div className="grid gap-1">
                        <CardTitle className="text-base">
                            Task overview
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Keep the day moving with a clean, focused queue.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant="secondary"
                            className="rounded-full px-3"
                        >
                            {completedCount} done
                        </Badge>
                        <Badge variant="outline" className="rounded-full px-3">
                            {pendingCount} open
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="grid gap-4 pt-6">
                    <CreateTodo onCreateTodo={handleCreateTodo} />

                    <div className="grid gap-2 rounded-2xl border border-border/60 bg-muted/30 p-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Completion</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/95 shadow-sm">
                <CardHeader className="border-b border-border/60">
                    <CardTitle className="text-base">
                        Today&apos;s tasks
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-3 pt-6">
                    {todos.length === 0 ? (
                        <div className="grid gap-2 rounded-2xl border border-dashed border-border/70 bg-muted/20 px-5 py-10 text-center">
                            <p className="text-sm font-medium">No tasks yet</p>
                            <p className="text-sm text-muted-foreground">
                                Add your first task to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {todos.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={handleToggleTodo}
                                    onDelete={handleDeleteTodo}
                                />
                            ))}
                        </div>
                    )}

                    <Separator />

                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                        <span>
                            {completedCount} completed · {pendingCount} pending
                        </span>
                        <span>{todos.length} total tasks</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
