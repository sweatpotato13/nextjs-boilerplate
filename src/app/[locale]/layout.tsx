import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { UserNav } from "@/components/user-nav";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ModeNav } from "@/components/mode-nav";
import { NextIntlClientProvider } from "next-intl";

const locales = ["ko", "en"];

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Validate that the incoming `locale` parameter is valid
    const isValidLocale = locales.some(cur => cur === locale);
    if (!isValidLocale) notFound();

    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="flex h-16 items-center mx-2">
                            <UserNav />
                            <div className="ml-auto flex items-center space-x-4">
                                <ModeNav />
                            </div>
                        </div>
                        <nav></nav>
                        {children}
                    </ThemeProvider>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
