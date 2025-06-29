import { RECEIVE_RUN, UPDATE_RUN_METADATA, LOGOUT } from 'actions';

const initialState = {};

export function run(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_RUN:
            return action.run;
        case UPDATE_RUN_METADATA:
            return {
                ...state,
                ...action.payload,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
