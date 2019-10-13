import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { setRepo } from 'src/store/repos/actions';
import {HttpStatus, SourceStatus} from 'src/store/types';
import apiUrls from '../apiUrls';
import { AppState } from '../index';
import {
    CommitI,
    FileActionTypes,
    FileI, LOAD_FILE, LOAD_FILE_RESULT,
    LOAD_FILES,
    LOAD_FILES_RESULT, SET_PATH,
    SourceI,
} from './types';

export const loadFiles = (): FileActionTypes => ({
    type: LOAD_FILES,
});

export const resultLoadFiles = (status: SourceStatus, items?: SourceI[], last?: CommitI): FileActionTypes => ({
    type: LOAD_FILES_RESULT,
    status,
    items,
    last,
});

export const loadFile = (repoId: string): FileActionTypes => ({
    type: LOAD_FILE,
    repoId,
});

export const resultLoadFile = (status: SourceStatus, item?: FileI, name?: string): FileActionTypes => ({
    type: LOAD_FILE_RESULT,
    status,
    item,
    name,
});

export const setPath = (path: string = ''): FileActionTypes => ({
    type: SET_PATH,
    path,
});

export const fetchFiles = (
  repoId: string, path?: string,
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
    dispatch(loadFiles());
    const response = await fetch(apiUrls.tree(repoId, path));
    if (response.status === HttpStatus.NOT_FOUND) {
        dispatch(resultLoadFiles(SourceStatus.NOT_FOUND));
    } else {
        const {list, last} = await response.json();
        dispatch(setRepo(repoId));
        dispatch(resultLoadFiles(SourceStatus.SUCCESS, list, last));
        dispatch(setPath(path));
    }
};

export const fetchFile = (
  repoId: string, path: string,
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
    dispatch(loadFile(repoId));
    const response = await fetch(apiUrls.blob(repoId, path));
    if (response.status === HttpStatus.NOT_FOUND) {
        dispatch(resultLoadFile(SourceStatus.NOT_FOUND));
    } else {
        const item = (await response.text());
        const name = response.headers.get('Content-Disposition')!.split('=').slice(-1)[0];

        dispatch(setRepo(repoId));
        dispatch(resultLoadFile(SourceStatus.SUCCESS, item, name));
        dispatch(setPath(path));
    }
};
