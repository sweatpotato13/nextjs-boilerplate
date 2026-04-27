"use client";

import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/primitives/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeSwitcherProps {
    initialTheme?: Theme;
    onThemeChange?: (theme: Theme) => void;
}

export const ThemeSwitcher = ({
    initialTheme = "light",
    onThemeChange,
}: ThemeSwitcherProps) => {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    useEffect(() => {
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const shouldUseDark =
            theme === "dark" || (theme === "system" && prefersDark);

        document.documentElement.classList.toggle("dark", shouldUseDark);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const themes: { value: Theme; label: string; description: string }[] = [
        {
            value: "light",
            label: "Light",
            description: "Bright, airy workspace.",
        },
        { value: "dark", label: "Dark", description: "Low-glare focus mode." },
        {
            value: "system",
            label: "System",
            description: "Follow the device preference.",
        },
    ];

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        onThemeChange?.(newTheme);
    };

    return (
        <Card className="border-border/70 bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60">
                <CardTitle className="text-base">Appearance</CardTitle>
                <Badge variant="secondary" className="rounded-full">
                    {theme.toUpperCase()}
                </Badge>
            </CardHeader>
            <CardContent className="grid gap-3 pt-6">
                {themes.map(item => (
                    <label
                        key={item.value}
                        className={cn(
                            "flex cursor-pointer items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 transition-colors hover:bg-muted/40",
                            theme === item.value &&
                                "border-primary/30 bg-primary/5"
                        )}
                    >
                        <input
                            type="radio"
                            name="theme"
                            className="mt-1 size-4 accent-primary"
                            checked={theme === item.value}
                            onChange={() => handleThemeChange(item.value)}
                        />
                        <span className="grid gap-0.5">
                            <span className="text-sm font-medium">
                                {item.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {item.description}
                            </span>
                        </span>
                    </label>
                ))}
            </CardContent>
        </Card>
    );
};
