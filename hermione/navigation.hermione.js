const assert = require('assert');

const LOAD_TIMEOUT = 5000;

describe('Навигация', () => {
    it('Переходит по ссылке на файл', async function () {
        const source = await this.browser.selectSource('file');
        await this.browser.assertTitle(source);

        await this.browser.waitElement('.FileContainer-info').getText().then(text => {
            assert.equal(text, source, 'Файл появился');
        });
    });

    it('Переходит по ссылке на вложенную папку', async function () {
        const source = await this.browser.selectSource('dir');
        await this.browser.assertTitle(source);

        this.browser.assertExists('.Table', 'Таблица появилась');
    });

    // it('Работает переход с 404 на репозиторий', async function () {
    //
    // });
});