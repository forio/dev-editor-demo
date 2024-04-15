import { createSelector } from 'reselect';

export const selectSession = (state) => state.login.session;
export const selectAvailableGroups = (state) => state.login.availableGroups;
export const selectRouterSearch = (state) => state.router.location.search;
export const selectPersonas = (state) => state.facilitator.personas;
export const selectUsers = (state) => state.facilitator.users;
export const selectWorlds = (state) => state.facilitator.worlds;

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
