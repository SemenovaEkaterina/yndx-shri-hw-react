module.exports = (str, prefix) => {
    const hasPrefix = str.startsWith(prefix);
    return hasPrefix ? str.substr(prefix.length) : str;
};