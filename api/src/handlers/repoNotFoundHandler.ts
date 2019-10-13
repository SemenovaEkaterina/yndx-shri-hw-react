import { Handler, NextFunction, Request, Response } from 'express';
import path from 'path';
import {params} from '../../config.json';
import {notFound} from '../status.json';
import {
    checkExisting,
    CheckExistingI,
    getDirectoryName,
    GetDirectoryNameI,
} from '../utils';

// Точки расширения для тестов
interface ExtensionPoints {
    checkExisting: CheckExistingI;
    getDirectoryName: GetDirectoryNameI;
    rootDirPath: string;
}

export default function(this: ExtensionPoints | void, fn: Handler) {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Точки расширения для тестов
        const _checkExisting = this && this.checkExisting || checkExisting;
        const _getDirectoryName = this && this.getDirectoryName || getDirectoryName;
        const _rootDirPath = this && this.rootDirPath || req.app.get('rootDirPath');

        const {
            [params.repositoryId]: repo,
        } = req.params;

        const safeRepo = repo.split(/\s|\//).join('');

        const repoPath = path.join(_rootDirPath, _getDirectoryName(safeRepo));
        if (await _checkExisting(repoPath)) {
            fn(req, res, next);
        } else {
            res.sendStatus(notFound);
        }
    };
}
