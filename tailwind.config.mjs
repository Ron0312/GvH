import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'brand-moss': '#4A5D23',
                'brand-slate': '#2F353B',
                'brand-sand': '#D2B48C',
                'brand-earth': '#A0522D',
                'brand-dark': '#1A1A1A',
                'brand-light': '#FDFCFB',
                'cloud-dancer': '#F0EEE9',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
} satisfies Config;
