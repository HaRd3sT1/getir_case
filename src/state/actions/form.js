import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
import firebase_app from 'firebase/app';
import {firebaseError} from "../../Utils"

export const FORM_DATA = createAction('FORM_DATA');
export const FORM_FAIL = createAction('FORM_FAIL');
export const FORM_END = createAction('FORM_END');
export const FORM_START = createAction('FORM_START');
const capitalize = ([s, ...tring]) =>
  [s.toUpperCase(), ...tring]
    .join('');

export const onChange = (name, value) => {
    return async (dispatch, getState) => {
        const form = getState().form;
        if(form[name] !== value){
            return dispatch(FORM_DATA({[name]:value}));
        }
    };
};
export const onChangeAdd = (name, value) => {
    return async (dispatch, getState) => {
        const { form } = getState();
        return dispatch(FORM_DATA({ [name]: (form[name] ? form[name] : "")+value}));
    };
};
export const onChangeCountry = (name, value) => {
    return async (dispatch) => {
        if (value){
            firebase.firestore().collection(value).get().then(doc => {
                let data = []
                doc.forEach(doc => {
                    data.push({ value: doc.id, label: doc.id.split('-').map(capitalize).join('-') })
                })
                if (name === "searchCountry") {
                    return dispatch(FORM_DATA({ [name]: value, searchCity:"", searchCitys: data }));
                } else if (name === "formCountry") {
                    return dispatch(FORM_DATA({ [name]: value, city: "", formCitys: data }));
                } else if (name === "filterCountry") {
                    return dispatch(FORM_DATA({ [name]: value, city: "", filterCitys: data }));
                } else {
                    return dispatch(FORM_DATA({ [name]: value, city: "", citys: data }));
                }
            })
        }else{
            if (name === "searchCountry") {
                return dispatch(FORM_DATA({ [name]: "", searchCitys: [] }));
            } else {
                return dispatch(FORM_DATA({ [name]: "", citys: [] }));
            }
        }
    };
};
export const onChangeCity = (name, value) => {
    return async (dispatch, getState) => {
        const { form } = getState();
        if (value){
            firebase.firestore().collection(form.country).doc(value).collection("data").get().then(doc => {
                let data = []
                doc.forEach(doc => {
                    data.push({ value: doc.id, label: doc.id.split('-').map(capitalize).join('-') })
                })
                return dispatch(FORM_DATA({ [name]: value, zip: "", district: data }));
            })
        }else{
            return dispatch(FORM_DATA({ [name]: "", district: [] }));
        }
    };
};
    
export const sendContact = () => {
    return async (dispatch, getState) => {
        const { email, nickname, meessage } = getState().form;
        const { id } = getState().auth.userData;
        const {locale} = getState().preferences;
        dispatch(FORM_START());
        firebase.firestore().collection('contact').add({
                timestamp : firebase_app.firestore.FieldValue.serverTimestamp(),
                email     : email,
                username  : nickname,
                message   : meessage,
                userId    : id ? id : ""
        }).catch(doc=>{
            dispatch(FORM_FAIL({ error: firebaseError("General.neredeyseOldu", locale) }));
        });
        dispatch(FORM_END());
    };
};
    