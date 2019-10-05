const status = require('../status');

module.exports = async (func, params, cwd, raw=false) => {
    const parseError = (err) => {
        if (err.includes('Repository not found') || err.includes('Not a valid object name')) {
            throw {code: status.notFound};
        }
        throw `Call git error: ${err}`;
    };

    try {
        const { stdout, stderr } = await func(
            'git',
            params,
            {cwd}
        );

        if (stderr) {
            return  parseError(stderr);
        }

        return raw ? stdout : stdout.split('\n').filter(item => item);
    }
    catch (e) {
        return  parseError(e.stderr);
    }
};