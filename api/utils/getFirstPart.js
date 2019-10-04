module.exports = (str) => {
    const index = str.indexOf('/');
    return str.slice(0, index);
};