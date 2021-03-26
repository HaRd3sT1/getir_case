import { createReducer } from 'redux-act';

import {
    ADMIN_MESSAGES,
    MESSAGES_LIST_DATA,
    MESSAGES_LIST_RESET,
    TOTAL_NEW_MESSAGES
} from '../actions/messagesList';

const initialState = {};

export const messagesList = createReducer(
    {
        [ADMIN_MESSAGES]: (state, payload) => {
            return ({ ...state, adminMessages: payload })
        },
        [MESSAGES_LIST_DATA]: (state, payload) => ({
            ...state,
            list: payload
        }),
        [MESSAGES_LIST_RESET]: (state, payload) => ({
            list: []
        }),
        [TOTAL_NEW_MESSAGES]: (state, payload) => ({
            ...state,
            totalNewMessages: payload,
            error: ""
        })
    },
    initialState
);
