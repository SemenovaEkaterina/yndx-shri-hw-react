const repos = require('./repos');
const tree = require('./tree');
const file = require('./file');
const create = require('./create');
const remove = require('./remove');
const {asyncErrorHandler, repoNotFoundHandler} = require("../handlers");

module.exports = {
    repos: asyncErrorHandler(repos),
    tree: repoNotFoundHandler(asyncErrorHandler(tree)),
    file: repoNotFoundHandler(asyncErrorHandler(file)),
    create: asyncErrorHandler(create),
    remove: repoNotFoundHandler(asyncErrorHandler(remove))
};