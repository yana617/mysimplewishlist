const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                'dark-grey': 'var(--dark-grey)',
                'light-grey': 'var(--light-grey)',
                'dark-green': 'var(--dark-green)',
                'grey-black': 'var(--grey-black)',
                blue: 'var(--blue)',
                'checkbox-green': 'var(--checkbox-green)',

                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                btn: {
                    background: 'var(--btn-background)',
                    'background-hover': 'var(--btn-background-hover)',
                },
            },
        },
        screens: {
            mobile: { max: '1023px' },
            ...defaultTheme.screens,
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    ...require('daisyui/src/theming/themes')['light'],
                    '.btn-blue': {
                        'background-color': 'var(--blue)',
                        'border-color': 'var(--blue)',
                    },
                },
                dark: {
                    ...require('daisyui/src/theming/themes')['dark'],
                    '.btn-blue': {
                        'background-color': 'var(--blue)',
                        'border-color': 'var(--blue)',
                    },
                },
            },
        ],
    },
};
