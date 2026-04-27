"use client";

import { cn } from "@shared/lib/utils";
import { Button as BaseButton } from "@shared/ui/primitives/button";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    variant?:
        | "default"
        | "secondary"
        | "destructive"
        | "ghost"
        | "link"
        | "outline"
        | "accent"
        | "info"
        | "success"
        | "warning"
        | "error";
    size?: "lg" | "md" | "sm" | "xs";
    outline?: boolean;
    wide?: boolean;
    glass?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantMap: Record<
    NonNullable<ButtonProps["variant"]>,
    "default" | "secondary" | "destructive" | "ghost" | "link" | "outline"
> = {
    default: "default",
    secondary: "secondary",
    destructive: "destructive",
    ghost: "ghost",
    link: "link",
    outline: "outline",
    accent: "outline",
    info: "outline",
    success: "outline",
    warning: "outline",
    error: "destructive",
};

export const Button = ({
    children,
    variant = "default",
    size = "md",
    outline = false,
    wide = false,
    glass = false,
    className = "",
    ...props
}: ButtonProps) => {
    const resolvedVariant = outline ? "outline" : variantMap[variant];
    const resolvedSize = size === "md" ? "default" : size;
    const modifierClass = cn(
        wide && "w-full",
        glass && "border-white/40 bg-white/40 shadow-sm backdrop-blur-xl",
        variant === "accent" &&
            "border-primary/20 bg-primary/10 text-primary hover:bg-primary/15",
        variant === "info" &&
            "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 dark:border-sky-900/40 dark:bg-sky-950/40 dark:text-sky-200",
        variant === "success" &&
            "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200",
        variant === "warning" &&
            "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-200",
        variant === "error" &&
            "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200"
    );

    return (
        <BaseButton
            variant={resolvedVariant}
            size={resolvedSize}
            className={cn(modifierClass, className)}
            {...props}
        >
            {children}
        </BaseButton>
    );
};
