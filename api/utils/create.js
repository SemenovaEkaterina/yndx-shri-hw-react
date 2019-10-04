const getDirectoryName = require('./getDirectoryName');
const callGit = require('./callGit');
const rmDir = require('./rmDir');
const execFile = require("util").promisify(require("child_process").execFile);
const config = require("../config");
const path = require("path");

module.exports = async (url) => {
    const repoName = url.replace(config.githubUrl, '').split('/')[1];
    const repoPath = path.join(rootDirPath, getDirectoryName(repoName));

    await callGit(execFile, ['clone', '--quiet', '--bare', url], rootDirPath);
    await rmDir(execFile, 'hooks', repoPath);
};