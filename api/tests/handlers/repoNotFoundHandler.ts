import {expect} from 'chai';
import { PathLike } from 'fs';
import { mockReq, mockRes } from 'sinon-express-mock';
import {params} from '../../config.json';
import {repoNotFoundHandler} from '../../src/handlers';
import {notFound} from '../../src/status.json';

const ctx = {
    checkExisting: (_: PathLike) => Promise.resolve(false),
    getDirectoryName: (_: string) => '',
    rootDirPath: '/',
};

describe('repoNotFoundHandler',  () => {
    it('вовзращает 404 на несущеуствующий репозиторий', async () => {
        const req = mockReq({params: {[params.repositoryId]: 'test'}});
        const res = mockRes();
        const next = () => '';

        await repoNotFoundHandler.bind(ctx)(() => '')(req, res, next);
        expect(res.sendStatus).to.have.been.calledWith(notFound);
    });
});
