import config from 'src/config';
import {SourceStatus} from "src/store/types";

export const actionNames = {
    LOAD_REPOS: 'repos/load',
    LOAD_REPOS_RESULT: 'repos/load/result',
    SET_REPO: 'repo/set',
};

export const loadRepos = () => ({
    type: actionNames.LOAD_REPOS,
});

export const resultLoadRepos = (status, items) => ({
    type: actionNames.LOAD_REPOS_RESULT,
    status,
    items,
});

export const setRepo = (key) => ({
    type: actionNames.SET_REPO,
    key,
});

export const fetchRepos = () => async (dispatch, getState) => {
    const state = getState();
    if (state.repos.status !== SourceStatus.INITIAL) {
        return;
    }

    dispatch(loadRepos());
    const url = `${config.apiUrl}repos`;
    const response = await fetch(url);
    if (response.status === 404) {
        dispatch(resultLoadRepos(SourceStatus.NOT_FOUND));
    } else {
        const {repos} = await response.json();
        dispatch(resultLoadRepos(SourceStatus.SUCCESS, repos));
    }
};

export default {...actionNames, fetchRepos, setRepo};