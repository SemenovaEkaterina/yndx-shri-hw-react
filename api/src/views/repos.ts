import {RequestHandler} from 'express';
import fs, { Dirent } from 'fs';
import util from 'util';
import { getRepoNameFromPath, GetRepoNameFromPathI } from '../utils';
const readdir = util.promisify(fs.readdir);

// Точки расширения для тестов
interface ExtensionPoints {
    getRepoNameFromPath: GetRepoNameFromPathI;
    readdir: (path: string, options: {}) => Promise<Dirent[]>;
    rootDirPath: string;
}

const repos: RequestHandler = async function(this: ExtensionPoints | void, req, res) {
    // Точки расширения для тестов
    const _readdir = this && this.readdir || readdir;
    const _rootDirPath = this && this.rootDirPath || req.app.get('rootDirPath');
    const _getRepoNameFromPath = this && this.getRepoNameFromPath || getRepoNameFromPath;

    const files: Dirent[] = await _readdir(_rootDirPath, {withFileTypes: true});
    return res.json({
        repos: files.filter((item) => item.isDirectory())
            .map((item) => _getRepoNameFromPath(item.name)),
    });
};

export default repos;
