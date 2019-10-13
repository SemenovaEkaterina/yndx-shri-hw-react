import { SourceStatus } from 'src/store/types';
import {
    FileActionTypes,
    FilesState,
    LOAD_FILE,
    LOAD_FILE_RESULT,
    LOAD_FILES,
    LOAD_FILES_RESULT,
    SET_PATH,
} from './types';

const initialState: FilesState = {
    items: [],
    status: SourceStatus.INITIAL,
    path: [],
    itemStatus: SourceStatus.INITIAL,
};

const filesReducer = (
    state = initialState,
    action: FileActionTypes,
): FilesState => {
    switch (action.type) {
        case LOAD_FILES: {
            return Object.assign({}, state, {
                status: SourceStatus.LOADING,
            });
        }
        case LOAD_FILES_RESULT: {
            return Object.assign({}, state, {
                status: action.status,
                items: action.items,
                last: action.last,
            });
        }
        case LOAD_FILE: {
            return Object.assign({}, state, {
                itemStatus: SourceStatus.LOADING,
            });
        }
        case LOAD_FILE_RESULT: {
            return Object.assign({}, state, {
                itemStatus: action.status,
                item: action.item,
                name: action.name,
            });
        }
        case SET_PATH: {
            return Object.assign({}, state, {
                path: (action.path || '').split('/').filter((item) => item),
            });
        }
        default: {
            return state;
        }
    }
};

export default filesReducer;