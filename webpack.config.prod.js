var path = require('path');
var webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        front: [
            './front/index'
        ],
        admin: [
            './admin/index'
        ]
    },
    output: {
        path: path.resolve(__dirname, './static/dist'),
        filename: "[name].js",
        publicPath: '/dist/'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            })
        ],
    },
    module: {
        noParse: [/jszip.js$/],
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, './front'), path.resolve(__dirname, './admin')]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"}, {loader: "css-loader"}
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: "url-loader?limit=10000&name=fonts/[name].[ext]"
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    }
};