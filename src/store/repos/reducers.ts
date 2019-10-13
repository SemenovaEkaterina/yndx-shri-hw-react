import {SourceStatus} from 'src/store/types';
import {
    LOAD_REPOS,
    LOAD_REPOS_RESULT,
    ReposActionTypes, ReposStateI,
    SET_REPO,
} from './types';

const initialState: ReposStateI = {
    items: [],
    status: SourceStatus.INITIAL,
};

const reposReducer = (
    state = initialState,
    action: ReposActionTypes,
) => {
    switch (action.type) {
        case LOAD_REPOS: {
            return Object.assign({}, state, {
                status: SourceStatus.LOADING,
            });
        }
        case LOAD_REPOS_RESULT: {
            return Object.assign({}, state, {
                status: action.status,
                items: action.items,
            });
        }
        case SET_REPO: {
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