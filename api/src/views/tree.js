const path = require('path');
const config = require('../../config');
const {getHash, getDirectoryName, removePrefix, callGit, cleanRelativePath, getFirstPart} = require('../utils');
const execFile = require("util").promisify(require("child_process").execFile);
const {asyncErrorHandler, repoNotFoundHandler} = require('../handlers');
const status = require('../status');

const {params} = config;

module.exports = async function (req, res) {
    // Точки расширения для тестов

    const _cleanRelativePath = this.cleanRelativePath || cleanRelativePath;
    const _getDirectoryName = this.getDirectoryName || getDirectoryName;
    const _getHash = this.getHash || getHash;
    const _execFile = this.execFile || execFile;
    const _callGit = this.callGit || callGit;
    const _rootDirPath = this.rootDirPath || rootDirPath;

    const {
        [params.repositoryId]: repo,
        [params.commitHash]: commit,
        [params.path]: currentPath,
    } = req.params;

    let inputRelativePath = (currentPath + req.params['0']) || '';
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
    const {stdout} = await _execFile(scriptsPath, [], {cwd: repoPath});

    const out = [...new Set(stdout.split('\n')
        .filter(item => item && item.startsWith(relativePath || '')).map(item => removePrefix(item, relativePath))
        .filter(item => item.split('/').length === 1))];

    const list = out.map(item => {
        const [name, time, commit, message, author, type] = item.split('|');
        return {
            name, time, commit, message, author, type
        }
    });
    const lastCommit = await _callGit(execFile, ['log', -1, '--pretty=format:%h|%cn|%at|%s', 'HEAD', `--`, relativePath || '.'], repoPath);
    const [lastCommitHash, author, time, message] = lastCommit[0].split('|');

    if (relativePath && !list.length) {
        return res.sendStatus(status.notFound);
    }

    return res.json({
        last: {
            hash: lastCommitHash,
            author,
            time,
            message,
        },
        list,
    });
};