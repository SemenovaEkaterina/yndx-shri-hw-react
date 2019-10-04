import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
import files from './files';
import thunk from 'redux-thunk';

const enhancer = composeWithDevTools(
    applyMiddleware(
        thunk
    )
);

export default createStore(combineReducers({files: files.reducers}), {}, enhancer);