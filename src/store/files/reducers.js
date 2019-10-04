import {FilesStatus} from "./types";
import {actionNames} from "./actions";

const initialState = {
    items: [],
    status: FilesStatus.INITIAL,
};

const filesReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case actionNames.LOAD_FILES: {
            return Object.assign({}, state, {
                status: FilesStatus.LOADING,
            });
        }
        case actionNames.LOAD_FILES_RESULT: {
            return Object.assign({}, state, {
                status: action.status,
                items: action.items,
                last: action.last,
            });
        }
        case actionNames.LOAD_FILE: {
            return Object.assign({}, state, {
                itemStatus: FilesStatus.LOADING,
            });
        }
        case actionNames.LOAD_FILE_RESULT: {
            return Object.assign({}, state, {
                itemStatus: action.status,
                item: action.item,
            });
        }
        default: {
            return state;
        }
    }
};

export default filesReducer;