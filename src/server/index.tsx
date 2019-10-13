import express, {Request, Response} from 'express';
import { readFile } from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import process from 'process';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath } from 'react-router';
import { createStore, Store } from 'redux';
import request from 'request';
import App from 'src/App/App@server';
import routes from '../routes';
import reducer, { AppState } from '../store';

declare global {
    namespace NodeJS {
        interface Global {
            fetch: typeof fetch;
        }
    }
}

global.fetch = fetch;
const DEFAULT_JS = 'main.js';
const DEFAULT_CSS = 'main.css';
const currentPath = process.cwd();

const app = express();

// Получение имен бандлов
function readManifest(): Promise<{[key: string]: string}> {
    return new Promise((resolve, reject) => {
        readFile(path.join(currentPath, 'dist', 'manifest.json'), { encoding: 'utf8' }, (err, data) => {
            if (err) {
                reject(new Error('Client assets not ready' + err));
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
async function matchUrl(url: string, store: Store<AppState>) {
    for (const route of Object.keys(routes)) {
        const result = matchPath(url, routes[route]);

        if (result && (result.isExact || !routes[route].isExact)) {
            return await routes[route].loadData(store.dispatch, store.getState, result.params);
        }
    }
    return {};
}

// Обрабочик запросов
const view = async (req: Request, res: Response) => {
    const store = createStore(reducer);
    const { url = req.url } = await matchUrl(req.url, store);

    const files = await readManifest();
    const getFiles = (names: string[]): string[] => names.map((name) => files && files[name]);
    const js = getFiles([DEFAULT_JS]);
    const css = getFiles([DEFAULT_CSS]);

    const content = ReactDOMServer.renderToString(
      <App url={url} state={{state: store.getState(), css, js}} />,
    );

    res.send('<!DOCTYPE html>' + content).end();
};

app.get('/api/*', (req, res) => {
    const newUrl = `http://localhost:3003${req.url}`;
    request(newUrl).pipe(res);
});

// Исключить index.html из статики
app.get('/', view);
app.use('^/', express.static(path.join(currentPath, 'dist')));
app.get('*', view);

const DEFAULT_PORT = 3000;
const port = parseInt(process.env.PORT || '', 10) || DEFAULT_PORT;
const host = '0.0.0.0';
app.listen(port, host);

console.log(`Listen on ${host}:${port}`);
