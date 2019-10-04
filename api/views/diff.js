const path = require('path');
const config = require('../config');
const {getHash, getDirectoryName, callGit} = require('../utils');
const {asyncErrorHandler, repoNotFoundHandler} = require('../handlers');
const execFile = require("util").promisify(require("child_process").execFile);
const status = require('../status');

const {params} = config;

module.exports = repoNotFoundHandler(asyncErrorHandler(async (req, res) => {
    const {
        [params.repositoryId]: repo,
        [params.commitHash]: commit,
    } = req.params;

    const repoPath = path.join(rootDirPath, getDirectoryName(repo));
    const hash = await getHash(repoPath, commit, true);
    if (!hash) {
        return res.sendStatus(status.notFound);
    }

    const diff = await callGit(execFile, ['log', '-p', '--pretty=format:', hash, '-1'], repoPath, true);

    return res.json({diff});
}));