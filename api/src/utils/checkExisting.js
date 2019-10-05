const fs = require('fs');
const util = require('util');
const exists = util.promisify(fs.exists);

module.exports = async (filePath) => {
    return await exists(filePath);
};
