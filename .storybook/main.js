const forioConfig = require('../webpack.config');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/preset-scss',
    ],

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },

    core: {
        disableTelemetry: true
    },

    webpackFinal: (config) => ({
        ...config,
        module: {
            ...config.module,
            rules: forioConfig.module.rules,
        },
        resolve: {
            ...config.resolve,
            alias: forioConfig.resolve.alias,
        },
    }),

    docs: {
        autodocs: true
    }
};
