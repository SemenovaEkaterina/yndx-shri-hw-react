import {expect} from 'chai';

import {getRepoNameFromPath} from '../../src/utils';

describe('getRepoNameFromPath', () => {

    it('удаляет .git с конца названия', async () => {
        const name = 'linter';
        const path = `${name}.git`;
        const result = getRepoNameFromPath(path);

        expect(result).to.equal(name);
    });

    it('не удаляет .git из серидины', async () => {
        const path = `linter.gites`;
        const result = getRepoNameFromPath(path);

        expect(result).to.equal(path);
    });
});
