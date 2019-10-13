import {notFound} from '../status.json';
import { ExecFuncI } from '../types';

export type CallGitI = (func: ExecFuncI, params: string[], cwd: string, raw?: boolean) => Promise<string[] | string>;

const callGit: CallGitI = async (func, params, cwd, raw= false) => {
    const parseError = (err: string) => {
        if (err.includes('Repository not found') || err.includes('Not a valid object name')) {
            throw {code: notFound};
        }
        throw new Error(`Call git error: ${err}`);
    };

    try {
        const { stdout = '', stderr } = await func(
            'git',
            params,
            {cwd},
        );

        if (stderr) {
            return  parseError(stderr);
        }

        // убрать кавычки
        const START = 1;
        const END = -2;
        const out = stdout.slice(START, END);

        return raw ? out : out.split('\n').filter((item: string) => item);
    } catch (e) {
        return  parseError(e.stderr);
    }
};

export default callGit;
