const repos = require('./repos');
const commits = require('./commits');
const diff = require('./diff');
const tree = require('./tree');
const file = require('./file');
const create = require('./create');
const remove = require('./remove');
const count = require('./count');

module.exports = {
    repos,
    commits,
    diff,
    tree,
    file,
    create,
    remove,
    count,
};