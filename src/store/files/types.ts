import { SourceStatus } from '../types';

export type FileI = string;

export interface SourceI {
  author: string;
  type: string;
  commit: string;
  name: string;
}

export interface CommitI {
  author: string;
  time: string;
  hash: string;
}

export interface FilesState {
  items: SourceI[];
  status: SourceStatus;
  last?: CommitI;
  path: string[];
  item?: FileI;
  itemStatus: SourceStatus;
  name?: string;
}

// Actions

export const LOAD_FILE = 'file/load';
export const LOAD_FILES = 'files/load';
export const LOAD_FILES_RESULT = 'files/load/result';
export const LOAD_FILE_RESULT = 'file/load/result';
export const SET_PATH = 'path/set';

export interface LoadFilesI {
  type: typeof LOAD_FILES;
}

export interface ResultLoadFilesI {
  type: typeof LOAD_FILES_RESULT;
  status: SourceStatus;
  items?: SourceI[];
  last?: CommitI;
}

export interface LoadFileI {
  type: typeof LOAD_FILE;
  repoId: string;
}

export interface ResultLoadFileI {
  type: typeof LOAD_FILE_RESULT;
  status: SourceStatus;
  item?: FileI;
  name?: string;
}

export interface SetPathI {
  type: typeof SET_PATH;
  path: string;
}

export type FileActionTypes = LoadFilesI | ResultLoadFilesI | LoadFileI | ResultLoadFileI | SetPathI;
