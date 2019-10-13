const defaultConfig = require('./common.webpack.config');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(defaultConfig, {
    entry: {
        main: './src/server/index.tsx',
    },
    mode: 'development',
    target: 'node',
    output: {
        path: path.join(__dirname, '../../dist'),
        filename: 'server.js',
        publicPath: '/',
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['null-loader'],
            },
        ],
    },
});
