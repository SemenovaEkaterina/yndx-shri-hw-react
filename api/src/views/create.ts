import { RequestHandler } from 'express';
import path from 'path';
import config from '../../config.json';
import status from '../status.json';
import {
    checkExisting, CheckExistingI,
    createUtil, CreateUtilI,
    getDirectoryName,
    GetDirectoryNameI,
} from '../utils';

const {body} = config;

// Точки расширения для тестов
interface ExtensionPoints {
    getDirectoryName: GetDirectoryNameI;
    checkExisting: CheckExistingI;
    createUtil: CreateUtilI;
    rootDirPath: string;
}

const create: RequestHandler = async function(this: ExtensionPoints | void, req, res) {
    // Точки расширения для тестов
    const _getDirectoryName = this && this.getDirectoryName || getDirectoryName;
    const _checkExisting = this && this.checkExisting || checkExisting;
    const _createUtil = this && this.createUtil || createUtil;
    const _rootDirPath = this && this.rootDirPath || req.app.get('rootDirPath');

    const {
        [body.url]: url = '',
    } = req.body;

    const repoName = url.replace(config.githubUrl, '').split('/')[1];
    const repoPath = path.join(_rootDirPath, _getDirectoryName(repoName));

    if (await _checkExisting(repoPath)) {
        return res.sendStatus(status.conflict);
    }

    try {
        await _createUtil(url, _rootDirPath);
    } catch (e) {
        if (e.code === status.notFound) {
            return res.sendStatus(status.notFound);
        }
        throw e;
    }

    return res.sendStatus(status.ok);
};

export default create;
