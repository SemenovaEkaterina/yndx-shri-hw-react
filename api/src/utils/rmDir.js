module.exports = async (func, path, cwd) => {
    const { stderr } = await func(
        'rm',
        ['-rf', path],
        {cwd}
    );

    if (stderr) {
        throw new Error(stderr);
    }

    return 0;
};