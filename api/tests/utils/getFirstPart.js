const expect = require("chai").expect;

const {getFirstPart} = require('../../src/utils');

describe("getFirstPart", function() {
    it("возвращает первую директорию", async function() {
        const first = 'examples';
        const path = `${first}/test/readme.md`;
        const result = getFirstPart(path, true);
        expect(result).to.equal(first);
    });

    it("возвращает первую непустую директорию", async function() {
        const first = 'examples';
        const path = `/${first}/test/readme.md`;
        const result = getFirstPart(path, true);
        expect(result).to.equal(first);
    });

    it("пустая строка - корректная обработка", async function() {
        expect('').to.equal('');
    });
});