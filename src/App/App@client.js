import React from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import Root from "src/Root";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from '../store';

const enhancer = composeWithDevTools(
    applyMiddleware(
        thunk
    )
);

function App({state}) {
    const store = createStore(reducer, state, enhancer);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </Provider>
    );
}

export default App;