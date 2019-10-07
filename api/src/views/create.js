const path = require('path');
const config = require('../../config');
const {
    getDirectoryName,
    checkExisting,
    createUtil,
} = require('../utils');
const status = require('../status');

const {body} = config;

module.exports = async function (req, res) {
    // Точки расширения для тестов
    const _getDirectoryName = this.getDirectoryName || getDirectoryName;
    const _checkExisting = this.checkExisting || checkExisting;
    const _createUtil = this.createUtil || createUtil;
    const _rootDirPath = this.rootDirPath || rootDirPath;

    const {
        [body.url]: url = '',
    } = req.body;

    const repoName = url.replace(config.githubUrl, '').split('/')[1];
    const repoPath = path.join(_rootDirPath, _getDirectoryName(repoName));

    if (await _checkExisting(repoPath)) {
        return res.sendStatus(status.conflict);
    }

    try {
        await _createUtil(url);
    }
    catch (e) {
        if (e.code === status.notFound) {
            return res.sendStatus(status.notFound);
        }
        throw e;
    }

    return res.sendStatus(status.ok);
};