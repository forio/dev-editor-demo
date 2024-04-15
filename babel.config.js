module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV);

    return {
        presets: [
            ['@babel/preset-env', { targets: 'defaults' }],
            ['@babel/preset-react', { runtime: 'automatic' }],
        ],
        plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-transform-class-properties',
            '@babel/plugin-transform-numeric-separator',
            '@babel/plugin-transform-optional-chaining',
            '@babel/plugin-transform-nullish-coalescing-operator',
            !api.env('production') && 'react-refresh/babel',
        ].filter(Boolean),
    };
};
