"use client";

import { useEffect, useState } from "react";

type Theme = "terminal" | "light" | "dark" | "cyberpunk";

interface ThemeSwitcherProps {
    initialTheme?: Theme;
    onThemeChange?: (theme: Theme) => void;
}

export const ThemeSwitcher = ({
    initialTheme = "terminal",
    onThemeChange,
}: ThemeSwitcherProps) => {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        if (onThemeChange) {
            onThemeChange(newTheme);
        }
    };

    const themes: { value: Theme; label: string }[] = [
        { value: "terminal", label: "Terminal" },
        { value: "dark", label: "Dark" },
        { value: "cyberpunk", label: "Cyberpunk" },
        { value: "light", label: "Light" },
    ];

    return (
        <div className="card bg-base-200 border border-primary/30">
            <div className="card-body">
                <h3 className="text-primary text-sm mb-4">
                    <span className="text-secondary">&gt;</span> APPEARANCE:
                </h3>

                <div className="form-control space-y-2">
                    {themes.map(t => (
                        <label
                            key={t.value}
                            className="label cursor-pointer justify-start gap-3"
                        >
                            <input
                                type="radio"
                                name="theme"
                                className="radio radio-primary radio-sm"
                                checked={theme === t.value}
                                onChange={() => handleThemeChange(t.value)}
                            />
                            <span
                                className={`label-text ${
                                    theme === t.value
                                        ? "text-primary"
                                        : "text-primary/60"
                                }`}
                            >
                                {t.label}
                            </span>
                        </label>
                    ))}
                </div>

                <div className="mt-4 pt-3 border-t border-primary/20 text-xs text-primary/40">
                    Current:{" "}
                    <span className="badge badge-warning badge-sm">
                        {theme.toUpperCase()}
                    </span>
                </div>
            </div>
        </div>
    );
};
