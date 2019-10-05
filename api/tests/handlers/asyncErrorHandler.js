const expect = require("chai").expect;

const {asyncErrorHandler} = require('../../src/handlers');
const {serverError} = require('../../src/status');

describe("asyncErrorHandler", function () {

    it("посылает 500 в случае возникновения асинхронной ошибки", async function () {
        const errorView = () => Promise.reject('');

        const status = await new Promise((resolve, _) => {
            asyncErrorHandler(errorView)('', {sendStatus: status => resolve(status)});
        });
        expect(status).to.equal(serverError);
    });
});