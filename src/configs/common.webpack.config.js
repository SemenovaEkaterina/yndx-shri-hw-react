const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'awesome-typescript-loader',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        alias: {
            shared: path.resolve(__dirname, '../../src', 'shared'),
            src: path.resolve(__dirname, '../../src'),
            scss: path.resolve(__dirname, '../../src', 'shared', 'scss'),
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
};
