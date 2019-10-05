const expect = require("chai").expect;

const {getDirectoryName} = require('../../src/utils');

describe("getDirectoryName", function() {

    it("добавляет .git в конце", async function() {
        const name = 'linter';
        const path = `${name}.git`;
        const result = getDirectoryName(name);

        expect(result).to.equal(path);
    });
});