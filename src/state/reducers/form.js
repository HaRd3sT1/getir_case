import { createReducer } from 'redux-act';

import {
    FORM_DATA,
    FORM_FAIL,
    FORM_START,
    FORM_END
} from '../actions/form';
import { MESSAGE_CLEAR} from "../actions/messages"
const initialState = {};

export const formReducer = createReducer(
  {
    [FORM_DATA]: (state, payload) => {
      return ({ ...state, ...payload })
    },
    [MESSAGE_CLEAR]: (state, payload) => {
      return ({ ...state, 
      message:""
      })
    },
    [FORM_START]: (state, payload) => ({
      ...state,
      loading: true
    }),
    [FORM_END]: (state, payload) => ({
      ...state,
      loading: false
    }),
    [FORM_FAIL]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error
    })
  },
  initialState
);
