const assert = require('assert');

const LOAD_TIMEOUT = 5000;

module.exports = (hermione, opts) => {
    hermione.on(hermione.events.NEW_BROWSER, (browser) => {
        browser.addCommand('waitElement', (selector) => {
            return browser.waitForExist(selector, LOAD_TIMEOUT).$(selector);
        });
        browser.addCommand('getCurrentSource', async () => {
            let url = await browser.getUrl();
            return url.split('/').slice(-1);
        });
        browser.addCommand('selectSource', async (type) => {
            const selector = `.Source-icon_type_${type} ~ .Source-text`;
            await browser.url('/linter').waitElement(selector).click();
            return await browser.getCurrentSource();
        });
        browser.addCommand('assertTitle', async (name) => {
            return browser.waitElement('.Title-name').getText().then(text => {
                assert.equal(text, name, 'Название совпало');
            });
        });
        browser.addCommand('assertExists', async (selector, msg) => {
            return browser.waitForExist(selector, LOAD_TIMEOUT).isExisting(selector).then(exists => {
                assert.ok(exists, msg);
            });
        });
    });
};