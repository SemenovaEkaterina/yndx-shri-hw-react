import child_process, {
  ChildProcess,
  spawn,
} from 'child_process';
import {RequestHandler} from 'express';
import path from 'path';
import util from 'util';
import config from '../../config.json';
import {
    callGit,
    CallGitI,
    cleanRelativePath,
    CleanRelativePathI,
    getDirectoryName,
    GetDirectoryNameI,
    getHash,
    GetHashI,
} from '../utils';
const execFile = util.promisify(child_process.execFile);
import status from '../status.json';

const {params} = config;

// Точки расширения для тестов
interface ExtensionPoints {
    getHash: GetHashI;
    getDirectoryName: GetDirectoryNameI;
    callGit: CallGitI;
    cleanRelativePath: CleanRelativePathI;
    rootDirPath: string;
    spawn: (command: string, args: string[], options?: {}) => ChildProcess;
}

const file: RequestHandler = async function(this: ExtensionPoints | void, req, res) {
    // Точки расширения для тестов
    const _getHash = this && this.getHash || getHash;
    const _getDirectoryName = this && this.getDirectoryName || getDirectoryName;
    const _callGit = this && this.callGit || callGit;
    const _cleanRelativePath = this && this.cleanRelativePath || cleanRelativePath;
    const _rootDirPath = this && this.rootDirPath || req.app.get('rootDirPath');;
    const _spawn = this && this.spawn || spawn;

    const {
        [params.repositoryId]: repo,
        [params.commitHash]: commit,
        [params.pathToFile]: filePath,
    } = req.params;

    const inputRelativePath = filePath + req.params['0'];
    const relativePath = _cleanRelativePath(inputRelativePath, false);

    const repoPath = path.join(_rootDirPath, _getDirectoryName(repo));
    const hash = await _getHash(repoPath, commit);

    if (!hash) {
        return res.sendStatus(status.notFound);
    }

    const revFilePath = `${hash}:${relativePath}`;

    try {
        await _callGit(execFile, ['cat-file', '-e', revFilePath], repoPath);
    } catch (e) {
        if (e.code === status.notFound) {
            return res.sendStatus(status.notFound);
        }
        throw e;
    }

    res.setHeader('Content-Disposition', 'attachment; filename=' + relativePath.split('/').slice(-1));
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    _spawn('git', ['show', revFilePath], {cwd: repoPath}).stdout!.pipe(res);
    return;
};

export default file;
