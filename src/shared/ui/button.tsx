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
        | "link";
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
