const express = require('express');
const router = express.Router();
const {repos, commits, diff, tree, file, create, remove, count} = require('./views');
const {params} = require('./config');


router.get('/', repos);
router.post(`/`, create);

router.get(`/:${params.repositoryId}`, tree);
router.delete(`/:${params.repositoryId}`, remove);
router.get(`/:${params.repositoryId}/count`, count);

router.get(`/:${params.repositoryId}/commits/:${params.commitHash}`, commits);
router.get(`/:${params.repositoryId}/commits/:${params.commitHash}/diff`, diff);

router.get(
    `/:${params.repositoryId}/tree/:${params.commitHash}?/:${params.path}*?`,
    tree
);
router.get(
    `/:${params.repositoryId}/blob/:${params.commitHash}/:${params.pathToFile}*`,
    file
);

router.get(`*`, (req, res) => res.sendStatus(404));

module.exports = router;