import express, {Request, Response} from 'express';
const router = express.Router();
import { params } from '../config.json';
import { notFound } from './status.json';
import {create, file, remove, repos, tree} from './views';

router.get('/', repos);
router.post(`/`, create);

router.get(`/:${params.repositoryId}`, tree);
router.delete(`/:${params.repositoryId}`, remove);

router.get(
  `/:${params.repositoryId}/tree/:${params.commitHash}?/:${params.path}*?`,
  tree,
);
router.get(
  `/:${params.repositoryId}/blob/:${params.commitHash}/:${params.pathToFile}*`,
  file,
);

router.get(`*`, (_: Request, res: Response) => res.sendStatus(notFound));

export default router;
