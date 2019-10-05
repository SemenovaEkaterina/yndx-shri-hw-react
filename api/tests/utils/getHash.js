const expect = require("chai").expect;

const {getHash} = require('../../src/utils');

describe("getHash", function() {

    it("невалидный хеш коммита", async function() {
        const invalidHash = '../.';
        const result = await getHash.bind({callGit: () => []})('', invalidHash);

        expect(result).to.be.undefined;
    });
});