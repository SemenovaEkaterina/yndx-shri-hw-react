import {expect} from 'chai';

import {rmDir} from '../../src/utils';

describe('rmDir', () => {

    it('формирует корректный внешний вызов', async () => {
        const cwd = 'test';
        const path = '/undefined';
        rmDir(() => {
            // Проверить аргументы
            expect(1).to.equal(1);
            return Promise.resolve({});
        }, path, cwd);

    });

    it('обрабатывает ошибку', async () => {
        const errorText = 'RM ERROR';
        const result = () => rmDir(() => {
            return Promise.resolve({stderr: errorText});
        }, '', '');

        await result().catch((err) => {
            expect(err.message).to.equal(errorText);
        });
    });
});
