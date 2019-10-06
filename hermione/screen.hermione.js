const assert = require('assert');

describe('Отображение', () => {
    it('Список файлов', function () {
        return this.browser.url('/').assertView('files', 'body');
    });
});