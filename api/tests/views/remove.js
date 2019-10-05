const expect = require("chai").expect;
const sinon = require("sinon");
const remove = require('../../src/views/remove');
const {params} = require('../../config');
const {ok} = require('../../src/status');
const {createResponseSpy} = require('.');

const name = 'promise-polyfill';
const root = '/testASD/';

const ctx = {
    getDirectoryName: () => '',
    rmDir: () => '',
    rootDirPath: root,
};

const req = {
    params: {
        [params.repositoryId]: name,
    }
};

describe("добавление репозитория", function () {
    // Вызовы методов response

    it("удаление репозитория", async function () {
        const responseSpy = createResponseSpy();
        await remove.bind(ctx)(req, responseSpy);
        expect(responseSpy.sendStatus).to.have.been.calledWith(ok);
    });

    // Вызовы внешних зависимостей

    it("правильно вызывается метод получения имени директории - getDirectoryName", async function () {
        const responseSpy = createResponseSpy();
        const getDirectoryNameSpy = sinon.spy(ctx, "getDirectoryName");

        await remove.bind(ctx)(req, responseSpy);
        expect(getDirectoryNameSpy).to.have.been.calledWith(name);
    });
});