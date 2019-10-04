module.exports = (path, trailingSlash = true) => {
    if (!path && path.includes('./') || path.includes('../')) {
        return undefined;
    }

    let result = path.split(/\s/).join('');
    if (trailingSlash && result && !result.endsWith('/')) {
        result = `${result}/`;
    }

    return result;
};