import { createReducer } from 'redux-act';

import {
    ONLINE_USERS,
} from '../actions/onlineUsers';

const initialState = {};

export const onlineUsers = createReducer(
    {
        [ONLINE_USERS]: (state, payload) => {
            return ({ ...state, list: payload })
        },
    },
    initialState
);
