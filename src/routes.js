import {fetchRepos} from "./store/repos/actions";
import {fetchFile, fetchFiles} from "./store/files/actions";

export default {
    INDEX: {
        path: '/',
        create: () => '/',
        loadData: async (dispatch, getState) => {
            await fetchRepos('')(dispatch, getState);
            const repoId = getState().repos.item;
            if (repoId) {
                await fetchFiles(repoId)(dispatch, getState);
                return {url: `/${repoId}`};
            }
            return {};
        },
        isExact: true
    },
    ROOT: {
        path: '/:repoId',
        create: (repoId) => `/${repoId}`,
        loadData: async (dispatch, getState, params) => {
            const {repoId} = params;
            await fetchRepos(repoId)(dispatch, getState);
            await fetchFiles(repoId)(dispatch, getState);
            return {};
        },
        isExact: true
    },
    NOT_FOUND: {
        path: '/404',
        create: () => '/404',
        loadData: () => {
            return {};
        },
        isExact: true
    },
    TREE: {
        path: `/:repoId/tree/:path*/`,
        create: (repoId, path = '') => `/${repoId}` + (path ? `/tree/${path}` : ''),
        loadData: async (dispatch, getState, params) => {
            const {repoId, path} = params;
            await fetchRepos(repoId)(dispatch, getState);
            await fetchFiles(repoId, path)(dispatch, getState);
            return {};
        },
        isExact: true,
    },
    BLOB: {
        path: `/:repoId/blob/:path*/`,
        create: (repoId, path) => `/${repoId}/blob/${path}`,
        loadData: async (dispatch, getState, params) => {
            const {repoId, path} = params;
            await fetchRepos(repoId)(dispatch, getState);
            await fetchFile(repoId, path)(dispatch, getState);
            return {};
        },
        isExact: true
    },
};