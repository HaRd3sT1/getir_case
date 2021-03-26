import { createReducer } from 'redux-act';

import {
    FRIENDS_DATA,
    WAITING_FRIENDS_DATA
} from '../actions/friends';

const initialState = {};

export const friendsReducer = createReducer(
    {
        [FRIENDS_DATA]: (state, payload) => {
        return({
            ...state,
            list: payload.friends
        })
        },
        [WAITING_FRIENDS_DATA]: (state, payload) => {
        return({
            ...state,
            waiting: payload.friends
        })
        },
    },
    initialState
);
