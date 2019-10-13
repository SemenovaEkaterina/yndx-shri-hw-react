import { SourceStatus } from '../types';

export interface ReposStateI {
  items: string[];
  status: SourceStatus;
  item?: string;
}

// Actions

export const LOAD_REPOS = 'repos/load';
export const LOAD_REPOS_RESULT = 'repos/load/result';
export const SET_REPO = 'repo/set';

export interface LoadReposI {
  type: typeof LOAD_REPOS;
}

export interface ResultLoadReposI {
  type: typeof LOAD_REPOS_RESULT;
  status: SourceStatus;
  items?: string[];
}

export interface SetRepoI {
  type: typeof SET_REPO;
  key: string;
}

export type ReposActionTypes = LoadReposI | ResultLoadReposI | SetRepoI;
