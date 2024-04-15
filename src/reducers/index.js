import { errors } from 'reducers/error-reducer';
import { loading } from 'reducers/loading-reducer';
import { inputs } from 'reducers/input-reducer';
import { login } from 'reducers/login-reducer';
import { facilitator } from 'reducers/facilitator-reducer';
import { run } from 'reducers/run-reducer';
import { model } from 'reducers/model-reducer';
import { modal } from 'reducers/modal-reducer';
import { settings } from 'reducers/settings-reducer';

const reducerList = {
    errors,
    facilitator,
    loading,
    inputs,
    login,
    run,
    model,
    modal,
    settings,
};

export default reducerList;
