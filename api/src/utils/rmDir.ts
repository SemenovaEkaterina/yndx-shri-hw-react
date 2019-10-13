import {ExecFuncI} from '../types';

export type RmDirI = (func: ExecFuncI, path: string, cwd: string) => Promise<void>;

const rmDir: RmDirI = async (func: ExecFuncI, path: string, cwd: string) => {
    const { stderr } = await func(
        'rm',
        ['-rf', path],
        {cwd},
    );

    if (stderr) {
        throw new Error(stderr);
    }

    return;
};

export default rmDir;
