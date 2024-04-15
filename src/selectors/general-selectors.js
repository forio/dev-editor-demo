import { createSelector } from 'reselect';

export const selectSession = (state) => state.login.session;
export const selectAvailableGroups = (state) => state.login.availableGroups;
export const selectRouterSearch = (state) => state.router.location.search;
export const selectPersonas = (state) => state.facilitator.personas;
export const selectUsers = (state) => state.facilitator.users;
export const selectWorlds = (state) => state.facilitator.worlds;
export const selectRun = (state) => state.run;
export const selectRunKey = (state) => state.run?.runKey;
export const selectStep = (state) => state.model.Step || 0;
export const selectVariables = (state) => state.model;
export const selectWorld = (state) => state.world;
export const selectWorldKey = (state) => state.world?.worldKey;

export const selectModalOpen = (name) => (state) => state.modal[name];

export const selectLoginRequired = createSelector(
    selectSession,
    (session) => !session?.token || !session.groupKey
);

export const selectUserType = createSelector(
    selectSession,
    selectLoginRequired,
    (session, loginRequired) => {
        if (loginRequired) return 'none';
        if (session.objectType === 'admin') return 'admin';
        if (session.groupRole?.toUpperCase() === 'FACILITATOR') return 'fac';
        return 'user';
    }
);

export const selectSearch = createSelector(
    selectRouterSearch,
    (searchString) => {
        if (!searchString || searchString.charAt(0) !== '?') return {};
        return searchString
            .slice(1)
            .split('&')
            .reduce((search, pair) => {
                const [key, value] = pair.split('=');
                search[key] = value;
                return search;
            }, {});
    }
);

export const selectStepVariables = createSelector(
    selectStep,
    selectVariables,
    (step, vars) => {
        const stepVars = {};
        Object.keys(vars).forEach((v) => {
            if (Array.isArray(vars[v])) {
                stepVars[v] = vars[v][step];
            } else {
                stepVars[v] = vars[v];
            }
        });
        return stepVars;
    }
);

export const selectEditor = createSelector(
    selectRun,
    selectWorld,
    (run, world) => {
        let editor = 'No one';
        if (run?.editor) {
            world?.assignments?.some((u) => {
                if (u?.user?.userKey === run?.editor) {
                    editor = u?.user?.displayName;
                    return true;
                }
            });
        }
        return editor;
    }
);

export const selectAmIEditor = createSelector(
    selectRun,
    selectSession,
    (run, session) => {
        return run?.editor === session?.userKey;
    }
);
