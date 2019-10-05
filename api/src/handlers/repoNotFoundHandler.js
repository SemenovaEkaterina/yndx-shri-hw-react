const path = require('path');
const {checkExisting, getDirectoryName} = require('../utils');
const {params} = require('../../config');

module.exports = function (fn) {
    const callCheckExisting = this.checkExisting || checkExisting;
    const callGetDirectoryName = this.getDirectoryName || getDirectoryName;
    const rootDir = this.rootDirPath;

    return async (req, res) => {
        const {
            [params.repositoryId]: repo,
        } = req.params;

        const safeRepo = repo.split(/\s|\//).join('');

        const repoPath = path.join(rootDir, callGetDirectoryName(safeRepo));
        if (await callCheckExisting(repoPath)) {
            fn(req, res)
        } else {
            res.sendStatus(404);
        }
    }
};