import React from 'react';
import 'css/main.scss';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducers from 'reducers';

const store = createStore(combineReducers(reducers));

export const decorators = [
    (Story) => (
        <Provider store={store}>
            <Story />
        </Provider>
    ),
];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
