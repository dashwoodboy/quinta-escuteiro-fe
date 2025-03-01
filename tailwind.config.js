/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef

module.exports = {
    future: {
        hoverOnlyWhenSupported: true,
    },
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {

                primary: "#0D6054",
                secondary: "#a68e81"
            },
            spacing: {
                128: "32rem",
                168: "40rem",
                216: "48rem",
            },
            fontSize: {
                "10xl": "9rem",
            },
            animation: {
                "text-reveal": "text-reveal 0.5s 0s",
                "text-hide": "text-hide 0.5s 0s",
            },
            keyframes: {
                "text-reveal": {
                    "0%": {
                        transform: "translate(100%, 0)",
                    },
                    "100%": {
                        transform: "translate(0, 0)",
                    },
                },
                "text-hide": {
                    "0%": {
                        transform: "translate(-400%, 0)",
                    },
                    "100%": {
                        transform: "translate(0%, 0)",
                    },
                },
            }
        },
    },
    plugins: [],
};
