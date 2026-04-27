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
            animation: {
                "fade-in": "fadeIn 0.3s ease-out",
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: "0", transform: "translateY(-5px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
};
