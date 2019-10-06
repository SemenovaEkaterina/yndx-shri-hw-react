module.exports = {
    baseUrl: 'http://localhost:8080',
    gridUrl: 'http://localhost:4444/wd/hub',

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: "chrome"
            }
        }
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-reporter'
        },
        'hermione-custom-commands': true
    }
};