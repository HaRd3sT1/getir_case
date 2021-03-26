import React from 'react';
import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
// import { getAge } from "../../Hooks"
// import firebase_app from 'firebase/app';
// import { startEvent, endEvent} from "./dashboard"
import {setUserData} from "./users"
import {error} from "./dashboard"
import {onChange} from "./form"
import {userId_2_S} from "../../Settings"
import {getRandomNumber} from "../../Hooks"
import {FormattedMessage} from 'react-intl';

export const VIEWS_DATA = createAction('VIEWS_DATA');

export const getViews = (size) => {
    return (dispatch, getState) => {
        const { docId } = getState().auth.userData;
        firebase.firestore().collection("views").where("a", "==", docId).orderBy("time", "desc").limit(50).onSnapshot(doc=>{
            let arr = []
            const users = getState().users;
            doc.forEach(doc=>{
                if(!users[userId_2_S(doc.data().b)]){
                    firebase.firestore().collection("users").doc(doc.data().b).get().then(doc=>{
                        dispatch(setUserData(doc.data()))
                    })
                }
                arr.push(doc.data().b)
            })
            dispatch(VIEWS_DATA(arr))
        })
    }
}
export const addViews = (fakeId) => {
    return (dispatch, getState) => {
        const { docId } = getState().auth.userData;
        const views = getState().views.list ? getState().views.list : [];
        if(docId === fakeId){
            return null
        }
        let random = getRandomNumber(4)
        if(random === 1){
            let randomTime = 20000 * getRandomNumber(12)
            if(!views.includes(fakeId)){
                setTimeout(() => {
                    const views2 = getState().views.list ? getState().views.list : [];
                    if(!views2.includes(fakeId)){
                        let form = getState().form;
                        const { badge } = getState().auth.userData;
                        dispatch(onChange("newWiews", (form.newWiews ? form.newWiews : 0)+1))
                        firebase.firestore().collection("views").add({
                            a:docId,
                            b:fakeId,
                            time:new Date(),
                        })  
                        firebase.firestore().collection("users").doc(fakeId).get().then(doc=>{
                            if(doc.data()){
                                dispatch(error(<div style={{display:"flex"}}><div style={{ width: 54,height: 64,flex: "none",marginRight: 10, display:"flex", alignItems:"center", overflow:"hidden"}}><img style={{maxHeight:"inherit", width:"100%"}} src={badge ? doc.data().meta.avatarThumb : doc.data().meta.ab} alt="profil" /></div> <div><b>{badge ? doc.data().meta.nickname : ""}</b><p style={{margin:0}}><FormattedMessage id="General.profileBakti" /></p></div></div>, "info", false));
                            }
                        })
                    }
                }, randomTime);
            }
        }
    }
}
