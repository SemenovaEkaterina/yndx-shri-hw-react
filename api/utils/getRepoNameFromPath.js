module.exports = (fullName) => {
    return fullName.replace(/.git$/i, '');
};