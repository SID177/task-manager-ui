/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{html,jsx}"],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ["light"],
        styled: true,
        utils: true,
    },
}
