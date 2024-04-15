'use strict';
const webpack = require('webpack');
const path = require('path');
const rules = require('./webpack.rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const HOST = process.env.HOST || 'local.forio.com';
const PORT = process.env.PORT || '8888';

rules.push({
    test: /\.css$/,
    exclude: /[\/\\]src[\/\\]/,
    use: [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
        },
    ],
});

rules.push({
    test: /\.scss$/,
    exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
    use: [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                importLoaders: 1,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
            },
        },
        {
            loader: 'resolve-url-loader',
        },
        {
            loader: 'sass-loader',
        },
    ],
});

module.exports = {
    mode: 'development',
    entry: ['./src/index.jsx'],
    devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: `http://${HOST}:${PORT}/`,
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'src', 'actions'),
            components: path.resolve(__dirname, 'src', 'components'),
            hooks: path.resolve(__dirname, 'src', 'hooks'),
            static: path.resolve(__dirname, 'src', 'static'),
            css: path.resolve(__dirname, 'src', 'static', 'css'),
            selectors: path.resolve(__dirname, 'src', 'selectors'),
            reducers: path.resolve(__dirname, 'src', 'reducers'),
            utils: path.resolve(__dirname, 'src', 'utils'),
            img: path.resolve(__dirname, 'src', 'static', 'img'),
        },
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules,
    },
    devServer: {
        static: {
            directory: './public',
        },
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST,
        headers: { 'Access-Control-Allow-Origin': '*' },
        allowedHosts: 'all',
        proxy: {
            '/': 'http://local.forio.com:9999',
        },
    },
    plugins: [
        new ReactRefreshPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template.html',
        }),
    ],
};
