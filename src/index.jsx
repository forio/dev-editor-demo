import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk';
import { config, DEFAULT_ERROR_HANDLERS } from 'epicenter-libs';
import 'utils';
import reducers from 'reducers';
import App from './app';
import { selectLoginRequired } from 'selectors/general-selectors';
import { handleLoggedIn } from 'actions/login-actions';

const middleware = [thunk];
let composeEnhancers = compose;

if (config.isLocal()) {
    middleware.push(createLogger({}));
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
}

const store = createStore(
    combineReducers(Object.assign({}, reducers)),
    composeEnhancers(applyMiddleware(...middleware))
);

const { dispatch, getState } = store;
const state = getState();
const loginRequired = selectLoginRequired(state);
if (!loginRequired) dispatch(handleLoggedIn(state.login.session));

const container = document.getElementById('app');
const root = createRoot(container);

const { authInvalidated, authExpired, authGroupExpired } =
    DEFAULT_ERROR_HANDLERS;
[authInvalidated, authExpired, authGroupExpired].forEach(({ unregister }) =>
    unregister()
);

root.render(
    <StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </StrictMode>
);
