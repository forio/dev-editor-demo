import { SET_ERROR, LOGOUT } from 'actions';

const initialState = [];

function handleAddError(state, type) {
    const errIdx = state.indexOf(type);
    if (errIdx > -1) {
        return [...state.slice(0, errIdx), ...state.slice(errIdx + 1), type];
    }
    return [...state, type];
}

function handleRemoveError(state, type) {
    if (!state.length) {
        return state;
    }

    const idx = state.indexOf(type);
    if (idx < 0) {
        return state;
    }
    const list = [...state];
    list.splice(idx, 1);
    return list;
}

export function errors(state = initialState, action) {
    switch (action.type) {
        case SET_ERROR:
            return action.errorType
                ? handleAddError(state, action.errorType)
                : handleRemoveError(state, action.errorType);
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
