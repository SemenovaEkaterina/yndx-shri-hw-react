import config from 'src/config';
import {SourceStatus} from "src/store/types";

export const actionNames = {
    LOAD_FILES: 'files/load',
    LOAD_FILES_RESULT: 'files/load/result',
    LOAD_FILE: 'file/load',
    LOAD_FILE_RESULT: 'file/load/result',
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

export const resultLoadFile = (status, item) => ({
    type: actionNames.LOAD_FILE_RESULT,
    status,
    item,
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
        dispatch(resultLoadFiles(SourceStatus.SUCCESS, list, last));
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

        dispatch(resultLoadFile(SourceStatus.SUCCESS, item));
    }
};

export default {...actionNames};