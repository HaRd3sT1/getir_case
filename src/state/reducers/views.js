import { createReducer } from 'redux-act';

import {
    VIEWS_DATA
} from '../actions/views';

const initialState = {};

export const viewsReducer = createReducer(
    {
        [VIEWS_DATA]: (state, payload) => {
            return ({
                list: payload
            })
        },
    },
    initialState
);
