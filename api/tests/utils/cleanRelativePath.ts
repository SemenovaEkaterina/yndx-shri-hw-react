import {expect} from 'chai';
import {cleanRelativePath} from '../../src/utils';

describe('cleanRelativePath', () => {
    ['./', '', '../'].map((item) => {
        it(`игнорирует ${item}`, async () => {
            const result = cleanRelativePath(item);
            expect(result).to.equal('');
        });
    });

    it('добаляет слеш по параметру', async () => {
        const path = 'examples';
        const result = cleanRelativePath(path, true);
        expect(result).to.equal(`${path}/`);
    });

    it('не дублирует слеш по параметру', async () => {
        const path = 'examples/';
        const result = cleanRelativePath(path, true);
        expect(result).to.equal(path);
    });
});
