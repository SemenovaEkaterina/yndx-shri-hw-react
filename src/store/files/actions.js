import config from 'src/config';
import {SourceStatus} from "src/store/types";
import {setRepo} from "src/store/repos/actions";

export const actionNames = {
    LOAD_FILES: 'files/load',
    LOAD_FILES_RESULT: 'files/load/result',
    LOAD_FILE: 'file/load',
    LOAD_FILE_RESULT: 'file/load/result',
    SET_PATH: 'path/set',
};

export const loadFiles = () => ({
    type: actionNames.LOAD_FILES,
});

export const resultLoadFiles = (status, items, last) => ({
    type: actionNames.LOAD_FILES_RESULT,
    status,
    items,
    last,
});

export const loadFile = (repoId) => ({
    type: actionNames.LOAD_FILE,
    repoId: repoId,
});

export const resultLoadFile = (status, item, name) => ({
    type: actionNames.LOAD_FILE_RESULT,
    status,
    item,
    name,
});

export const setPath = (path = '') => ({
    type: actionNames.SET_PATH,
    path,
});

export const fetchFiles = (repoId, path) => async (dispatch, getState) => {
    dispatch(loadFiles());
    const base = `${config.apiUrl}repos/${repoId}`;
    const url = path ? `${base}/tree/master/${path}` : base;
    const response = await fetch(url);
    if (response.status === 404) {
        dispatch(resultLoadFiles(SourceStatus.NOT_FOUND));
    } else {
        const {list, last} = await response.json();
        dispatch(setRepo(repoId));
        dispatch(resultLoadFiles(SourceStatus.SUCCESS, list, last));
        dispatch(setPath(path));
    }
};

export const fetchFile = (repoId, path) => async (dispatch, getState) => {
    dispatch(loadFile());
    const url = `${config.apiUrl}repos/${repoId}/blob/master/${path}`;
    const response = await fetch(url);
    if (response.status === 404) {
        dispatch(resultLoadFile(SourceStatus.NOT_FOUND));
    } else {
        const item = (await response.text());
        const name = response.headers.get('Content-Disposition').split('=').slice(-1)[0];

        dispatch(setRepo(repoId));
        dispatch(resultLoadFile(SourceStatus.SUCCESS, item, name));
        dispatch(setPath(path));
    }
};

export default {...actionNames};