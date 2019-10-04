const express = require('express');
const os = require('os');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const {checkExisting, create} = require('./utils');
const {} = require('./views');

const [, , inputPath, init] = process.argv;

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
    if (init) {
        try {
            await create(init);
        } catch (e) {
            console.log("Already init");
        }

    }

    console.log(`Server listen on localhost:${config.port}`);
};

(async function () {
    const isPathExisted = await checkExisting(rootDirPath);
    if (isPathExisted) {
        initServer();
    }
}());
