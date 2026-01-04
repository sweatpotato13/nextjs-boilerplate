import "@app/styles/globals.css";

import { Providers } from "@app/providers";
import { Navbar } from "@shared/ui";
import { ReactNode } from "react";

export const metadata = {
    title: "TODO TERMINAL v1.0",
    description: "A retro terminal-style todo app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" data-theme="terminal">
            <body className="font-mono min-h-screen">
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
