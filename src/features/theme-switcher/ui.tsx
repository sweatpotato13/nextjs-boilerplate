"use client";

import { useEffect, useState } from "react";

type Theme =
    | "light"
    | "dark"
    | "cupcake"
    | "synthwave"
    | "retro"
    | "cyberpunk"
    | "valentine"
    | "halloween"
    | "garden"
    | "forest"
    | "lofi"
    | "pastel"
    | "fantasy"
    | "wireframe"
    | "luxury"
    | "dracula"
    | "cmyk"
    | "autumn"
    | "business"
    | "acid"
    | "lemonade"
    | "night"
    | "coffee"
    | "winter";

interface ThemeSwitcherProps {
    initialTheme?: Theme;
    onThemeChange?: (theme: Theme) => void;
}

export const ThemeSwitcher = ({
    initialTheme = "light",
    onThemeChange,
}: ThemeSwitcherProps) => {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    // Apply theme to html element
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

    return (
        <div className="card bg-base-100 shadow-md">
            <div className="card-body">
                <h3 className="card-title">Appearance</h3>

                <div className="form-control">
                    {/* Light theme */}
                    <label className="label cursor-pointer justify-start gap-4">
                        <input
                            type="radio"
                            name="theme"
                            className="radio radio-primary"
                            checked={theme === "light"}
                            onChange={() => handleThemeChange("light")}
                        />
                        <span className="label-text">Light</span>
                    </label>

                    {/* Dark theme */}
                    <label className="label cursor-pointer justify-start gap-4">
                        <input
                            type="radio"
                            name="theme"
                            className="radio radio-primary"
                            checked={theme === "dark"}
                            onChange={() => handleThemeChange("dark")}
                        />
                        <span className="label-text">Dark</span>
                    </label>

                    {/* Cupcake theme */}
                    <label className="label cursor-pointer justify-start gap-4">
                        <input
                            type="radio"
                            name="theme"
                            className="radio radio-primary"
                            checked={theme === "cupcake"}
                            onChange={() => handleThemeChange("cupcake")}
                        />
                        <span className="label-text">Cupcake</span>
                    </label>

                    {/* Cyberpunk theme */}
                    <label className="label cursor-pointer justify-start gap-4">
                        <input
                            type="radio"
                            name="theme"
                            className="radio radio-primary"
                            checked={theme === "cyberpunk"}
                            onChange={() => handleThemeChange("cyberpunk")}
                        />
                        <span className="label-text">Cyberpunk</span>
                    </label>
                </div>

                <div className="mt-4 text-sm opacity-70">
                    Current theme:{" "}
                    <span className="badge badge-primary">{theme}</span>
                </div>
            </div>
        </div>
    );
};
