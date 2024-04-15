import { UPDATE_MODAL } from 'actions';

const setModal = (name, open) => ({
    type: UPDATE_MODAL,
    name,
    open,
});

export const openModal = (name, truthy) => (dispatch) =>
    dispatch(setModal(name, truthy || true));
export const closeModal = (name) => (dispatch) =>
    dispatch(setModal(name, false));
