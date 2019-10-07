import {combineReducers} from 'redux';
import files from './files';
import repos from './repos';

export default combineReducers({
    files: files.reducers,
    repos: repos.reducers
});