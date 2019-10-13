import { createElement } from 'react';
import { hydrate } from 'react-dom';
import App from 'src/App/App@client';
import 'src/shared/scss/fonts.scss';
import { AppState } from '../store';

declare global {
    interface Window { __PRELOADED_STATE__: object; }
}

const state = window.__PRELOADED_STATE__ as AppState;

delete window.__PRELOADED_STATE__;

document.addEventListener('DOMContentLoaded', async () => {
    hydrate(createElement(App, {state}), document.getElementById('root'));
});
