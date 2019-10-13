export default (str: string, prefix: string) => {
    const hasPrefix = str.startsWith(prefix);
    return hasPrefix ? str.substr(prefix.length) : str;
};
