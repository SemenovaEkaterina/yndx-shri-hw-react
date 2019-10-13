import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import {body} from '../../config.json';
import {conflict, notFound, ok} from '../../src/status.json';
import create from '../../src/views/create';
const expect = chai.expect;
chai.use(sinonChai);

const name = 'promise-polyfill';
const url = `https://github.com/SemenovaEkaterina/${name}`;
const root = '/testASD/';

const ctx = {
    getDirectoryName: () => name,
    checkExisting: () => '',
    createUtil: () => '',
    rootDirPath: root,
};

const reqContent = {body: {[body.url]: url}};

describe('добавление репозитория', () => {
    // Вызовы методов response

    it('добавление уже существующего репозитория - конфликт', async () => {
        const currentCtx = {
            ...ctx,
            checkExisting: () => true,
        };
        const req = mockReq(reqContent);
        const res = mockRes();
        const next = () => '';

        await create.bind(currentCtx)(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(conflict);
    });

    it('репозиторий по урлу не найден', async () => {
        const createWithError = () => {
            throw {code: notFound};
        };
        const currentCtx = {
            ...ctx,
            createUtil: createWithError,
        };

        const req = mockReq(reqContent);
        const res = mockRes();
        const next = () => '';

        await create.bind(currentCtx)(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(notFound);
    });

    it('добавление нового репозитория', async () => {
        const req = mockReq(reqContent);
        const res = mockRes();
        const next = () => '';

        await create.bind(ctx)(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(ok);
    });

    // Вызовы внешних зависимостей

    it('правильно вызывается метод получения имени директории - getDirectoryName', async () => {
        const req = mockReq(reqContent);
        const res = mockRes();
        const next = () => '';

        const getDirectoryNameSpy = sinon.spy(ctx, 'getDirectoryName');

        await create.bind(ctx)(req, res, next);
        expect(getDirectoryNameSpy).to.have.been.calledWith(name);
    });

    it('правильно вызывается метод проверки наличия директории - checkExisting', async () => {
        const path = `${ctx.rootDirPath}${name}`;
        const checkExistingSpy = sinon.spy(ctx, 'checkExisting');

        const req = mockReq(reqContent);
        const res = mockRes();
        const next = () => '';

        await create.bind(ctx)(req, res, next);
        expect(checkExistingSpy).to.have.been.calledWith(path);
    });
});
