import child_process from 'child_process';
import path from 'path';
import util from 'util';
import callGit from './callGit';
import getDirectoryName from './getDirectoryName';
import rmDir from './rmDir';
const execFile = util.promisify(child_process.execFile);
import {githubUrl} from '../../config.json';

export type CreateUtilI = (url: string, rootDirPath: string) => Promise<void>;

const createUtil: CreateUtilI = async (url: string, rootDirPath: string) => {
    const repoName = url.replace(githubUrl, '').split('/')[1];
    const repoPath = path.join(rootDirPath, getDirectoryName(repoName));

    await callGit(execFile, ['clone', '--quiet', '--bare', url], rootDirPath);
    await rmDir(execFile, 'hooks', repoPath);
};

export default createUtil;
