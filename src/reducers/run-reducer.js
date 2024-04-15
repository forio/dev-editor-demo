import { RECEIVE_RUN, LOGOUT } from 'actions';

const initialState = {};

export function run(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_RUN:
            return action.run;
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
