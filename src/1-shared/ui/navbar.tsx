"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="navbar-start">
                <div className="flex-1">
                    <Link
                        href="/"
                        className="btn btn-ghost text-xl text-primary font-bold"
                    >
                        FSD App
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link
                            href="/"
                            className={
                                isActive("/")
                                    ? "active font-medium"
                                    : "font-medium"
                            }
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={
                                isActive("/about")
                                    ? "active font-medium"
                                    : "font-medium"
                            }
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/profile"
                            className={
                                isActive("/profile")
                                    ? "active font-medium"
                                    : "font-medium"
                            }
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/settings"
                            className={
                                isActive("/settings")
                                    ? "active font-medium"
                                    : "font-medium"
                            }
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end lg:hidden">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link href="/settings">Settings</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
