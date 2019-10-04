const fs = require('fs');
const util = require('util');
const {getRepoNameFromPath} = require("../utils");
const {asyncErrorHandler} = require("../handlers");
const readdir = util.promisify(fs.readdir);

module.exports = asyncErrorHandler(async (req, res) => {
    const files = await readdir(rootDirPath, {withFileTypes: true});
    return res.json({
        repos: files.filter(item => item.isDirectory())
            .map(item => getRepoNameFromPath(item.name))
    });
});