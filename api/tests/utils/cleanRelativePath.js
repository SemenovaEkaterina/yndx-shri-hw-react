const expect = require("chai").expect;

const {cleanRelativePath} = require('../../src/utils');

describe("cleanRelativePath", function() {
    ['./', '', '../'].map(item => {
        it(`игнорирует ${item}`, async function() {
            const result = cleanRelativePath(item);
            expect(result).to.be.undefined;
        });
    });

    it("добаляет слеш по параметру", async function() {
        const path = 'examples';
        const result = cleanRelativePath(path, true);
        expect(result).to.equal(`${path}/`);
    });

    it("не дублирует слеш по параметру", async function() {
        const path = 'examples/';
        const result = cleanRelativePath(path, true);
        expect(result).to.equal(path);
    });
});