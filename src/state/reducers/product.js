import { createReducer } from 'redux-act';

import {
    PRODUCTS_DATA
} from '../actions/product';
const initialState = {};

const product = createReducer(
  {
    [PRODUCTS_DATA]: (state, payload) => {
        return ({ 
            ...state,
            mug_list:payload.mug_list,
            mug_brands:payload.mug_brands,
            mug_tags:payload.mug_tags,
            shirt_list:payload.shirt_list,
            shirt_brands:payload.shirt_brands,
            shirt_tags:payload.shirt_tags,
        })
    }
  },
  initialState
);

export default product
