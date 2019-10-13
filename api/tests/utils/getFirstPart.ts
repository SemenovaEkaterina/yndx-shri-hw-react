import {expect} from 'chai';

import {getFirstPart} from '../../src/utils';

describe('getFirstPart', () => {
    it('возвращает первую директорию', async () => {
        const first = 'examples';
        const path = `${first}/test/readme.md`;
        const result = getFirstPart(path);
        expect(result).to.equal(first);
    });

    it('возвращает первую непустую директорию', async () => {
        const first = 'examples';
        const path = `/${first}/test/readme.md`;
        const result = getFirstPart(path);
        expect(result).to.equal(first);
    });

    it('пустая строка - корректная обработка', async () => {
        expect('').to.equal('');
    });
});
