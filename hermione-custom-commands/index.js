const assert = require('assert');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const LOAD_TIMEOUT = 5000;

module.exports = (hermione, opts) => {
    hermione.on(hermione.events.SESSION_START, async () => {
        // Инициализация репозиториев для проверки

        const addRepo = (url) => {
            const params = new URLSearchParams();
            params.append('url', url);
            // Конфиг
            fetch('http://localhost:3003/api/repos/', {method: 'post', body: params});
        };
        // Конфиг
        addRepo('https://github.com/SemenovaEkaterina/linter');
        addRepo('https://github.com/SemenovaEkaterina/promise-polyfill');
    });
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