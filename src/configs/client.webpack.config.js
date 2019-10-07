const defaultConfig = require('./common.webpack.config');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge');
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(defaultConfig, {
    entry: {
        main: './src/client/index.js',
    },
    output: {
        path: path.join(__dirname, "../../dist"),
        filename: "main.js",
        publicPath: "/",
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    "css-loader", "sass-loader"
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'url-loader',
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/index.html"
        }),
        new WebpackAssetsManifest({
            output: path.join(__dirname, "../../dist", 'manifest.json'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "async",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    devServer: {
        historyApiFallback: {
            disableDotRule: true
        },
        proxy: {
            '/api': 'http://localhost:3003'
        }
    },
});