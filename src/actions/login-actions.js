import { authAdapter, groupAdapter } from 'epicenter-libs';
import {
    RECEIVE_USER_SESSION,
    RECEIVE_AVAILABLE_GROUPS,
    LOGOUT,
    handleLoad,
    getWorldAndRun,
    getRunVariables,
    getEditor,
    connectToRunChannel,
} from 'actions';
import { selectUserType } from 'selectors';

export const handleLoggedIn = (session) => async (dispatch, getState) => {
    if (!getState().login.session?.groupKey) {
        dispatch({ type: RECEIVE_USER_SESSION, session });
    }

    const userType = selectUserType(getState());

    if (userType === 'fac') {
        // do fac stuff
    }

    if (userType === 'user') {
        await dispatch(getWorldAndRun());
        await dispatch(getRunVariables());
        await dispatch(getEditor());
        await dispatch(connectToRunChannel());
    }
};

const throwNoGroups = () => {
    const error = new Error('No groups found for given session');
    error.code = 'NO_GROUPS';
    throw error;
};

export const login = () => (dispatch, getState) => {
    const { handle, password, group } = getState().inputs;

    const promise = (async () => {
        const session = await authAdapter.login({
            handle,
            password,
            groupKey: group || undefined,
        });
        if (session.groupKey) {
            return dispatch(handleLoggedIn(session));
        } else if (session.multipleGroups) {
            const groups = await groupAdapter.getSessionGroups();
            if (!groups.length) throwNoGroups();
            return dispatch({ type: RECEIVE_AVAILABLE_GROUPS, groups });
        } else {
            return throwNoGroups();
        }
    })();

    return dispatch(handleLoad(promise, 'Logging in', 'error-login'));
};

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });

    // errorManager (see app.jsx) is configured to
    // attempt session regeneration on 401. However, we don't
    // need to regenerate the session just to log out, so avoid
    // propagating logout-related 401s to errorManager.
    const inert = (fault) => fault.status === 401;
    return authAdapter.logout({ inert }).catch(() => null);
};

let regeneratePromise = null; // one global regenerate attempt
export const regenerateSession = (dispatch, getState) => {
    if (regeneratePromise) return regeneratePromise;
    regeneratePromise = (async () => {
        try {
            const {
                login: { session },
            } = getState();

            const groupKey = session?.groupKey;
            if (!groupKey) throw new Error('No group key');

            await authAdapter
                .regenerate(groupKey, { inert: true })
                .then((session) =>
                    dispatch({ type: RECEIVE_USER_SESSION, session })
                );
        } catch (err) {
            throw err;
        } finally {
            regeneratePromise = null;
        }
    })();
    return dispatch(
        handleLoad(
            regeneratePromise,
            'Regenerating session',
            'error-regenerate'
        )
    );
};
