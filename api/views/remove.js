const {params} = require('../config');
const {getDirectoryName, callGit, rmDir} = require('../utils');
const execFile = require("util").promisify(require("child_process").execFile);
const {asyncErrorHandler, repoNotFoundHandler} = require('../handlers');

module.exports = repoNotFoundHandler(asyncErrorHandler(async (req, res) => {
    const {
        [params.repositoryId]: repo,
    } = req.params;

    const repoPath = getDirectoryName(repo);

    await rmDir(execFile, repoPath, rootDirPath);

    return res.sendStatus(200);
}));