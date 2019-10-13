import {expect} from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import {params} from '../../config.json';
import {notFound} from '../../src/status.json';
import tree from '../../src/views/tree';

const name = 'promise-polyfill';
const commit = '2f5h';
const author = 'test';
const relPath = '/examples/';
const root = '/testASD/';

const next = () => '';

const ctx = {
    getDirectoryName: () => name,
    cleanRelativePath: () => relPath,
    getHash: () => commit,
    execFile: () => '',
    callGit: () => '',
    rootDirPath: root,
};

const reqContent = {
    params: {
        [params.repositoryId]: name,
        [params.commitHash]: commit,
        [params.path]: relPath,
    },
};

describe('получение содержимого папки', () => {
    // Вызовы методов response

    it('некорретктно введен путь', async () => {
        const req = mockReq(reqContent);
        const res = mockRes();

        const currentCtx = {
            ...ctx,
            cleanRelativePath: () => undefined,
        };
        await tree.bind(currentCtx)(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(notFound);
    });

    it('хеш не найден', async () => {
        const req = mockReq(reqContent);
        const res = mockRes();

        const currentCtx = {
            ...ctx,
            getHash: () => false,
        };
        await tree.bind(currentCtx)(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(notFound);
    });

    it('директория пустая', async () => {
        const req = mockReq(reqContent);
        const res = mockRes();

        const currentCtx = {
            ...ctx,
            execFile: () => ({ stdout: '' }),
            callGit: () => [`${commit}|${author}`],
        };
        await tree.bind(currentCtx)(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(notFound);
    });
});
