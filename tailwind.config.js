/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                accent: "var(--hub-accent)",
                "accent-strong": "var(--hub-accent-strong)",
            },
            fontFamily: {
                display: ["var(--font-display)"],
                sans: ["var(--font-base)"],
                hand: ["var(--font-hand)", "cursive"],
            }
        },
    },
    plugins: [],
}
