import {expect} from 'chai';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import {params} from '../../config.json';
import {ok} from '../../src/status.json';
import remove from '../../src/views/remove';

const name = 'promise-polyfill';
const root = '/testASD/';

const ctx = {
    getDirectoryName: () => '',
    rmDir: () => '',
    rootDirPath: root,
};

const reqContent = {
    params: {
        [params.repositoryId]: name,
    },
};
const next = () => '';

describe('добавление репозитория', () => {
    // Вызовы методов response

    it('удаление репозитория', async () => {
        const req = mockReq(reqContent);
        const res = mockRes();

        await remove.bind(ctx)(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(ok);
    });

    // Вызовы внешних зависимостей

    it('правильно вызывается метод получения имени директории - getDirectoryName', async () => {
        const req = mockReq(reqContent);
        const res = mockRes();

        const getDirectoryNameSpy = sinon.spy(ctx, 'getDirectoryName');

        await remove.bind(ctx)(req, res, next);
        expect(getDirectoryNameSpy).to.have.been.calledWith(name);
    });
});
