/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ["JetBrains Mono", "monospace"],
            },
            animation: {
                blink: "blink 1s step-end infinite",
                "fade-in": "fadeIn 0.3s ease-out",
            },
            keyframes: {
                blink: {
                    "0%, 50%": { opacity: "1" },
                    "51%, 100%": { opacity: "0" },
                },
                fadeIn: {
                    from: { opacity: "0", transform: "translateY(-5px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                terminal: {
                    primary: "#00ff41",
                    secondary: "#ffb000",
                    accent: "#00d9ff",
                    neutral: "#1a1a1a",
                    "base-100": "#0a0a0a",
                    "base-200": "#0f0f0f",
                    "base-300": "#1a1a1a",
                    "base-content": "#00ff41",
                    info: "#00d9ff",
                    success: "#00ff41",
                    warning: "#ffb000",
                    error: "#ff0040",
                },
            },
        ],
    },
};
