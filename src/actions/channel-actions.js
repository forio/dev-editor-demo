import { Channel, PUSH_CATEGORY, SCOPE_BOUNDARY } from 'epicenter-libs';
import { setEditor, getRunVariables } from 'actions';

export const connectToRunChannel = () => async (dispatch, getState) => {
    const state = getState();
    const worldKey = state?.world?.worldKey;

    return await new Channel({
        scopeBoundary: SCOPE_BOUNDARY.WORLD,
        scopeKey: worldKey,
        pushCategory: PUSH_CATEGORY.RUN,
    }).subscribe(async (data) => {
        const { type, content } = data;
        switch (type) {
            case 'META':
                if (content.result.editor) {
                    dispatch(setEditor(content.result.editor));
                }
                break;
            case 'STATE':
                if (content.actions.some(({ name }) => name === 'Step')) {
                    await dispatch(getRunVariables());
                }
                break;
            default:
                break;
        }
    });
};
