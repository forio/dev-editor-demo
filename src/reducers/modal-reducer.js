import { UPDATE_MODAL, LOGOUT } from 'actions';

const initialState = {};

export function modal(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MODAL:
            return { ...state, [action.name]: action.open };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
