import {SourceStatus} from "src/store/types";
import {actionNames} from "./actions";

const initialState = {
    items: [],
    status: SourceStatus.INITIAL,
};

const reposReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case actionNames.LOAD_REPOS: {
            return Object.assign({}, state, {
                status: SourceStatus.LOADING,
            });
        }
        case actionNames.LOAD_REPOS_RESULT: {
            return Object.assign({}, state, {
                status: action.status,
                items: action.items,
            });
        }
        case actionNames.SET_REPO: {
            return Object.assign({}, state, {
                item: action.key,
            });
        }
        default: {
            return state;
        }
    }
};

export default reposReducer;