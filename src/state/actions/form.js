import { createAction } from 'redux-act';

export const FORM_DATA = createAction('FORM_DATA');
export const onChange = (name, value) => {
    return async (dispatch, getState) => {
        const form = getState().form;
        if(form[name] !== value){
            return dispatch(FORM_DATA({[name]:value}));
        }
    };
};