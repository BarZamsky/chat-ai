import type { StorybookConfig } from '@storybook/react-vite'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/postcss'
import { mergeConfig, UserConfig } from 'vite'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const viteFinal = async (config: UserConfig) => {
    return mergeConfig(config, {
        css: {
            postcss: {
                plugins: [
                    tailwindcss({
                        base: path.resolve('../'),
                    }),
                ],
            },
        },
    })
}

const config: StorybookConfig = {
    stories: [
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    viteFinal,
    addons: [
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-vitest'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-docs'),
    ],
    framework: getAbsolutePath('@storybook/react-vite'),
}
export default config
