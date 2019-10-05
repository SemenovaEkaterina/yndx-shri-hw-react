const expect = require("chai").expect;

const {rmDir} = require('../../src/utils');

describe("rmDir", function() {

    it("формирует корректный внешний вызов", async function() {
        const cwd = 'test';
        const path = '/undefined';
        const result = rmDir((...args) => {
            // Проверить аргументы
            expect(1).to.equal(1);
            return {};
        }, path, cwd);


    });

    it("обрабатывает ошибку", async function() {
        const errorText = 'RM ERROR';
        const result = () => rmDir(() => {
            return {stderr: errorText}
        }, '', '');

        await result().catch(err => {
            expect(err.message).to.equal(errorText);
        });
    });
});