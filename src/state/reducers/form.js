import { createReducer } from 'redux-act';

import {
    FORM_DATA,
} from '../actions/form';
const initialState = {};

const form = createReducer(
  {
    [FORM_DATA]: (state, payload) => {
      return ({ ...state, ...payload })
    }
  },
  initialState
);

export default form