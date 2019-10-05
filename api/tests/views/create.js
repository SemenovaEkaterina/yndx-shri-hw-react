const expect = require("chai").expect;
const sinon = require("sinon");
const create = require('../../src/views/create');
const {body} = require('../../config');
const {conflict, ok, notFound} = require('../../src/status');
const {createResponseSpy} = require('.');

const name = 'promise-polyfill';
const url = `https://github.com/SemenovaEkaterina/${name}`;
const root = '/testASD/';

const ctx = {
    getDirectoryName: () => name,
    checkExisting: () => '',
    createUtil: () => '',
    rootDirPath: root,
};

const req = {
    body: {
        [body.url]: url,
    }
};

describe("добавление репозитория", function () {
    // Вызовы методов response

    it("добавление уже существующего репозитория - конфликт", async function () {
        const responseSpy = createResponseSpy();
        const currentCtx = {
            ...ctx,
            checkExisting: () => true,
        };
        await create.bind(currentCtx)(req, responseSpy);
        expect(responseSpy.sendStatus).to.have.been.calledWith(conflict);
    });

    it("репозиторий по урлу не найден", async function () {
        const responseSpy = createResponseSpy();
        const createWithError = () => {
            throw {code: notFound}
        };
        const currentCtx = {
            ...ctx,
            createUtil: createWithError,
        };

        await create.bind(currentCtx)(req, responseSpy);
        expect(responseSpy.sendStatus).to.have.been.calledWith(notFound);
    });

    it("добавление нового репозитория", async function () {
        const responseSpy = createResponseSpy();
        await create.bind(ctx)(req, responseSpy);
        expect(responseSpy.sendStatus).to.have.been.calledWith(ok);
    });

    // Вызовы внешних зависимостей

    it("правильно вызывается метод получения имени директории - getDirectoryName", async function () {
        const responseSpy = createResponseSpy();
        const getDirectoryNameSpy = sinon.spy(ctx, "getDirectoryName");

        await create.bind(ctx)(req, responseSpy);
        expect(getDirectoryNameSpy).to.have.been.calledWith(name);
    });

    it("правильно вызывается метод проверки наличия директории - checkExisting", async function () {
        const path = `${ctx.rootDirPath}${name}`;

        const responseSpy = createResponseSpy();
        const checkExistingSpy = sinon.spy(ctx, "checkExisting");

        await create.bind(ctx)({
            body: {
                [body.url]: url,
            }
        }, responseSpy);
        expect(checkExistingSpy).to.have.been.calledWith(path);
    });
});