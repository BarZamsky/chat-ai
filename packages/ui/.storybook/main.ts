import tailwindcss from 'tailwindcss'
import { mergeConfig, UserConfig } from 'vite'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindConfig from '../tailwind.config'

const viteFinal = async (config: UserConfig) => {
    return mergeConfig(config, {
        css: {
            postcss: {
                plugins: [tailwindcss()],
            },
        },
        plugins: [
            tsConfigPaths({
                root: '../../../',
            }),
            svgr({
                svgrOptions: {
                    ref: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        removeUselessStrokeAndFill: false,
                                        removeViewBox: false,
                                    },
                                },
                            },
                        ],
                    },
                },
            }),
            checker({
                typescript: {
                    root: 'libs/ui',
                    tsconfigPath: 'tsconfig.lib.json',
                    buildMode: true,
                },
            }),
        ],
    })
}

const config = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: ['@storybook/addon-essentials', '@nx/react/plugins/storybook', 'storybook-addon-react-router-v6'],
    viteFinal,
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
}

module.exports = config
