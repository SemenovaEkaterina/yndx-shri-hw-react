import {expect} from 'chai';

import {removePrefix} from '../../src/utils';

describe('removePrefix', () => {

    it('удаляет префикc у строки', () => {
        const prefix = '/var/';
        const path = 'log';
        const fullStr = `${prefix}${path}`;

        const result = removePrefix(fullStr, prefix);

        expect(result).to.equal(path);
    });

    it('не удаляет из середины', () => {
        const fakePrefix = '/log';
        const fullStr = `/var${fakePrefix}/install.log`;
        const result = removePrefix(fullStr, fakePrefix);

        expect(result).to.equal(fullStr);
    });

});
