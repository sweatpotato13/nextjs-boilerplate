"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "./language-toggle";

export function ModeNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <LanguageToggle></LanguageToggle>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <ThemeToggle></ThemeToggle>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
