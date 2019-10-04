const path = require('path');
const {checkExisting, getDirectoryName} = require('../utils');
const {params} = require('../config');

module.exports = fn =>
    async (req, res) => {
        const {
            [params.repositoryId]: repo,
        } = req.params;

        const safeRepo = repo.split(/\s|\//).join('');

        const repoPath = path.join(rootDirPath, getDirectoryName(safeRepo));
        if (await checkExisting(repoPath)) {
            fn(req, res)
        } else {
            res.sendStatus(404);
        }
    };