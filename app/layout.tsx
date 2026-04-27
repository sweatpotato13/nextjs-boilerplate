import "@app/styles/globals.css";

import { Providers } from "@app/providers";
import { Navbar } from "@shared/ui";
import { Geist } from "next/font/google";
import { ReactNode } from "react";

import { cn } from "@shared/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
    title: {
        default: "Next.js Boilerplate",
        template: "%s · Next.js Boilerplate",
    },
    description: "A modern Next.js boilerplate with shadcn/ui components.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className={cn(geist.variable, "scroll-smooth")}
            suppressHydrationWarning
        >
            <body className="min-h-screen bg-background font-sans text-foreground antialiased">
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
