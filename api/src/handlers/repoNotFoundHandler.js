const path = require('path');
const {checkExisting, getDirectoryName} = require('../utils');
const {params} = require('../../config');

module.exports = function (fn) {


    return async (req, res) => {
        const _checkExisting = this.checkExisting || checkExisting;
        const _getDirectoryName = this.getDirectoryName || getDirectoryName;
        const _rootDirPath = this.rootDirPath || rootDirPath;

        const {
            [params.repositoryId]: repo,
        } = req.params;

        const safeRepo = repo.split(/\s|\//).join('');

        const repoPath = path.join(_rootDirPath, _getDirectoryName(safeRepo));
        if (await _checkExisting(repoPath)) {
            fn(req, res)
        } else {
            res.sendStatus(404);
        }
    }
};