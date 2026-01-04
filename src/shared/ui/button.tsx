"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    variant?:
        | "primary"
        | "secondary"
        | "accent"
        | "info"
        | "success"
        | "warning"
        | "error"
        | "ghost"
        | "link"
        | "terminal";
    size?: "lg" | "md" | "sm" | "xs";
    outline?: boolean;
    wide?: boolean;
    glass?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
    children,
    variant = "primary",
    size,
    outline = false,
    wide = false,
    glass = false,
    className = "",
    ...props
}: ButtonProps) => {
    // Terminal style variant
    if (variant === "terminal") {
        return (
            <button
                className={`font-mono text-primary hover:text-glow-subtle transition-all duration-150 
                    hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] 
                    disabled:text-primary/30 disabled:cursor-not-allowed disabled:hover:shadow-none
                    ${size === "lg" ? "text-lg px-4 py-2" : ""}
                    ${size === "md" || !size ? "text-sm px-3 py-1.5" : ""}
                    ${size === "sm" ? "text-xs px-2 py-1" : ""}
                    ${size === "xs" ? "text-xs px-1 py-0.5" : ""}
                    ${wide ? "w-full" : ""}
                    ${className}`}
                {...props}
            >
                [ {children} ]
            </button>
        );
    }

    // DaisyUI style variants
    const baseClass = "btn";
    const variantClass = variant ? `btn-${variant}` : "";
    const sizeClass = size ? `btn-${size}` : "";
    const outlineClass = outline ? "btn-outline" : "";
    const wideClass = wide ? "btn-wide" : "";
    const glassClass = glass ? "glass" : "";

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${outlineClass} ${wideClass} ${glassClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
