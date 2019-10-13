import {expect} from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import {params} from '../../config.json';
import {notFound} from '../../src/status.json';
import file from '../../src/views/file';

const validHash = '2e4r';
const invalidHash = '';
const root = '/testASD/';
const commit = '76eg';

const ctx = {
    getHash: () => validHash,
    getDirectoryName: () => 'linter',
    callGit: () => '',
    cleanRelativePath: () => '',
    rootDirPath: root,
    spawn: () => ({
        stdout: {
            pipe: () => '',
        },
    }),
};

const reqContent = {
    params: {
        [params.repositoryId]: '',
        [params.commitHash]: commit,
    },
};
const next = () => '';

describe('получение файла', () => {
    // Вызовы методов response

    it('ревизия не найдена', async () => {
        const req = mockReq(reqContent);
        const res = mockRes();

        const currentCtx = {
            ...ctx,
            getHash: () => invalidHash,
        };
        await file.bind(currentCtx)(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(notFound);
    });

    it('файл не найден', async () => {
        const req = mockReq(reqContent);
        const res = mockRes();

        const fileNotExistsCall = () => {
            throw {code: notFound};
        };
        const currentCtx = {
            ...ctx,
            callGit: fileNotExistsCall,
        };
        await file.bind(currentCtx)(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(notFound);
    });
});
