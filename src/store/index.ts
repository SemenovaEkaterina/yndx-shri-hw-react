import {combineReducers} from 'redux';
import files from './files';
import repos from './repos';

const rootReducer = combineReducers({
    files: files.reducers,
    repos: repos.reducers,
});
export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
