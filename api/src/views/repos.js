const fs = require('fs');
const util = require('util');
const {getRepoNameFromPath} = require("../utils");
const readdir = util.promisify(fs.readdir);

module.exports = async function (req, res) {
    // Точки расширения для тестов
    const _readdir = this.readdir || readdir;
    const _rootDirPath = this.rootDirPath || rootDirPath;
    const _getRepoNameFromPath = this.getRepoNameFromPath || getRepoNameFromPath;

    const files = await _readdir(_rootDirPath, {withFileTypes: true});
    return res.json({
        repos: files.filter(item => item.isDirectory())
            .map(item => _getRepoNameFromPath(item.name))
    });
};