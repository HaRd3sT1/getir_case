import { createReducer } from 'redux-act';

import {
    USERS_INIT,
    USERS_FAIL,
    PROFILE_USERS,
    TWO_USERS_SUCCESS,
    USERS_RESET
} from '../actions/users';


const initialState = {};

export const users = createReducer(
  {
    [USERS_INIT]: (state, payload) => {
      return({
        ...state,
        loading: true
      })
    },
    [USERS_RESET]: (state, payload) => {
      return({
        loading: false
      })
    },
    [USERS_FAIL]: (state, payload) => {
      return({
        ...state,
        loading: false
      })
    },
    [TWO_USERS_SUCCESS]: (state, payload) => {
      return({
        ...state,
        twoUsers: payload.twoUsers,
        loading: false
      })
    },
    [PROFILE_USERS]: (state, payload) => {
      return({
        ...state,
        ...payload,
        loading: false
      })
    }
  },
  initialState
);
