module.exports = async (func, path, cwd) => {
    const { stderr } = await func(
        'rm',
        ['-rf', path],
        {cwd}
    );

    if (stderr) {
        throw `Rm dir error: ${stderr}`;
    }

    return 0;
};