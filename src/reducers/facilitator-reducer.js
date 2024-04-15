import {
    LOGOUT,
    RECEIVE_USER_LIST,
    RECEIVE_WORLD_LIST,
    RECEIVE_PERSONAS,
} from 'actions';

const initialState = {
    users: [],
    worlds: [],
    personas: [],
};

export function facilitator(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_PERSONAS:
            return {
                ...state,
                personas: action.personas,
            };
        case RECEIVE_USER_LIST:
            return {
                ...state,
                users: action.users,
            };
        case RECEIVE_WORLD_LIST:
            return {
                ...state,
                worlds: action.worlds,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
