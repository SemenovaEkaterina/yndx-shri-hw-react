const assert = require('assert');

describe('Инициалиация', () => {
    it('Автоматический выбор репозитория при переходе на /', function () {
        return this.browser.url('/').assertExists('.Title-name', 'Репозиторий выбран');
    });

    // Удалять репу прежде, чем чекать
    it('404 на несуществующий репозиторий', function () {
        return this.browser.url('/trash').assertExists('.NotFound', 'Страница 404 показана').assertView('notFound', 'body');
    });

    it('Открывает репозиторий по ссылке', async function () {
        await this.browser.url('/linter').waitElement('.Title-name').getText().then(text => {
            assert.equal(text, 'linter');
        });
    });
});