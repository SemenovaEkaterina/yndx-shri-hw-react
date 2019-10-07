const path = require("path");

module.exports = {
    resolve: {
        alias: {
            shared: path.resolve(__dirname, '../../src', 'shared'),
            src: path.resolve(__dirname, '../../src'),
            scss: path.resolve(__dirname, '../../src', 'shared', 'scss')
        }
    },
};