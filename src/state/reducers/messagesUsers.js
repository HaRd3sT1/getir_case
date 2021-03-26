import { createReducer } from 'redux-act';

import {
    MESSAGES_USERS,
} from '../actions/messagesUsers';

const initialState = {};

export const messagesUsers = createReducer(
    {
        [MESSAGES_USERS]: (state, payload) => {
        return({
            ...state,
            ...payload
        })
        }
    },
    initialState
);
