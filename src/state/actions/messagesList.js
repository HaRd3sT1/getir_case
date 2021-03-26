import React from 'react';
import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
import { error} from './dashboard'
// import { onChange} from "./form"
import {setUserData} from "./messagesUsers"
import Notify from "../../assets/notify.webm"
import Notify_2 from "../../assets/notify.m4a"

// const intl = useIntl();

export const ADMIN_MESSAGES = createAction('ADMIN_MESSAGES');
export const MESSAGES_LIST_DATA = createAction('MESSAGES_LIST_DATA');
export const TOTAL_NEW_MESSAGES = createAction('TOTAL_NEW_MESSAGES');
export const MESSAGES_LIST_RESET = createAction('MESSAGES_LIST_RESET');


const audio = new Audio(Notify)
const audio2 = new Audio(Notify_2)

const messagesListReset = () =>{
    return (dispatch) =>{
        dispatch(MESSAGES_LIST_RESET())
    }
}

const messagesListData = (limit) => {
    // audio.play()
    let first = true
    return async (dispatch, getState) => {
        const { docId } = getState().auth.userData;
        firebase.firestore().collection('messagesList').where("delete", "==", false).where("to", "array-contains", docId).where("activeBox", "==", true).get().then(doc=>{
            doc.forEach(doc=>{
                firebase.firestore().collection('messagesList').doc(doc.id).update({
                    activeBox:false
                })
            })
        })

        firebase.firestore().collection('adminMessages').doc("1").get().then(doc => {
            if(doc.data()){
                dispatch(ADMIN_MESSAGES(doc.data()))
            }
        })
        firebase.firestore().collection('messagesList').where("delete", "==", false).where("to", "array-contains", docId).orderBy("time", "desc").limit(limit).onSnapshot(doc => {
            const messagesList = getState().messagesList.list ? getState().messagesList.list : [];
            let messagesStatus = getState().messages.status;
            let totalNewMessages = getState().messagesList.totalNewMessages;
            // let messagesListOld = getState().messages.list ? getState().messages.list : [];
            let users = getState().messagesUsers ? getState().messagesUsers : [];
            const list = []
            let newMessage = 0
            doc.forEach(async doc => {
                if (doc.data().type === "automessage" || doc.data().type === undefined) {
                    return null
                }
                let toData = 1
                if (doc.data().to[1] === docId) { toData = 0 }
                let data = doc.data()

                let oldData = messagesList.findIndex(item => item.id === doc.id)

                if(!first) {
                    if(doc.data().newMessages){
                        if((messagesStatus === false) || document.hidden){
                            let gonder = false
                            if(oldData === -1){
                                gonder = true
                            }else if(messagesList[oldData].newMessages !== doc.data().newMessages){
                                gonder = true
                            }
                            if(gonder){
                                let lastMessage = doc.data().lastMessage
                                if (audio.canPlayType('audio/ogg')) {
                                    audio.play()
                                }else{
                                    audio2.play()
                                }
                                dispatch(error(<div style={{display:"flex"}}><div style={{ width: 54,height: 64,flex: "none",marginRight: 10, display:"flex", alignItems:"center", overflow:"hidden"}}><img style={{maxHeight:"inherit", width:"100%"}} src={data.users[toData].a} alt="profil" /></div> <div><b>{data.users[toData].n}</b><p style={{margin:0}}>{lastMessage && lastMessage.length > 54 ? lastMessage.substring(0,54)+"..." : lastMessage}</p></div></div>, "info", true));
                            }
                        }
                    }
                }
                if(!users[data.to[toData]]){
                    firebase.firestore().collection("users").doc(data.to[toData]).get().then(doc=>{
                        // console.log(doc.data())
                        dispatch(setUserData(doc.data()))
                    })
                }
                newMessage += doc.data().newMessages
                list.push({
                    id: doc.id,
                    userId: data.to[toData],
                    // avatar: data.users[toData].a,
                    // nickname: data.users[toData].n,
                    lastMessage: data.lastMessage,
                    cc: data.callcenterId,
                    active: data.active,
                    activeBox: data.activeBox,
                    to: data.to,
                    type: data.type,
                    time: data.time,
                    newMessages: data.newMessages,
                    // users: data.users,
                    allGetMessages: data.allGetMessages,
                    allSendMessages: data.allSendMessages
                })
                first = false
            })
            // console.log(list)
            if (list.length){
                dispatch(MESSAGES_LIST_DATA(list))
            }else{
                dispatch(MESSAGES_LIST_DATA([]))
            }
            if((totalNewMessages !== newMessage)){
                dispatch(TOTAL_NEW_MESSAGES(newMessage))
            }
        })
    };
};



export {messagesListData, messagesListReset };
