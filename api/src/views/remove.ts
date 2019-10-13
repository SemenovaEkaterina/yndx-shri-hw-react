import child_process from 'child_process';
import {RequestHandler} from 'express';
import util from 'util';
import {params} from '../../config.json';
import {ok} from '../status.json';
import { getDirectoryName, GetDirectoryNameI, rmDir, RmDirI } from '../utils';

const execFile = util.promisify(child_process.execFile);

// Точки расширения для тестов
interface ExtensionPoints {
    getDirectoryName: GetDirectoryNameI;
    rmDir: RmDirI;
    rootDirPath: string;
}

const remove: RequestHandler = async function(this: ExtensionPoints | void, req, res) {
    // Точки расширения для тестов
    const _getDirectoryName = this && this.getDirectoryName || getDirectoryName;
    const _rootDirPath = this && this.rootDirPath || req.app.get('rootDirPath');
    const _rmDir = this && this.rmDir || rmDir;

    const {
        [params.repositoryId]: repo,
    } = req.params;

    const repoPath = _getDirectoryName(repo);

    await _rmDir(execFile, repoPath, _rootDirPath);

    return res.sendStatus(ok);
};

export default remove;
