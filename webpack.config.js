const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js",
        publicPath: "/",
    },
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
                use: ["style-loader", "css-loader", "sass-loader"]
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
            template: "./src/index.html"
        })
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
        host: '0.0.0.0',
        proxy: {
            '/api': 'http://localhost:3003'
        }
    },
    resolve: {
        alias: {
            shared: path.resolve(__dirname, 'src', 'shared'),
            src: path.resolve(__dirname, 'src'),
            scss: path.resolve(__dirname, 'src', 'shared', 'scss')
        }
    }
};