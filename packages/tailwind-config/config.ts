import type { Config } from 'tailwindcss'

export const tailwindConfig = {
    theme: {
        screens: {
            fhd: '1921px',
            '2xl': '1536px',
            xl: '1280px',
            lg: '1024px',
            md: '768px',
            sm: '640px',
        },

        // borderRadius: BORDER_RADIUS,

        backgroundColor: (theme: any) => ({
            ...theme('colors'),
            // ...BACKGROUND_COLORS,
        }),

        // fontWeight: FONT_WEIGHTS,

        extend: {
            keyframes: {
                appear: {
                    '0%': { opacity: '0%' },
                    '100%': { opacity: '100%' },
                },
            },
            animation: {
                appear: 'appear 2s linear infinite',
            },
            cursor: {
                auto: 'auto',
                default: 'default',
                pointer: 'pointer',
                'ns-resize': 'ns-resize',
            },
            boxShadow: {
                card: '0px 1px 2px 0px rgba(0, 0, 0, 0.08)',
            },
            // colors: {
            //     ...COLORS,
            //     severity: { ...SEVERITY_COLORS, ...COLORS.severity },
            // },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
        },

        // fontSize: {
        //     ...FONT_SIZES,
        //     ...fontSizesV2,
        // },
    },
} satisfies Partial<Config>
