import { runAdapter, worldAdapter } from 'epicenter-libs';
import {
    RECEIVE_RUN,
    RECEIVE_RUN_VARIABLES,
    RECEIVE_WORLD,
    UPDATE_RUN_METADATA,
    handleLoad,
} from 'actions';
import { MODEL_FILE } from 'utils';

const MODEL_VARS = ['Step', 'Time', 'Bike_Sales', 'Price', 'Revenue', 'Profit'];

export const getWorld = () => async (dispatch, getState) => {
    const state = getState();
    const groupName = state.login?.session?.groupName;
    const [world] = await worldAdapter.get({ groupName, mine: true });
    return dispatch({ type: RECEIVE_WORLD, world });
};

export const getWorldRun = () => async (dispatch, getState) => {
    const state = getState();
    const worldKey = state.world?.worldKey;
    const run = await runAdapter.retrieveFromWorld(worldKey, MODEL_FILE);
    return dispatch({ type: RECEIVE_RUN, run });
};

export const getWorldAndRun = () => async (dispatch) => {
    await dispatch(getWorld());
    return await dispatch(getWorldRun());
};

export const getRunVariables = () => async (dispatch, getState) => {
    const state = getState();
    const runKey = state.run?.runKey;
    const variables = await runAdapter.getVariables(runKey, MODEL_VARS);
    return dispatch({ type: RECEIVE_RUN_VARIABLES, variables });
};

export const setRunVariables = (update) => async (dispatch, getState) => {
    const state = getState();
    const { run, login } = state;
    // only let the editor set run variables
    const userIsEditor = run.editor === login.session.userKey;
    if (!userIsEditor) {
        return null;
    }
    const variables = await runAdapter.updateVariables(run?.runKey, update);
    return dispatch({ type: RECEIVE_RUN_VARIABLES, variables });
};

export const setEditor = (editor) => ({
    type: UPDATE_RUN_METADATA,
    payload: { editor },
});

export const becomeEditor = () => async (dispatch, getState) => {
    const state = getState();
    const { run, login } = state;
    const userIsEditor = run.editor === login.session.userKey;
    if (userIsEditor) return;

    const update = { set: { editor: login.session.userKey } };
    const promise = runAdapter
        .updateMetadata(run?.runKey, update)
        .then(({ editor }) => dispatch(setEditor(editor)));

    dispatch(handleLoad(promise));
};

export const getEditor = () => async (dispatch, getState) => {
    const state = getState();
    const runKey = state.run?.runKey;
    try {
        const [editor] = await runAdapter.getMetadata(runKey, ['editor']);
        dispatch(setEditor(editor));
        return editor;
    } catch (e) {
        console.error(e);
        return null;
    }
};
