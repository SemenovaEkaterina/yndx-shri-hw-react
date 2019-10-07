import React from 'react';
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router';
import Root from '../Root';
import {createStore} from "redux";
import reducer from '../store';

export default ({url, state: {state, js, css}}) => {
    let store = createStore(reducer, state);

    return (
        <Provider store={store}>
            <StaticRouter location={url} context={{}}>
                <html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                    <title>Arcanum</title>
                    {css.map(file => (
                        <link rel="stylesheet" href={`/${file}`} key={file} />
                    ))}
                </head>
                <body>
                <div id="root">
                    <Root/>
                </div>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.__PRELOADED_STATE__=${JSON.stringify(store.getState()).replace(
                            /</g,
                            '\\u003c',
                        )}`,
                    }}
                />

                {js.map(file => (
                    <script src={`/${file}`} key={file} defer/>
                ))}
                </body>
                </html>
            </StaticRouter>
        </Provider>
    );
}