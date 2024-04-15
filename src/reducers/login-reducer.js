import { authAdapter } from 'epicenter-libs';
import {
    RECEIVE_USER_SESSION,
    RECEIVE_AVAILABLE_GROUPS,
    LOGOUT,
} from 'actions';

const localSession = authAdapter.getLocalSession();

const initialState = {
    availableGroups: [],
    session: localSession,
};

export function login(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USER_SESSION:
            return {
                ...state,
                session: action.session,
            };
        case RECEIVE_AVAILABLE_GROUPS:
            return {
                ...state,
                availableGroups: action.groups,
            };
        case LOGOUT:
            return {
                ...initialState,
                session: null,
            };
        default:
            return state;
    }
}
