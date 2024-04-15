import { RECEIVE_WORLD } from 'actions';

const initialState = {};

export function world(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_WORLD:
            return Object.assign({}, state, action.world);
        default:
            return state;
    }
}
