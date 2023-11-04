import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ["ko", "en"],
    localePrefix: "always",
    defaultLocale: "ko",
});

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
