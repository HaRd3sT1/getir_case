import { createReducer } from 'redux-act';

import {
    FAVS_DATA_ADD,
    FAVS_RESET,
    FAVS_DATA_ADD_FIRST,
    FAVS_DATA_FULL,
    FAVS_LIST,
    FAVS_START,
    FAVS_END,
} from '../actions/favs';

const initialState = {};

export const favsReducer = createReducer(
    {
        [FAVS_DATA_ADD]: (state, payload) => {
            return ({
                ...state,
                users: state.users ? state.users.concat(payload.data) : [payload.data]
            })
        },
        [FAVS_DATA_ADD_FIRST]: (state, payload) => {
            return ({
                ...state,
                list:payload.list,
                // users: payload.data ? payload.data.concat(state.users) : [state.users]
            })
        },
        [FAVS_START]: (state, payload) => {
            return ({
                ...state,
                loading: true
            })
        },
        [FAVS_END]: (state, payload) => {
            return ({
                ...state,
                loading: false
            })
        },
        [FAVS_DATA_FULL]: (state, payload) => {
            return ({
                ...state,
                users: payload
            })
        },
        [FAVS_LIST]: (state, payload) => {
            return ({ 
                // ...state,
                list:payload.list,
                lastTime: payload.lastTime,
                loading: false
            })
        },
        [FAVS_RESET]: (state, payload) => {
            return ({
                users: []
            })
        },
    },
    initialState
);
