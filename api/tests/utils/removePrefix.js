const expect = require("chai").expect;

const {removePrefix} = require('../../src/utils');

// Секции названы по именам утилит

describe("removePrefix", function() {

    it("удаляет префикc у строки", function() {
        const prefix = '/var/';
        const path = 'log';
        const fullStr = `${prefix}${path}`;

        const result = removePrefix(fullStr, prefix);

        expect(result).to.equal(path);
    });

    it("не удаляет из середины", function() {
        const fakePrefix = '/log';
        const fullStr = `/var${fakePrefix}/install.log`;
        const result = removePrefix(fullStr, fakePrefix);

        expect(result).to.equal(fullStr);
    });

});