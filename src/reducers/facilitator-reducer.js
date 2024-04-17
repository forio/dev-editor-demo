import {
    LOGOUT,
    RECEIVE_USER_LIST,
    RECEIVE_WORLD_LIST,
    RECEIVE_PERSONAS,
    RECEIVE_EDITORS,
} from 'actions';

const initialState = {
    users: [],
    worlds: [],
    personas: [],
};

function handleMergeEditorsIntoWorlds(state, runs) {
    const copy = JSON.parse(JSON.stringify(state));
    runs.forEach((run) => {
        const world = copy.worlds.find((w) => w.runKey === run.runKey) || {};
        world.editor = run.metaData?.[0];
    });
    return copy;
}

export function facilitator(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_PERSONAS:
            return {
                ...state,
                personas: action.personas,
            };
        case RECEIVE_USER_LIST:
            return {
                ...state,
                users: action.users,
            };
        case RECEIVE_WORLD_LIST:
            return {
                ...state,
                worlds: action.worlds,
            };
        case RECEIVE_EDITORS:
            return handleMergeEditorsIntoWorlds(state, action.runs);
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
