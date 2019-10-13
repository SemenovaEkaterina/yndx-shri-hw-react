import {expect} from 'chai';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import repos from '../../src/views/repos';

const entityFactory = (name: string, isDir: boolean) => (
    {
        name,
        isDirectory: () => isDir,
    }
);

const root = '/testASD/';

const ctx = {
    readdir: () => [],
    rootDirPath: root,
    getRepoNameFromPath: (item: string) => item,
};

const next = () => '';

describe('получение списка директорий', () => {

    // Вызовы методов response

    it('отдает директории', async () => {
        const directory = entityFactory('linter', true);
        const req = mockReq({});
        const res = mockRes();

        const currentCtx = {
            ...ctx,
            readdir: () => [directory],
        };
        await repos.bind(currentCtx)(req, res, next);
        expect(res.json).to.have.been.calledWith({repos: [directory.name]});
    });

    it('не отдает файлы', async () => {
        const file = entityFactory('index.js', false);
        const req = mockReq({});
        const res = mockRes();

        const currentCtx = {
            ...ctx,
            readdir: () => [file],
        };
        await repos.bind(currentCtx)(req, res, next);
        expect(res.json).to.have.been.calledWith({repos: []});
    });

    // Вызовы внешних зависимостей

    it('правильно вызывается метод получения списка папок - readdir', async () => {
        const req = mockReq({});
        const res = mockRes();

        const readDirSpy = sinon.spy(ctx, 'readdir');

        await repos.bind(ctx)(req, res, next);
        expect(readDirSpy).to.have.been.calledWith(root);
    });
});
