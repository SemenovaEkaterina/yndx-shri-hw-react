import express from 'express';
import ReactDOMServer from "react-dom/server";
import App from "src/App/App@server";
import React from "react";
import { readFile } from 'fs';
import path from 'path';
import process from 'process';
const currentPath = process.cwd();
import { matchPath } from 'react-router';
import routes from "../routes";
import {createStore} from "redux";
import reducer from '../store';
import fetch from 'node-fetch';

global.fetch = fetch;
const DEFAULT_JS = 'main.js';
const DEFAULT_CSS = 'main.css';

const app = express();

// Получение имен бандлов
function readManifest() {
    return new Promise((resolve, reject) => {
        readFile(path.join(currentPath, 'dist', 'manifest.json'), { encoding: 'utf8' }, (err, data) => {
            if (err) {
                reject(new Error('Client assets not ready', err));
            } else {
                try {
                    resolve(JSON.parse(data));
                } catch (err) {
                    reject(new Error('Cannot parse client assets manifest'));
                }
            }
        });
    });
}

// Нахождение текущего рута
async function matchUrl(url, store) {
    for (let route of Object.keys(routes)) {
        let result = matchPath(url, routes[route]);

        if (result && (result.isExact || !routes[route].isExact)) {
            return await routes[route].loadData(store.dispatch, store.getState, result.params);
        }
    }
}

// Обрабочик запросов
const view = async (req, res) => {
    const store = createStore(reducer);
    const { url = req.url } = await matchUrl(req.url, store);

    const files = await readManifest();
    let getFiles = names => names.map(name => files && files[name]);
    const js = getFiles([DEFAULT_JS]);
    const css = getFiles([DEFAULT_CSS]);

    const content = ReactDOMServer.renderToString(<App url={url} state={{state: store.getState(), css: [css], js: [js]}} context={{}}/>);

    res.send('<!DOCTYPE html>' + content).end();
};

// Исключить index.html из статики
app.get('/', view);
app.use('^/', express.static(path.join(currentPath, 'dist')));
app.get('*', view);

const port = process.env.PORT || 3000;
const host = '0.0.0.0';
app.listen(port, host);
console.log(`Listen on ${host}:${port}`);