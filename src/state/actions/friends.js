
import React from 'react';
import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
import {setUserData} from "./users"
import {userId_2_S} from "../../Settings"
import { error} from './dashboard'
import {firebaseError} from "../../Utils"
import {FormattedMessage} from 'react-intl';
import {getRandomNumber} from "../../Hooks"


export const addFriend = (fakeId) => {
  return (dispatch, getState) => {
    const { locale } = getState().preferences;
    const { docId, badge } = getState().auth.userData;
    if (!badge){
        dispatch(error(firebaseError("General.arkadasEkelemekIcinVIP", locale), "premium", true));
        // dispatch(sendEmail())
        return null
    }
    firebase.firestore().collection("friends").add({
      a:docId,
      b:fakeId,
      s:false,
      time:new Date()
    })
  };
};

export const removeFriend = (fakeId) => {
  return (dispatch, getState) => {
    const { docId } = getState().auth.userData;
    firebase.firestore().collection("friends").where("a", "==", docId).where("b", "==", fakeId).get().then(doc=>{
      doc.forEach(doc=>{
        firebase.firestore().collection("friends").doc(doc.id).delete()
      })
    })
  };
};

export const FRIENDS_DATA = createAction('FRIENDS_DATA');
export const WAITING_FRIENDS_DATA = createAction('WAITING_FRIENDS_DATA');

    //   firebase.firestore().collection("friends").where("a", "==", W).onSnapshot(doc => {
    //     let arr = []
    //     let arr2 = []
    //     doc.forEach(doc=>{
    //       if(doc.data().s){
    //         arr.push(doc.data().b)
    //       }else{
    //         arr2.push(doc.data().b)
    //       }
    //     })
    //     dispatch(
    //       FRIENDS_DATA({
    //         friends: arr
    //       })
    //     );
    //     dispatch(
    //       WAITING_FRIENDS_DATA({
    //         friends: arr2
    //       })
    //     );
    //   })
export const getFriends = (size) => {
    return (dispatch, getState) => {
        const { docId, badge } = getState().auth.userData;
        let waiting = []
        firebase.firestore().collection("friends").where("a", "==", docId).orderBy("time", "desc").limit(100).onSnapshot(doc=>{
            const messagesList = getState().messagesList.list ? getState().messagesList.list : [];
            let arr = []
            let arr2 = []
            const users = getState().users;
            doc.forEach(doc=>{
                if(!users[userId_2_S(doc.data().b)]){
                    firebase.firestore().collection("users").doc(doc.data().b).get().then(doc=>{
                        dispatch(setUserData(doc.data()))
                    })
                }
                if(doc.data().s){
                    arr.push(doc.data().b)
                }else{
                  if(!waiting.includes(doc.id)){
                    let randomTime = 60000 * getRandomNumber(12)
                    if(messagesList && messagesList.some(el => el.userId === doc.data().b)){
                      waiting.push(doc.id)
                        // console.log("onay")
                        setTimeout(() => {
                          const users2 = getState().users;
                          firebase.firestore().collection("friends").doc(doc.id).update({
                            s:true
                          })
                          if(!users2[userId_2_S(doc.data().b)].online){
                            firebase.firestore().collection("users").doc(doc.data().b).update({
                              online:true
                            })
                          }
                          dispatch(error(<div style={{display:"flex"}}><div style={{ width: 54,height: 64,flex: "none",marginRight: 10, display:"flex", alignItems:"center", overflow:"hidden"}}><img style={{maxHeight:"inherit", width:"100%"}} src={users2[userId_2_S(doc.data().b)].avatarLarge} alt="profil" /></div> <div><b>{users2[userId_2_S(doc.data().b)].nickname}</b><p style={{margin:0}}><FormattedMessage id="General.arkadaslikIsteginiKabulEtti" /></p></div></div>, "success", false));

                        }, randomTime);
                    }else if(badge){
                      waiting.push(doc.id)
                      let random = getRandomNumber(2)
                      if(random === 1){
                        // console.log("onay2")
                        setTimeout(() => {
                          const users2 = getState().users;
                          firebase.firestore().collection("friends").doc(doc.id).update({
                            s:true
                          })
                          if(!users2[userId_2_S(doc.data().b)].online){
                            firebase.firestore().collection("users").doc(doc.data().b).update({
                              online:true
                            })
                          }
                          dispatch(error(<div style={{display:"flex"}}><div style={{ width: 54,height: 64,flex: "none",marginRight: 10, display:"flex", alignItems:"center", overflow:"hidden"}}><img style={{maxHeight:"inherit", width:"100%"}} src={users2[userId_2_S(doc.data().b)].avatarLarge} alt="profil" /></div> <div><b>{users2[userId_2_S(doc.data().b)].nickname}</b><p style={{margin:0}}><FormattedMessage id="General.arkadaslikIsteginiKabulEtti" /></p></div></div>, "success", false));
                        }, randomTime);
                      }else{
                        setTimeout(() => {
                          firebase.firestore().collection("friends").doc(doc.id).delete()
                        }, randomTime);
                      }
                    }
                  }
                  arr2.push(doc.data().b)
                }
            })
            dispatch(
            FRIENDS_DATA({
                friends: arr
            })
            );
            dispatch(
            WAITING_FRIENDS_DATA({
                friends: arr2
            })
            );
        })
    }
}