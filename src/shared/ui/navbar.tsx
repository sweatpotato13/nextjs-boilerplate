"use client";

import { useAuth } from "@entities/session";
import { cn } from "@shared/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@shared/ui/primitives/avatar";
import { Badge } from "@shared/ui/primitives/badge";
import { buttonVariants } from "@shared/ui/primitives/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@shared/ui/primitives/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, isLoading, logout } = useAuth();

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/profile", label: "Profile" },
        { path: "/settings", label: "Settings" },
    ];

    const isActive = (path: string) => pathname === path;
    const initial =
        user?.fullName?.charAt(0) || user?.username?.charAt(0) || "N";
    const handleNavigate = (path: string) => {
        router.push(path);
    };
    const handleSignOut = () => {
        logout();
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
            <nav className="mx-auto flex w-full max-w-7xl items-center justify-end gap-4 px-4 py-3 md:px-6 lg:justify-between lg:px-8">
                <div className="hidden items-center gap-2 lg:flex">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                buttonVariants({
                                    variant: isActive(item.path)
                                        ? "secondary"
                                        : "ghost",
                                    size: "sm",
                                }),
                                "rounded-full px-4",
                                isActive(item.path) && "shadow-sm"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {isLoading ? (
                        <Badge
                            variant="secondary"
                            className="rounded-full px-3"
                        >
                            Syncing…
                        </Badge>
                    ) : isAuthenticated && user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-2 text-left shadow-sm transition-colors hover:bg-accent">
                                <Avatar className="size-8">
                                    <AvatarImage
                                        src={user.avatarUrl || undefined}
                                        alt={user.fullName}
                                    />
                                    <AvatarFallback>{initial}</AvatarFallback>
                                </Avatar>
                                <div className="hidden flex-col items-start sm:flex">
                                    <span className="text-sm font-medium">
                                        {user.fullName}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        @{user.username}
                                    </span>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="px-2 py-1.5">
                                    <p className="text-sm font-medium">
                                        {user.fullName}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleNavigate("/profile")}
                                >
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleNavigate("/settings")}
                                >
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleSignOut}>
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            href="/login"
                            className={cn(
                                buttonVariants({
                                    variant: "default",
                                    size: "sm",
                                }),
                                "rounded-full px-4"
                            )}
                        >
                            Sign in
                        </Link>
                    )}

                    <div className="lg:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                        size: "icon-sm",
                                    })
                                )}
                                aria-label="Open navigation menu"
                            >
                                <span className="text-lg">☰</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {navItems.map(item => (
                                    <DropdownMenuItem
                                        key={item.path}
                                        onClick={() =>
                                            handleNavigate(item.path)
                                        }
                                    >
                                        {item.label}
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                {!isLoading && !isAuthenticated && (
                                    <DropdownMenuItem
                                        onClick={() => handleNavigate("/login")}
                                    >
                                        Sign in
                                    </DropdownMenuItem>
                                )}
                                {isAuthenticated && (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            handleNavigate("/profile")
                                        }
                                    >
                                        Profile
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>
        </header>
    );
};
