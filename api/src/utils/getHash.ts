import child_process from 'child_process';
import util from 'util';
import callGit, { CallGitI } from './callGit';
const execFile = util.promisify(child_process.execFile);

export type GetHashI = (repoPath: string, commitHash: string, onlyCommit?: boolean) => Promise<string | null>;

// Точки расширения для тестов
interface ExtensionPoints {
    callGit: CallGitI;
}

const getHash: GetHashI = async function(
  this: ExtensionPoints, repoPath: string, commitHash: string, onlyCommit= false
) {
    if (!onlyCommit) {
        // Точки расширения для тестов
        const _callGit = this && this.callGit || callGit;

        const branches = await _callGit(execFile, ['branch', `--format="%(refname) %(objectname)"`], repoPath);
        let resultHash = null;
        (branches as string[]).map((item: string) => {
            const [name, hash] = item.split(' ');
            if (name.replace('refs/heads/', '') === commitHash) {
                resultHash = hash;
            }
        });
        return resultHash;
    }
    try {
        const isCommitHash = /^[a-zA-Z\d]+$/.test(commitHash);
        if (isCommitHash) {
            await execFile('git', ['cat-file', '-e', commitHash], { cwd: repoPath});
            return  commitHash;
        }
        return null;
    } catch {
        return null;
    }
};

export default getHash;
