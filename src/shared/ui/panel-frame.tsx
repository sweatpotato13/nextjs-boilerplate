"use client";

import { cn } from "@shared/lib/utils";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";
import { ReactNode, useEffect, useState } from "react";

interface PanelFrameProps {
    title: string;
    children: ReactNode;
}

export const PanelFrame = ({ title, children }: PanelFrameProps) => {
    const [currentDate, setCurrentDate] = useState<string>("");

    useEffect(() => {
        setCurrentDate(
            new Date().toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        );
    }, []);

    return (
        <Card
            className={cn(
                "relative overflow-hidden border-border/60 bg-card/95 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            )}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <CardHeader className="gap-1 border-b border-border/60 px-6 py-5">
                <CardTitle className="text-base font-medium tracking-tight">
                    {title}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                    {currentDate}
                </div>
            </CardHeader>
            <CardContent className="px-6 py-6">{children}</CardContent>
        </Card>
    );
};
