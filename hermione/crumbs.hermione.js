const assert = require('assert');

describe('Хлебные крошки', () => {
    it('При переходе на ресурс появляется крошка', async function () {
        const source = await this.browser.selectSource('dir');

        this.browser.assertExists(`.Crumbs-item=${source}`, 'Крошка появилась');
    });

    it('Крошка текущего ресурса не обновляет страницу', async function () {
        // const source = await this.browser.selectSource('dir');
        //
        // this.browser.assertExists(`.Crumbs-item=${source}`, 'Крошка появилась');
    });

    it('При переходе по крошке открывается содержимое', async function () {
        await this.browser.selectSource('dir');

        const selector = '.Crumbs-item';
        const name = await this.browser.waitElement(selector).getText();
        await this.browser.waitElement(selector).click();

        await this.browser.assertTitle(name);
    });
});