const path = require('path');
const config = require('../../config');
const {getHash, getDirectoryName, callGit, cleanRelativePath} = require('../utils');
const {spawn} = require('child_process');
const execFile = require("util").promisify(require("child_process").execFile);
const status = require('../status');

const {params} = config;

module.exports = async function (req, res) {
    // Точки расширения для тестов
    const _getHash = this.getHash || getHash;
    const _getDirectoryName = this.getDirectoryName || getDirectoryName;
    const _callGit = this.callGit || callGit;
    const _cleanRelativePath = this.cleanRelativePath || cleanRelativePath;
    const _rootDirPath = this.rootDirPath || rootDirPath;
    const _spawn = this.spawn || spawn;

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
    }
    catch (e) {
        if (e.code === status.notFound) {
            return res.sendStatus(status.notFound);
        }
        throw e;
    }

    _spawn('git', ['show', revFilePath], {cwd: repoPath}).stdout.pipe(res);
};