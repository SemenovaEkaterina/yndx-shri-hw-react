const {spawn} = require('child_process');
const expect = require("chai").expect;
const sinon = require("sinon");
const file = require('../../src/views/file');
const {params} = require('../../config');
const {notFound} = require('../../src/status');
const {createResponseSpy} = require('.');

const validHash = '2e4r';
const invalidHash = '';
const diffData = 'DIFF';
const name = 'linter';
const root = '/testASD/';
const path = `${root}${name}`;
const commit = '76eg';

const ctx = {
    getHash: () => validHash,
    getDirectoryName: () => 'linter',
    callGit: () => '',
    cleanRelativePath: () => '',
    rootDirPath: root,
    spawn: () => ({
        stdout: {
            pipe: () => ''
        }
    })
};

const req = {
    params: {
        [params.repositoryId]: '',
        [params.commitHash]: commit,
    }
};

describe("получение файла", function () {
    // Вызовы методов response

    it("ревизия не найдена", async function () {
        const responseSpy = createResponseSpy();
        const currentCtx = {
            ...ctx,
            getHash: () => invalidHash,
        };
        await file.bind(currentCtx)(req, responseSpy);
        expect(responseSpy.sendStatus).to.have.been.calledWith(notFound);
    });

    it("файл не найден", async function () {
        const responseSpy = createResponseSpy();
        const fileNotExistsCall = () => {
            throw {code: notFound}
        };
        const currentCtx = {
            ...ctx,
            callGit: fileNotExistsCall,
        };
        await file.bind(currentCtx)(req, responseSpy);
        expect(responseSpy.sendStatus).to.have.been.calledWith(notFound);
    });

    // Вызовы внешних зависимостей

    it("правильно вызывается метод получения хеша - getHash", async function () {
        const responseSpy = createResponseSpy();
        const getHashSpy = sinon.spy(ctx, "getHash");

        await file.bind(ctx)(req, responseSpy);
        expect(getHashSpy).to.have.been.calledWith(path, commit);
    });
});