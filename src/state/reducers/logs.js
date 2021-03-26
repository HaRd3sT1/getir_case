import { createReducer } from 'redux-act';

import {
    LOG_DATA,
    LOG_ID,
} from '../actions/logs';

const initialState = {};

export const logsReducer = createReducer(
    {
        [LOG_DATA]: (state, payload) => {
            return ({
                ...state,
                logs: state.users.concat(payload.data)
            })
        },
        [LOG_ID]: (state, payload) => {
            return ({
                ...state,
                id: payload.id
            })
        }
    },
    initialState
);
