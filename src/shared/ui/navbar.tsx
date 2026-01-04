"use client";

import { useAuth } from "@entities/session";
import { LogoutButton } from "@features/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();
    const { user, isAuthenticated, isLoading } = useAuth();

    const isActive = (path: string) => {
        return pathname === path;
    };

    const navItems = [
        { path: "/", label: "HOME" },
        { path: "/about", label: "ABOUT" },
        { path: "/profile", label: "PROFILE" },
        { path: "/settings", label: "SETTINGS" },
    ];

    return (
        <nav className="navbar bg-base-200 border-b border-primary/30 font-mono">
            <div className="navbar-start">
                <Link
                    href="/"
                    className="btn btn-ghost text-primary text-lg normal-case"
                >
                    <span className="text-secondary">&gt;</span> TERMINAL_
                    <span className="animate-blink">|</span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-1">
                    {navItems.map(item => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`${
                                    isActive(item.path)
                                        ? "text-secondary"
                                        : "text-primary/70 hover:text-primary"
                                }`}
                            >
                                [{isActive(item.path) ? "*" : " "}
                                {item.label}]
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Desktop Auth Status */}
            <div className="navbar-end hidden lg:flex">
                {isLoading ? (
                    <span className="text-primary/50 text-sm">
                        [LOADING...]
                    </span>
                ) : isAuthenticated && user ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost text-primary normal-case"
                        >
                            <span className="text-success">&gt;</span>{" "}
                            {user.username}
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-2 z-50 p-2 border border-primary/50 bg-base-100 w-40"
                        >
                            <li>
                                <LogoutButton />
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className={`btn btn-ghost text-primary normal-case ${
                            isActive("/login") ? "text-secondary" : ""
                        }`}
                    >
                        [LOGIN]
                    </Link>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="navbar-end lg:hidden">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost text-primary"
                    >
                        [MENU]
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-2 z-50 p-2 border border-primary/50 bg-base-100 w-40"
                    >
                        {navItems.map(item => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={
                                        isActive(item.path)
                                            ? "text-secondary"
                                            : "text-primary"
                                    }
                                >
                                    {isActive(item.path) ? ">" : " "}{" "}
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        {/* Mobile Auth */}
                        <li className="border-t border-primary/30 mt-2 pt-2">
                            {isAuthenticated && user ? (
                                <>
                                    <span className="text-success text-xs mb-1">
                                        &gt; {user.username}
                                    </span>
                                    <LogoutButton />
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className={
                                        isActive("/login")
                                            ? "text-secondary"
                                            : "text-primary"
                                    }
                                >
                                    {isActive("/login") ? ">" : " "} LOGIN
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
