module.exports = (fullName) => {
    return fullName.endsWith('.git') ? fullName.replace(/.git$/i, '') : fullName;
};