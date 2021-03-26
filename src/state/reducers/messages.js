import { createReducer } from 'redux-act';

import {
    MESSAGES_FAIL,
    ACTIVE_MESSAGES_LIST_DATA,
    ACTIVE_MESSAGES_DATA,
    MESSAGES_CLOSE,
    MESSAGES_DATA_RESET,
    MESSAGES_DATA_RESET_2,
    IMAGE_UPLOAD_START,
    IMAGE_UPLOAD_END,
    MESSAGE_IMAGE_DELETE,
    MESSAGE_CLEAN_ERROR,
    MESSAGE_STATUS
} from '../actions/messages';

const initialState = {};

export const messagesReducer = createReducer(
    {
        [MESSAGE_STATUS]: (state, payload) => {
            return ({ ...state, status: payload })
        },
        [IMAGE_UPLOAD_START]: (state, payload) => ({
            ...state,
            loading: true,
            sendImageSize: payload
        }),
        [IMAGE_UPLOAD_END]: (state, payload) => ({
            ...state,
            loading: false,
            sendImage: payload
        }),
        [MESSAGE_IMAGE_DELETE]: (state, payload) => ({
            ...state,
            sendImage: "",
            sendImageSize: ""
        }),
        [ACTIVE_MESSAGES_DATA]: (state, payload) => ({
            ...state,
            activeData: payload.data
        }),
        [ACTIVE_MESSAGES_LIST_DATA]: (state, payload) => ({
            ...state,
            activeList: payload.data
        }),
        [MESSAGES_DATA_RESET]: (state, payload) => ({
            ...state,
            sendImageSize:"",
            sendImage:"",
            activeData: [],
            activeList: [],
        }),
        [MESSAGES_CLOSE]: (state, payload) => ({
            ...state,
            status:"",
        }),
        [MESSAGES_DATA_RESET_2]: (state, payload) => ({
            sendImageSize:"",
            sendImage:"",
            activeData: [],
            activeList: [],
        }),
        [MESSAGES_FAIL]: (state, payload) => ({
            ...state,
            error: payload
        }),
        [MESSAGE_CLEAN_ERROR]: (state, payload) => ({
            ...state,
            error: ""
        })
    },
    initialState
);
