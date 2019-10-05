const expect = require("chai").expect;

const {getRepoNameFromPath} = require('../../src/utils');

describe("getRepoNameFromPath", function() {

    it("удаляет .git с конца названия", async function() {
        const name = 'linter';
        const path = `${name}.git`;
        const result = getRepoNameFromPath(path);

        expect(result).to.equal(name);
    });

    it("не удаляет .git из серидины", async function() {
        const path = `linter.gites`;
        const result = getRepoNameFromPath(path);

        expect(result).to.equal(path);
    });
});