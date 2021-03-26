import { createReducer } from 'redux-act';

import {
    LAST_USERS,
} from '../actions/lastUsers';

const initialState = {};

export const lastUsers = createReducer(
    {
        [LAST_USERS]: (state, payload) => {
            return ({ ...state, list: payload })
        },
    },
    initialState
);
