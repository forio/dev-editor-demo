import { RECEIVE_RUN_VARIABLES, LOGOUT } from 'actions';

const initialState = {};

export function model(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_RUN_VARIABLES:
            return { ...state, ...action.variables };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
