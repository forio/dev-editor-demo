module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public)/,
        loader: 'babel-loader',
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'file-loader',
    },
    {
        test: /\.(ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        type: 'asset/resource',
    },
    {
        test: /\.(jpg|png|svg|gif)$/,
        exclude: /(node_modules|bower_components)/,
        type: 'asset/resource',
    },
    {
        test: /\.(xlsx|csv|pdf|pptx)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'assets/img/[name].[ext]',
                },
            },
        ],
    },
];
