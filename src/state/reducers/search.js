import { createReducer } from 'redux-act';

import {
    SEARCH_USERS_DATA,
    SEARCH_USERS_DATA_ASC,
    SEARCH_USERS_DATA_RESET,
    SEARCH_USERS_DATA_RESET_SIZE,
} from '../actions/search';

const initialState = {};

export const search = createReducer(
    {
        [SEARCH_USERS_DATA_RESET]: (state, payload) => ({
            ...state,
            list: []
        }),
        [SEARCH_USERS_DATA_RESET_SIZE]: (state, payload) => ({
            ...state,
            list: payload
        }),
        [SEARCH_USERS_DATA]: (state, payload) => {
            return ({
                ...state,
                list: state.list && payload ? state.list.concat(payload) : payload ? payload : state.list ? state.list : []
            })
        },
        [SEARCH_USERS_DATA_ASC]: (state, payload) => {
            return ({
                ...state,
                list: payload && state.list ? payload.concat(state.list) : payload ? payload : state.list ? state.list : []
            })
        },
    },
    initialState
);
