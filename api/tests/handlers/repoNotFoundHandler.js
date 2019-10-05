const expect = require("chai").expect;

const {repoNotFoundHandler} = require('../../src/handlers');
const {notFound} = require('../../src/status');
const {params} = require('../../config');

const ctx = {
    checkExisting: () => false,
    callGetDirectoryName: item => item,
    rootDirPath: '/',
};

describe("repoNotFoundHandler", function () {
    it("вовзращает 404 на несущеуствующий репозиторий", async function () {
        await repoNotFoundHandler.bind(ctx)(() => {})({ params: {[params.repositoryId]: 'test'} }, {sendStatus: status => expect(status).to.equal(notFound)});
    });
});