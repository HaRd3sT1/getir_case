import { createReducer } from 'redux-act';

import {
    DASHBOARD_FAIL,
    DASHBOARD_START,
    NOTICES_DELETE,
    MATCHS,
    MATCH_POPUP,
    DASHBOARD_FAIL_CLEAR,
    MOBILE_TOGGLE,
    MAIN_USERS_DATA,
    CLEAR_DASHBOARD,
    MOBILE_USER_LIST,
    VIP_USERS,
    DASHBOARD_END
} from '../actions/dashboard';

const initialState = {};

export const dashboardReducer = createReducer(
    {
        [CLEAR_DASHBOARD]: (state, payload) => {
            return ({ ...initialState})
        },
        [VIP_USERS]: (state, payload) => {
            return ({ ...state, vipUsers: payload })
        },
        [NOTICES_DELETE]: (state, payload) => {
            return ({ ...state, notices: payload })
        },
        [MATCHS]: (state, payload) => {
            return ({ ...state, matchs: payload })
        },
        [MATCH_POPUP]: (state, payload) => {
            return ({ ...state, matchPopup: payload })
        },
        [DASHBOARD_START]: (state, payload) => ({
            ...state,
            loading: true
        }),
        [DASHBOARD_END]: (state, payload) => ({
            ...state,
            loading: false
        }),
        [MOBILE_TOGGLE]: (state, payload) => ({
            ...state,
            mobileToggle: payload
        }),
        [MAIN_USERS_DATA]: (state, payload) => {
            return ({
                ...state,
                loading: false,
                searchUsers: payload
            })
        },
        [MOBILE_USER_LIST]: (state, payload) => {
            return ({
                ...state,
                mobileList: payload
            })
        },
        [DASHBOARD_FAIL]: (state, payload) => ({
            ...state,
            loading: false,
            error: payload
        }),
        [DASHBOARD_FAIL_CLEAR]: (state, payload) => ({
            ...state,
            loading: false,
            error: ""
        })
    },
    initialState
);
