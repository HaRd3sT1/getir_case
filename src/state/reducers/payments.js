import { createReducer } from 'redux-act';

import {
    LAST_PAYMENT,
} from '../actions/payment';

const initialState = {};

export const paymentsReducer = createReducer(
    {
        [LAST_PAYMENT]: (state, payload) => {
            return ({
                ...payload
            })
        }
    },
    initialState
);
