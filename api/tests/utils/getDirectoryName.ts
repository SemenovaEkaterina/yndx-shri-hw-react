import {expect} from 'chai';
import {getDirectoryName} from '../../src/utils';

describe('getDirectoryName', () => {

    it('добавляет .git в конце', async () => {
        const name = 'linter';
        const path = `${name}.git`;
        const result = getDirectoryName(name);

        expect(result).to.equal(path);
    });
});
