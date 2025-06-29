import {
    RECEIVE_PERSONAS,
    RECEIVE_USER_LIST,
    RECEIVE_WORLD_LIST,
    handleLoad,
} from 'actions';
import {
    SCOPE_BOUNDARY,
    groupAdapter,
    runAdapter,
    worldAdapter,
} from 'epicenter-libs';
import { MODEL_FILE } from 'utils';
import { RECEIVE_EDITORS } from './actions';

export const getPersonas = () => async (dispatch, getState) => {
    const state = getState();
    const groupKey = state.login?.session?.groupKey;

    const promise = (async () => {
        const personas = await worldAdapter.getPersonas({
            scopeBoundary: SCOPE_BOUNDARY.GROUP,
            scopeKey: groupKey,
        });

        dispatch({ type: RECEIVE_PERSONAS, personas });
        return personas;
    })();

    return dispatch(
        handleLoad(promise, 'Loading personas', 'error-load-personas')
    );
};

export const setPersonas = () => async (dispatch, getState) => {
    const state = getState();
    const groupKey = state.login?.session?.groupKey;

    const personas = [{ role: 'player', minimum: 1, maximum: 5 }];

    const promise = (async () => {
        await worldAdapter.setPersonas(personas, {
            scopeBoundary: SCOPE_BOUNDARY.GROUP,
            scopeKey: groupKey,
        });
        return dispatch(getPersonas());
    })();

    return dispatch(
        handleLoad(promise, 'Setting personas', 'error-set-personas')
    );
};

export const getAllUsers = () => async (dispatch) => {
    const promise = (async () => {
        const users = await groupAdapter.get({ augment: 'MEMBERS' });

        const members = users?.members?.filter(
            (u) => u?.role === 'participant'
        );

        dispatch({ type: RECEIVE_USER_LIST, users: members });
        return users;
    })();

    return dispatch(handleLoad(promise, 'Loading users', 'error-load-users'));
};

export const getAllWorlds = () => async (dispatch) => {
    const promise = (async () => {
        const worlds = await worldAdapter.get();

        dispatch({ type: RECEIVE_WORLD_LIST, worlds });
        return worlds;
    })();

    return dispatch(handleLoad(promise, 'Loading worlds', 'error-load-worlds'));
};

export const clearAllWorlds = () => async (dispatch, getState) => {
    const promise = (async () => {
        const state = getState();
        await dispatch(getAllUsers());
        const {
            facilitator: { users },
        } = state;
        const userKeys = users.map((u) => u?.userKey || u?.user?.userKey);
        await worldAdapter.removeUsers(userKeys, { keepEmptyWorlds: false });
        return dispatch(getAllWorlds());
    })();

    return dispatch(
        handleLoad(promise, 'Clearing worlds', 'error-clear-worlds')
    );
};

export const getAllEditors = () => async (dispatch, getState) => {
    const promise = (async () => {
        const state = getState();
        const worlds = state.facilitator?.worlds;
        const runQuery = await runAdapter.query(MODEL_FILE, {
            filter: ['run.hidden=false'], // don't include runs taht we've marked as "hidden" (meaning we discarded them and created a new run)
            metadata: ['editor'], // include the run metadata for 'editor' in the response for each run
        });
        // if we have a lot of runs, we need them all, so use the .all function
        if (runQuery.totalResults > runQuery.resultSize) {
            const runs = await runQuery.all();
            dispatch({ type: RECEIVE_EDITORS, runs });
        } else {
            dispatch({ type: RECEIVE_EDITORS, runs: runQuery.values });
        }
    })();

    return dispatch(
        handleLoad(promise, 'Getting editors', 'error-get-editors')
    );
};

export const autoAssignUsers = () => async (dispatch, getState) => {
    const state = getState();
    const users = state.facilitator?.users;
    const userList = users.map((u) => ({
        userKey: u?.userKey || u?.user?.userKey,
    }));
    const promise = (async () => {
        await worldAdapter.autoAssignUsers(userList, {
            objective: 'MAXIMUM',
        });
        return dispatch(getAllWorlds());
    })();

    return dispatch(
        handleLoad(
            promise,
            'Auto assigning users',
            'error-auto-assigning-users'
        )
    );
};

export const resetWorld = (world) => async (dispatch) => {
    if (!world || !world?.runKey || !world?.worldKey) {
        return null;
    }

    const promises = [
        runAdapter.update(world.runKey, { hidden: true }),
        runAdapter.removeFromWorld(world.worldKey),
    ];
    await Promise.all(promises);
    return dispatch(getAllWorlds());
};
