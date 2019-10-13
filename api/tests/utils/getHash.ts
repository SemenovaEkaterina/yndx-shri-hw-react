import {expect} from 'chai';

import {getHash} from '../../src/utils';

describe('getHash', () => {

    it('невалидный хеш коммита', async () => {
        const invalidHash = '../.';
        const result = await getHash.bind({callGit: () => []})('', invalidHash);

        expect(result).to.equal(null);
    });
});
