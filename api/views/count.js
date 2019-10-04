const path = require('path');
const {getDirectoryName, callGit} = require('../utils');
const {asyncErrorHandler, repoNotFoundHandler} = require('../handlers');
const execFile = require("util").promisify(require("child_process").execFile);
const {spawn, fork} = require('child_process');

const {params} = require('../config');


module.exports = repoNotFoundHandler(asyncErrorHandler(
    async (req, res) => {
        const {
            [params.repositoryId]: repo
        } = req.params;

        const result = {};
        let counter = 0;

        const repoPath = path.join(rootDirPath, getDirectoryName(repo));
        const files = await callGit(execFile, ['ls-tree', 'master', '-r'], repoPath);

        // Ограничить число дочерних процессов?
        const calcStat = fork(`${__dirname}/../calcStat.js`);
        counter = files.length;
        files.map(async item => {
            const hash = item.split(' ')[2].split('\t')[0];
            const text = await callGit(execFile, ['cat-file', hash, '-p'], repoPath, true);
            calcStat.send(text);
        });

        calcStat.on('message', (m) => {
            Object.entries(m).map(([key, value]) => {
                result[key] = (result[key] || 0) + parseInt(value);
            });
            counter--;

            if (counter === 0) {
                return res.json(result);
            }
        });
    }));