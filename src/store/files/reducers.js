import {SourceStatus} from "src/store/types";
import {actionNames} from "./actions";

const initialState = {
    items: [],
    status: SourceStatus.INITIAL,
};

const filesReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case actionNames.LOAD_FILES: {
            return Object.assign({}, state, {
                status: SourceStatus.LOADING,
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
                itemStatus: SourceStatus.LOADING,
            });
        }
        case actionNames.LOAD_FILE_RESULT: {
            return Object.assign({}, state, {
                itemStatus: action.status,
                item: action.item,
                name: action.name,
            });
        }
        case actionNames.SET_PATH: {
            return Object.assign({}, state, {
                path: action.path.split('/').filter(item => item),
            })
        }
        default: {
            return state;
        }
    }
};

export default filesReducer;