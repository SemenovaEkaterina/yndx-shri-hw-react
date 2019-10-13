import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {HttpStatus, SourceStatus} from 'src/store/types';
import apiUrls from '../apiUrls';
import { AppState } from '../index';
import {
    LOAD_REPOS,
    LOAD_REPOS_RESULT,
    ReposActionTypes,
    SET_REPO,
} from './types';

export const loadRepos = (): ReposActionTypes => ({
    type: LOAD_REPOS,
});

export const resultLoadRepos = (status: SourceStatus, items?: string[]): ReposActionTypes => ({
    type: LOAD_REPOS_RESULT,
    status,
    items,
});

export const setRepo = (key: string): ReposActionTypes => ({
    type: SET_REPO,
    key,
});

export const fetchRepos = (
  repoId = '',
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch, getState) => {
    const state = getState();
    if (state.repos.status !== SourceStatus.INITIAL) {
        return;
    }

    dispatch(loadRepos());
    const url = apiUrls.repos();
    const response = await fetch(url);
    if (response.status === HttpStatus.NOT_FOUND) {
        dispatch(resultLoadRepos(SourceStatus.NOT_FOUND));
    } else {
        const {repos} = await response.json();
        if (repos.indexOf(repoId) !== -1) {
            dispatch(setRepo(repoId));
        }
        if (!repoId) {
            dispatch(setRepo(repos[0]));
        }
        dispatch(resultLoadRepos(SourceStatus.SUCCESS, repos));
    }
};

export default {fetchRepos, setRepo};
