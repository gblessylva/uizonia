import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                moving_object: {
                    '0%': {
                        transform: 'translateY(0)'
                    },

                    '50%': {
                        transform: 'translateY(-30px)'
                    },

                    '100%': {
                        transform: 'translateY(0)'
                    }
                },

                moving_position_animation: {
                    '0%': {
                        transform: 'translateY(0)'
                    },

                    ' 50%': {
                        transform: 'translateY(-30px)'
                    },

                    '100%': {
                        transform: 'translateY(0)'
                    }
                },
                my_move: {
                    '50%': {
                        transform: 'rotate(180deg)'
                    },

                }

            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
                moving_object: 'moving_object 6s linear infinite',
                moving_position_animation: 'moving_position_animation 6s linear infinite',
                my_move: 'my_move 5s  infinite',

            }
        },
    },

    plugins: [
        forms, 
        require('taos/plugin')
    ],
    safelist: [
        '!duration-[0ms]',
        '!delay-[0ms]',
        'html.js :where([class*="taos:"]:not(.taos-init))'
      ]
};
