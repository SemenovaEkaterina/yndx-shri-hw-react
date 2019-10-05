const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const {createResponseSpy} = require('.');

const repos = require('../../src/views/repos');

const entityFactory = (name, isDir) => (
    {
        name,
        isDirectory: () => isDir,
    }
);

const root = '/testASD/';

const ctx = {
    readdir: () => [],
    rootDirPath: root,
    getRepoNameFromPath: (item) => item,
};

describe("получение списка директорий", function () {

    // Вызовы методов response

    it("отдает директории", async function () {
        const directory = entityFactory('linter', true);
        const responseSpy = createResponseSpy();

        const currentCtx = {
            ...ctx,
            readdir: () => [directory]
        };
        await repos.bind(currentCtx)('', responseSpy);
        expect(responseSpy.json).to.have.been.calledWith({repos: [directory.name]});
    });

    it("не отдает файлы", async function () {
        const file = entityFactory('index.js', false);
        const responseSpy = createResponseSpy();

        const currentCtx = {
            ...ctx,
            readdir: () => [file]
        };
        await repos.bind(currentCtx)('', responseSpy);
        expect(responseSpy.json).to.have.been.calledWith({repos: []});
    });

    // Вызовы внешних зависимостей

    it("правильно вызывается метод получения списка папок - readdir", async function () {
        const responseSpy = createResponseSpy();
        const readDirSpy = sinon.spy(ctx, "readdir");

        await repos.bind(ctx)('', responseSpy);
        // expect(readDirSpy).to.have.been.calledWith(root);
    });
});