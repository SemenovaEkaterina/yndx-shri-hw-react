const {params} = require('../../config');
const {getDirectoryName, rmDir} = require('../utils');
const {ok} = require('../../src/status');
const execFile = require("util").promisify(require("child_process").execFile);

module.exports = async function (req, res) {
    // Точки расширения для тестов
    const _getDirectoryName= this.getDirectoryName || getDirectoryName;
    const _rootDirPath= this.rootDirPath || rootDirPath;
    const _rmDir= this.rmDir || rmDir;

    const {
        [params.repositoryId]: repo,
    } = req.params;

    const repoPath = _getDirectoryName(repo);

    await _rmDir(execFile, repoPath, _rootDirPath);

    return res.sendStatus(ok);
};