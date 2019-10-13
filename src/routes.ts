import { Dispatch } from 'redux';
import { AppState } from './store';
import {fetchFile, fetchFiles} from './store/files/actions';
import {fetchRepos} from './store/repos/actions';

type LoadDataI = (
  dispatch: Dispatch, getState: () => AppState, params?: {[key: string]: string | undefined },
  ) => Promise<{url?: string}>;
export interface RouteI {
    path: string;
    create: (...args: Array<string | number>) => string;
    loadData: LoadDataI;
    isExact: boolean;
}

const routes: {[key: string]: RouteI} = {
    INDEX: {
        path: '/',
        create: () => '/',
        loadData: async (dispatch, getState) => {
            await fetchRepos('')(dispatch, getState, null);
            const repoId = getState().repos.item;
            if (repoId) {
                await fetchFiles(repoId)(dispatch, getState, null);
                return {url: `/${repoId}`};
            }
            return {};
        },
        isExact: true,
    },
    ROOT: {
        path: '/:repoId',
        create: (repoId) => `/${repoId}`,
        loadData: async (dispatch, getState, params = {}) => {
            const {repoId} = params;
            await fetchRepos(repoId)(dispatch, getState, null);
            // !, иначе роут не совпадет
            await fetchFiles(repoId!)(dispatch, getState, null);
            return {};
        },
        isExact: true,
    },
    NOT_FOUND: {
        path: '/404',
        create: () => '/404',
        loadData: async () => {
            return {};
        },
        isExact: true,
    },
    TREE: {
        path: `/:repoId/tree/:path*/`,
        create: (repoId, path = '') => `/${repoId}` + (path ? `/tree/${path}` : ''),
        loadData: async (dispatch, getState, params = {}) => {
            const {repoId, path} = params;
            await fetchRepos(repoId)(dispatch, getState, null);
            // !, иначе роут не совпадет
            await fetchFiles(repoId!, path)(dispatch, getState, null);
            return {};
        },
        isExact: true,
    },
    BLOB: {
        path: `/:repoId/blob/:path*/`,
        create: (repoId, path) => `/${repoId}/blob/${path}`,
        loadData: async (dispatch, getState, params = {}) => {
            const {repoId, path} = params;
            await fetchRepos(repoId)(dispatch, getState, null);
            // !, иначе роут не совпадет
            await fetchFile(repoId!, path!)(dispatch, getState, null);
            return {};
        },
        isExact: true,
    },
};

export default routes;
