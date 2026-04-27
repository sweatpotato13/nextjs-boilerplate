"use client";

import { PanelFrame } from "@shared/ui";
import { Badge } from "@shared/ui/primitives/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";

const principles = [
    "Clear structure for large applications",
    "Promotes reusable building blocks",
    "Keeps dependencies predictable",
    "Supports fast onboarding",
    "Scales across teams and features",
];

export const AboutPage = () => {
    return (
        <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto grid max-w-5xl gap-8">
                <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <Card className="border-border/70 bg-card/90 shadow-sm">
                        <CardHeader className="space-y-4 border-b border-border/60">
                            <Badge
                                variant="secondary"
                                className="w-fit rounded-full px-3"
                            >
                                Architecture overview
                            </Badge>
                            <CardTitle className="text-3xl font-semibold tracking-tight md:text-4xl">
                                Built around Feature-Sliced Design.
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 pt-6 text-sm text-muted-foreground md:text-base">
                            <p>
                                Feature-Sliced Design keeps the app organized by
                                responsibility, making the codebase easier to
                                extend and review.
                            </p>
                            <p>
                                The updated UI leans into soft elevation,
                                balanced spacing, and a light-first palette with
                                subtle dark mode support.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/70 bg-card/90 shadow-sm">
                        <CardHeader className="border-b border-border/60">
                            <CardTitle className="text-base">
                                Principles
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3 pt-6">
                            {principles.map(principle => (
                                <div
                                    key={principle}
                                    className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground"
                                >
                                    {principle}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>

                <PanelFrame title="Design system">
                    <div className="grid gap-4 md:grid-cols-3">
                        {[
                            [
                                "Shadcn UI",
                                "Composable primitives with clean tokens.",
                            ],
                            [
                                "Soft gradients",
                                "Atmosphere without visual noise.",
                            ],
                            [
                                "Semantic color",
                                "Consistent surfaces and hierarchy.",
                            ],
                        ].map(([title, description]) => (
                            <Card
                                key={title}
                                className="border-border/70 bg-card shadow-sm"
                            >
                                <CardHeader className="border-b border-border/60">
                                    <CardTitle className="text-base">
                                        {title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 text-sm text-muted-foreground">
                                    {description}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </PanelFrame>
            </div>
        </main>
    );
};
