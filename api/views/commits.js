const path = require('path');
const {getHash, getDirectoryName, callGit} = require('../utils');
const {asyncErrorHandler, repoNotFoundHandler} = require('../handlers');
const execFile = require("util").promisify(require("child_process").execFile);

const {params, query, defaultLimit} = require('../config');

const DIVIDER = ';';

module.exports = repoNotFoundHandler(asyncErrorHandler(
    async (req, res) => {
        const {
            [params.repositoryId]: repo,
            [params.commitHash]: commit
        } = req.params;

        const {
            [query.limit]: limit = defaultLimit,
            [query.offset]: offset = 0
        } = req.query;

        const repoPath = path.join(rootDirPath, getDirectoryName(repo));
        const hash = await getHash(repoPath, commit);
        if (!hash) {
            return res.sendStatus(404);
        }

        const count = (await callGit(execFile, ['rev-list', '--count', hash], repoPath))[0];
        const commits = await callGit(
            execFile,
            [
                'log',
                `--format=%H${DIVIDER}%at${DIVIDER}%s`,
                `--max-count=${limit}`,
                `--skip=${offset}`,
                hash
            ],
            repoPath
        );

        const list = commits.map(line => {
            const items = line.split(DIVIDER);
            const [hash, time, message] = [items[0], items[1], items.slice(2).join(DIVIDER)];
            return {hash, time, message};
        });

        return res.json({count, list});
    }));