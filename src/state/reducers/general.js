import { createReducer } from 'redux-act';

import {
    GENERAL_DATA,
    INFO_DATA,
    PRIZE_DATA,
    GENERAL_INIT,
    GENERAL_ERROR,
    SITE_DATA,
  PACKETS_DATA,
  FAQ_DATA,
  ONLINE_DATA,
  SET_COIN,
  GIFTS_DATA,
    TOTAL_DATA
} from '../actions/general';
import { COINS_DATA} from "../actions/auth"
const initialState = {};

export const generalDataReducer = createReducer(
  {
    [GENERAL_INIT]: (state, payload) => {
      return({
        ...initialState,
        loading: true
      })
    },
    [GENERAL_DATA]: (state, payload) => {
      return({
        ...state,
        general: payload,
        loading: false
      })
    },
    [GIFTS_DATA]: (state, payload) => {
      return({
        ...state,
        gifts: payload,
      })
    },
    [ONLINE_DATA]: (state, payload) => {
      return({
        ...state,
        onlineUsers: payload,
      })
    },
    [SET_COIN]: (state, payload) => {
      return({
        ...state,
        setCoin: payload,
      })
    },
    [INFO_DATA]: (state, payload) => {
      return({
        ...state,
        info: payload,
        loading: false
      })
    },
    [COINS_DATA]: (state, payload) => {
      return({
        ...state,
        coins: {
          messageCoin: payload.messageCoin,
          gifCoin: payload.gifCoin,
          messagePhotoCoin: payload.messagePhotoCoin,
          photoCoin: payload.photoCoin,
          profilePhotoCoin: payload.profilePhotoCoin
        },
      })
    },
    [PRIZE_DATA]: (state, payload) => {
      return({
        ...state,
        prize: payload,
        loading: false
      })
    },
    [PACKETS_DATA]: (state, payload) => {
      return({
        ...state,
        packets: payload,
        loading: false
      })
    },
    [TOTAL_DATA]: (state, payload) => {
      return({
        ...state,
        length: payload,
        loading: false
      })
    },
    [SITE_DATA]: (state, payload) => {
      return({
        ...state,
        site: payload
      })
    },
    [FAQ_DATA]: (state, payload) => {
      return({
        ...state,
        faq: payload
      })
    },
    [GENERAL_ERROR]: (state, payload) => {
      return({
        ...state,
        loading: false
      })
    },
  },
  initialState
);
