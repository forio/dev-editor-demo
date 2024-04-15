import { runAdapter, SCOPE_BOUNDARY } from 'epicenter-libs';
import { RECEIVE_RUN } from 'actions';
import { MODEL_FILE } from 'utils';

export const getRun = () => async (dispatch, getState) => {
    const { login } = getState();
    const scope = {
        scopeBoundary: SCOPE_BOUNDARY.GROUP,
        scopeKey: login.session?.groupKey,
    };
    const run = await runAdapter.getWithStrategy(
        'reuse-across-sessions',
        MODEL_FILE,
        scope
    );
    dispatch({ type: RECEIVE_RUN, run });
    return run;
};
