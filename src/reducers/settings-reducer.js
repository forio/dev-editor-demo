import { 
    RECEIVE_SETTINGS,
    LOGOUT,
} from 'actions';

const initialState = {};

export function settings(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_SETTINGS:
            return {
                ...state,
                ...action.settings,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}