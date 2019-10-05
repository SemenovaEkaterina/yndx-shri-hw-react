const express = require('express');
const os = require('os');
const cors = require('cors');
const path = require('path');
const config = require('../config');
const {checkExisting} = require('./utils');
const {} = require('./views');

const [, , inputPath] = process.argv;

if (!inputPath) {
    console.log(`Empty basedir`);
    return;
}

const {baseUrl} = config;

const rootDirPath = path.resolve(
     inputPath.startsWith('~')
        ? `${os.homedir()}${inputPath.slice(1)}`
        : inputPath
);

global.rootDirPath = rootDirPath;

const initServer = async () => {
    const app = express();
    app.use(cors());
    app.use(express.urlencoded({extended: true}));
    app.use(baseUrl, require('./routes'));

    app.listen(config.port);

    console.log(`Server listen on localhost:${config.port}`);
};

(async function () {
    const isPathExisted = await checkExisting(rootDirPath);
    if (isPathExisted) {
        initServer();
    }
}());
