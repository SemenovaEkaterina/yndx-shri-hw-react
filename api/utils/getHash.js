const callGit = require('./callGit');
const execFile = require("util").promisify(require("child_process").execFile);

module.exports = async (repoPath, commitHash, onlyCommit=false) => {
    if (!onlyCommit) {
        const branches = await callGit(execFile, ['branch', `--format="%(refname) %(objectname)"`], repoPath);
        branches.map(item => {
            const [name, hash] = item.split(' ');
            if (name.replace('refs/heads/', '') === hash) {
                return hash;
            }
        });
    }
    try {
        const isCommitHash = /^[a-zA-Z\d]+$/.test(commitHash);
        if (isCommitHash) {
            await execFile('git', ['cat-file', '-e', commitHash], { cwd: repoPath});
            return  commitHash;
        }
        return undefined;
    } catch {
        return undefined;
    }
};
