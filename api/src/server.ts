import cors from 'cors';
import express from 'express';
import os from 'os';
import path from 'path';
import config from '../config.json';
import routes from './routes';
import {checkExisting} from './utils';

const [, , inputPath] = process.argv;

if (!inputPath) {
    console.log(`Empty basedir`);
    process.exit(0);
}

const {baseUrl} = config;

const rootDirPath = path.resolve(
     inputPath.startsWith('~')
        ? `${os.homedir()}${inputPath.slice(1)}`
        : inputPath,
);

const initServer = async () => {
    const app = express();
    app.use(cors());
    app.use(express.urlencoded({extended: true}));
    app.use(baseUrl, routes);
    app.set('rootDirPath', rootDirPath);

    app.listen(config.port);

    console.log(`Server listen on localhost:${config.port}`);
};

(async () => {
    const isPathExisted = await checkExisting(rootDirPath);
    if (isPathExisted) {
        initServer();
    }
})();
