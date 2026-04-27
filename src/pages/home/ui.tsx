"use client";

import { PanelFrame } from "@shared/ui";
import { Badge } from "@shared/ui/primitives/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";
import { TodoList } from "@widgets/todo-list";

export const HomePage = () => {
    return (
        <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto grid max-w-7xl gap-8">
                <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
                    <Card className="border-border/70 bg-card/90 shadow-sm">
                        <CardHeader className="space-y-4 border-b border-border/60">
                            <Badge
                                variant="secondary"
                                className="w-fit rounded-full px-3"
                            >
                                Next.js Boilerplate
                            </Badge>
                            <CardTitle className="text-3xl font-semibold tracking-tight md:text-5xl">
                                Organize work with clarity and calm.
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 pt-6 text-sm text-muted-foreground md:text-base">
                            <p>
                                A focused dashboard for planning tasks, tracking
                                progress, and keeping the interface soft, fast,
                                and intentional.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    Task planning
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    Progress tracking
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    Clean settings
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/70 bg-card/90 shadow-sm">
                        <CardHeader className="border-b border-border/60">
                            <CardTitle className="text-base">
                                Focus state
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3 pt-6 text-sm text-muted-foreground">
                            <p>
                                Live list, local interactions, polished
                                presentation.
                            </p>
                            <p>
                                Built for quick planning with a quiet visual
                                system.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <PanelFrame title="Task board">
                    <TodoList />
                </PanelFrame>
            </div>
        </main>
    );
};
