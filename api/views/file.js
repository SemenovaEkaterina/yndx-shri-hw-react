const path = require('path');
const config = require('../config');
const {getHash, getDirectoryName, checkExisting, callGit, cleanRelativePath} = require('../utils');
const {spawn} = require('child_process');
const {asyncErrorHandler, repoNotFoundHandler} = require('../handlers');
const execFile = require("util").promisify(require("child_process").execFile);
const status = require('../status');

const {params} = config;

module.exports = repoNotFoundHandler(asyncErrorHandler(async (req, res) => {
    const {
        [params.repositoryId]: repo,
        [params.commitHash]: commit,
        [params.pathToFile]: filePath,
    } = req.params;

    const inputRelativePath = filePath + req.params['0'];
    const relativePath = cleanRelativePath(inputRelativePath, false);

    const repoPath = path.join(rootDirPath, getDirectoryName(repo));
    const hash = await getHash(repoPath, commit);

    if (!hash) {
        return res.sendStatus(404);
    }

    const revFilePath = `${hash}:${relativePath}`;

    try {
        await callGit(execFile, ['cat-file', '-e', revFilePath], repoPath);
    }
    catch (e) {
        if (e.code === status.notFound) {
            return res.sendStatus(status.notFound);
        }
        throw e;
    }

    spawn('git', ['show', revFilePath], {cwd: repoPath}).stdout.pipe(res);
}));