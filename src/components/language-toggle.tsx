"use client";

import * as React from "react";
import { TextIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next-intl/client";

export function LanguageToggle() {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <TextIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Change Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => router.replace("/", { locale: "ko" })}
                >
                    🇰🇷 Korean
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => router.replace("/", { locale: "en" })}
                >
                    🇺🇸 English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
