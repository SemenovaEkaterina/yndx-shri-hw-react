const expect = require("chai").expect;
const sinon = require("sinon");
const tree = require('../../src/views/tree');
const {params} = require('../../config');
const {conflict, ok, notFound} = require('../../src/status');
const {createResponseSpy} = require('.');

const name = 'promise-polyfill';
const commit = '2f5h';
const author = 'test';
const relPath = '/examples/';
const root = '/testASD/';
const message = 'fix';
const time = '2s ago';
const file = 'index.js';

const ctx = {
    getDirectoryName: () => name,
    cleanRelativePath: () => relPath,
    getHash: () => commit,
    execFile: () => '',
    callGit: () => '',
    rootDirPath: root,
};

const req = {
    params: {
        [params.repositoryId]: name,
        [params.commitHash]: commit,
        [params.path]: relPath,
    }
};

describe("получение содержимого папки", function () {
    // Вызовы методов response

    it("некорретктно введен путь", async function () {
        const responseSpy = createResponseSpy();
        const currentCtx = {
            ...ctx,
            cleanRelativePath: () => undefined,
        };
        await tree.bind(currentCtx)(req, responseSpy);
        expect(responseSpy.sendStatus).to.have.been.calledWith(notFound);
    });

    it("хеш не найден", async function () {
        const responseSpy = createResponseSpy();
        const currentCtx = {
            ...ctx,
            getHash: () => false,
        };
        await tree.bind(currentCtx)(req, responseSpy);
        expect(responseSpy.sendStatus).to.have.been.calledWith(notFound);
    });

    it("директория пустая", async function () {
        const responseSpy = createResponseSpy();
        const currentCtx = {
            ...ctx,
            execFile: () => ({ stdout: '' }),
            callGit: () => [`${commit}|${author}`]
        };
        await tree.bind(currentCtx)(req, responseSpy);
        expect(responseSpy.sendStatus).to.have.been.calledWith(notFound);
    });

    it("отдается список", async function () {
        const responseSpy = createResponseSpy();
        const currentCtx = {
            ...ctx,
            execFile: () => ({ stdout: `${relPath}${file}|${time}|${commit}|${message}|${author}` }),
            callGit: () => [`${commit}|${author}|${time}|${message}`]
        };
        await tree.bind(currentCtx)(req, responseSpy);
        expect(responseSpy.json).to.have.been.calledWith({
            last: {author, hash: commit, message, time},
            list: [{name: file, time, commit, message, author}]
        });
    });
});