import child_process from 'child_process';
import { RequestHandler } from 'express';
import path from 'path';
import util from 'util';
import config from '../../config.json';
import status from '../status.json';
import { ExecFuncI } from '../types';
import {
    callGit, CallGitI,
    cleanRelativePath,
    CleanRelativePathI,
    getDirectoryName, GetDirectoryNameI,
    getHash, GetHashI,
    removePrefix,
} from '../utils';
const execFile = util.promisify(child_process.execFile);

const {params} = config;

// Точки расширения для тестов
interface ExtensionPoints {
    cleanRelativePath: CleanRelativePathI;
    getDirectoryName: GetDirectoryNameI;
    getHash: GetHashI;
    execFile: ExecFuncI;
    callGit: CallGitI;
    rootDirPath: string;
}

const tree: RequestHandler = async function(this: ExtensionPoints | void, req, res) {
    // Точки расширения для тестов
    const _cleanRelativePath = this && this.cleanRelativePath || cleanRelativePath;
    const _getDirectoryName = this && this.getDirectoryName || getDirectoryName;
    const _getHash = this && this.getHash || getHash;
    const _execFile = this && this.execFile || execFile;
    const _callGit = this && this.callGit || callGit;
    const _rootDirPath = this && this.rootDirPath || req.app.get('rootDirPath');

    const {
        [params.repositoryId]: repo,
        [params.commitHash]: commit,
        [params.path]: currentPath,
    } = req.params;

    const inputRelativePath = (currentPath + req.params['0']) || '';
    const relativePath = _cleanRelativePath(inputRelativePath);
    if (inputRelativePath && !relativePath) {
        return res.sendStatus(status.notFound);
    }

    const repoPath = path.join(_rootDirPath, _getDirectoryName(repo));
    const hash = await _getHash(repoPath, commit || 'master');
    if (!hash) {
        return res.sendStatus(status.notFound);
    }

    const scriptsPath = path.join(__dirname, '../scripts/files.sh');
    const {stdout = ''} = await _execFile(scriptsPath, [], {cwd: repoPath});

    const out = [...new Set(stdout.split('\n')
        .filter((item) => item && item.startsWith(relativePath || '')).map((item) => removePrefix(item, relativePath))
        .filter((item) => item.split('/').length === 1))];

    const list = out.map((item) => {
        const [name, time, commitHash, message, author, type] = item.split('|');
        return {
          author, commit: commitHash, message, name, time, type,
        };
    });
    const lastCommit = await _callGit(execFile, [
      'log',
      '-1',
      '--pretty=format:%h|%cn|%at|%s',
      'HEAD',
      `--`,
      relativePath || '.',
    ], repoPath);
    const [lastCommitHash, author, update, message] = lastCommit[0].split('|');

    if (relativePath && !list.length) {
        return res.sendStatus(status.notFound);
    }

    return res.json({
        last: {
            author,
            hash: lastCommitHash,
            message,
            time: update,
        },
        list,
    });
};

export default tree;
