import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
import firebase_app from 'firebase/app';
import { error} from './dashboard'
import { onChange} from './form'
import { sendEmail} from './auth'
import {defaultFakeId} from "../../Settings"
import {firebaseError} from "../../Utils"


export const MESSAGES_FAIL = createAction('MESSAGES_FAIL');
export const MESSAGES_CLOSE = createAction('MESSAGES_CLOSE');
export const ACTIVE_MESSAGES_DATA = createAction('ACTIVE_MESSAGES_DATA');
export const MESSAGES_DATA_RESET = createAction('MESSAGES_DATA_RESET');
export const MESSAGES_DATA_RESET_2 = createAction('MESSAGES_DATA_RESET_2');
export const IMAGE_UPLOAD_START = createAction('IMAGE_UPLOAD_START');
export const IMAGE_UPLOAD_END = createAction('IMAGE_UPLOAD_END');
export const MESSAGE_IMAGE_DELETE = createAction('MESSAGE_IMAGE_DELETE');
export const MESSAGE_CLEAN_ERROR = createAction('MESSAGE_CLEAN_ERROR');
export const MESSAGE_CLEAR = createAction('MESSAGE_CLEAR');
export const MESSAGE_STATUS = createAction('MESSAGE_STATUS');
export const ACTIVE_MESSAGES_LIST_DATA = createAction('ACTIVE_MESSAGES_LIST_DATA');


const messagesReset = () => {
    return (dispatch) =>{
        dispatch(MESSAGES_DATA_RESET_2())
    }
}

const setMessageOpen = (status, checkTwo) => {
    return (dispatch, getState) => {
        const { docId} = getState().auth.userData;
        const { activeMessage} = getState().form;
        const messageList = getState().messagesList.list ? getState().messagesList.list : [];
        if(window.innerWidth > 991){
            if (!activeMessage && messageList[0] && status === true) {
                let fakeId = messageList[0].to[0]
                if(fakeId === docId){
                fakeId = messageList[0].to[1]  
                }
                if(!checkTwo){
                    dispatch(openMessageCheck(fakeId, true))
                }
            }
        }
        if(status === 2  && !activeMessage){
            return null
        }
        if(status === false && activeMessage){
            dispatch(onChange("activeMessage", ""))
        }
        dispatch(MESSAGE_STATUS(status))
    }
}

const openMessage = (messageList, openProfile) => {
    return async (dispatch, getState) => {
        const messagesList = getState().messagesList.list ? getState().messagesList.list : [];
        let activeData;
        if(messagesList.length){
            let index = messagesList.findIndex(x => x.id === messageList)
            if(index !== -1){
                activeData = messagesList[index]
            }
        }
        dispatch(MESSAGES_DATA_RESET())
        if(document.getElementById("messageTexarea")){
            document.getElementById("messageTexarea").value = ""
        }
        dispatch(onChange("activeMessage",  messageList))
        if(openProfile){
            firebase.firestore().collection('messagesList').doc(messageList).update({
                time:new Date(),
                delete:false,
                newMessages: 0
            })
        }else{
            if (activeData && activeData.newMessages !== 0) {
                firebase.firestore().collection('messagesList').doc(messageList).update({
                    newMessages: 0
                })
            }
        }
        var activeclass = document.querySelectorAll('#messageList li');
        for (var i = 0; i < activeclass.length; i++) {
            activeclass[i].classList.remove('active');
        }
        if(document.getElementById(messageList)){
            document.getElementById(messageList).classList.add('active')
        }
        if(window.innerWidth < 991){
            dispatch(setMessageOpen(2))
        }
        const unsubscribe = firebase.firestore().collection("messages").where("id", "==", messageList).orderBy("time", "desc").limit(100).onSnapshot(list => {
            const { activeMessage} = getState().form;
            if (activeMessage) {
                if (activeMessage !== messageList) {
                    unsubscribe()
                    return null
                }
            }
            let messages = []
            list.forEach(doc => {
                messages.unshift({
                    i: doc.id,
                    listId: list.id,
                    time: doc.data().time,
                    type: doc.data().type,
                    post: doc.data().post,
                    buy: doc.data().buy,
                    image: doc.data().image,
                    message: doc.data().message,
                    coin: doc.data().coin ? doc.data().coin : 0,
                    visible: doc.data().visible,
                })
            })
            dispatch(ACTIVE_MESSAGES_LIST_DATA({
                data: messages
            }))
        })
    }
}

const openMessageAdmin = () => {
    return async (dispatch, getState) => {
        dispatch(MESSAGES_DATA_RESET())

        if(document.getElementById("messageTexarea")){
            document.getElementById("messageTexarea").value = ""
        }
        dispatch(onChange("activeMessage", "admin"))
        if(window.innerWidth < 991){
            dispatch(setMessageOpen(2))
        }
    }
}

const openMessageCheck = (userId_2, noOpen) => {
    return (dispatch, getState) => {
        dispatch(MESSAGES_DATA_RESET())

        if(document.getElementById("messageTexarea")){
            document.getElementById("messageTexarea").value = ""
        }
        const list = getState().messagesList.list ? getState().messagesList.list : [];
        const { docId, meta } = getState().auth.userData;

        let messageId = ""
        list.forEach(doc=>{
            if (doc.to[0] === userId_2 || doc.to[1] === userId_2){
                messageId = doc.id
            }
        })
        if(!noOpen){
            dispatch(setMessageOpen(true, true))
        }
        firebase.firestore().collection("users").doc(userId_2).get().then(async userData =>{
            if (!userData.data()){
                return null
            }
            if (!messageId) {
                await firebase.firestore().collection('messagesList').where("to", "array-contains", docId).where("delete", "==", true).orderBy("allGetMessages", "desc").get().then(doc => {
                    doc.forEach(doc => {
                        if (!messageId) {
                            if (doc.data().to[0] === userId_2 || doc.data().to[1] === userId_2) {
                                messageId = doc.id
                            }
                        }
                    })
                })
            }
            if (!messageId) {

                let reality = true
                if (userId_2.startsWith(defaultFakeId)) { reality = false }
                let usersM = []
                usersM = [
                    {
                        a: meta.avatarThumb,
                        n: meta.nickname,
                    },
                    {
                        a: userData.data().meta.avatarThumb,
                        n: userData.data().meta.nickname,
                    }
                ]
                firebase.firestore().collection('messagesList').add({
                    callcenterId: 0,
                    callcenterList: "",
                    lastMessage: "",
                    lastSend: "",
                    type: "",
                    reality: reality,
                    status: false,
                    delete: false,
                    time: firebase_app.firestore.FieldValue.serverTimestamp(),
                    create: firebase_app.firestore.FieldValue.serverTimestamp(),
                    allGetMessages: 0,
                    allSendMessages: 0,
                    newMessages: 0,
                    asa: false,
                    to: [docId, userId_2],
                    users: usersM,
                    activeBox: false,
                    active: true
                }).then(doc => {
                    dispatch(openMessage(doc.id))
                })
                firebase.analytics().logEvent('create_message', { user1_nickname: meta.nickname, user2_nickname: userData.data().meta.nickname });
            } else {
                dispatch(openMessage(messageId, true))
            }
        })
    }
}

const deleteMessage = () => {
    return (dispatch, getState) => {
        const { activeMessage } = getState().form;
        firebase.firestore().collection('messagesList').doc(activeMessage).update({
            activeBox: false,
            delete: true,
            active: false,
        })
        if(document.getElementById("messageTexarea")){
            document.getElementById("messageTexarea").value = ""
        }
        dispatch(MESSAGES_DATA_RESET())
        if(window.innerWidth < 991){
            dispatch(setMessageOpen(1))
        }
    }
}
const imageUploadStart = (image) => {
    return (dispatch, getState) => {
        dispatch(IMAGE_UPLOAD_START(image))
    }
}
const sendMessage = () => {
    return async (dispatch, getState) => {
        let random = Math.floor(Math.random() * Math.floor(2))
        const { sendImage } = getState().messages;
        const messagesList = getState().messagesList.list ? getState().messagesList.list : [];
        const { locale } = getState().preferences;
        const {activeMessage} = getState().form
        let activeData;
        if(messagesList.length){
            let index = messagesList.findIndex(x => x.id === activeMessage)
            if(index !== -1){
                activeData = messagesList[index]
            }
        }
        let message
        if(document.getElementById("messageTexarea")){
            message = document.getElementById("messageTexarea").value
        }
        const prizeCoins = getState().generalDataReducer.prize;
        const coins = getState().generalDataReducer.coins;
        const { docId, coin, prize, verify, meta, badge } = getState().auth.userData;
        let messageCoin = Number(coins.messageCoin) ? Number(coins.messageCoin) : 0
        if(!message){
            return null
        }
        if(messageCoin === 0){
            if (!badge){
                dispatch(error(firebaseError("General.mesajIcinVipOlmalisin", locale), "premium", true));
                return null
            }
        }else if(coin < coins.messageCoin){
            dispatch(MESSAGES_FAIL({
                type:"coin",
                message:firebaseError("General.coinYeterliDegil", locale) + " ("+coins.messageCoin+" coin)"
            }))
            return null
        }
        if (!verify){
            dispatch(error(firebaseError("Dashboard.verifyBaslik", locale) + meta.email, "error", true));
            dispatch(sendEmail())
            return null
        }
        let secondUserId = activeData.to[0]
        if (secondUserId === docId) {
            secondUserId = activeData.to[1]
        }
        // Number(prizeCoins.sendMessageCoin) ? Number(prizeCoins.sendMessageCoin) : 0
        if(sendImage){
            random = 0
            messageCoin = coins.messagePhotoCoin
            if(coin < coins.messagePhotoCoin){
                dispatch(MESSAGES_FAIL({
                    type:"coin",
                    message:firebaseError("General.coinYeterliDegil", locale) + " ("+coins.messagePhotoCoin+" coin)"
                }))
                return null
            }
        }
        if(messageCoin !== 0){
            random = 0
        }
        // console.log(random)
        try {
            if(random === 0){
                firebase.firestore().collection('messagesList').doc(activeData.id).update({
                    lastMessage: message,
                    lastSend: "user",
                    type: messageCoin === 0 ? "waiting" : "",
                    status: true,
                    time: firebase_app.firestore.FieldValue.serverTimestamp(),
                    allGetMessages: Number(activeData.allGetMessages) + 1,
                    asa: false,
                });
            }else{
                firebase.firestore().collection('messagesList').doc(activeData.id).update({
                    lastMessage: message,
                    lastSend: "callcenter",
                    time: firebase_app.firestore.FieldValue.serverTimestamp(),
                    allGetMessages: Number(activeData.allGetMessages) + 1,
                });
            }

            firebase.firestore().collection('messages').add({
                cc: 0,
                buy: "",
                get: secondUserId,
                post: docId,
                id: activeData.id,
                message: message,
                time: firebase_app.firestore.FieldValue.serverTimestamp(),
                image: sendImage ? sendImage : "",
                type: sendImage ? "photo" : "",
                asa: "",
                visible: false,
            })
            let num1 = 10
            if (prize.sendMessage < 10) {
                num1 = 10
            } else if (prize.sendMessage < 20) {
                num1 = 20
            } else if (prize.sendMessage < 30) {
                num1 = 30
            } else if (prize.sendMessage < 40) {
                num1 = 40
            } else if (prize.sendMessage < 50) {
                num1 = 50
            } else if (prize.sendMessage < 60) {
                num1 = 60
            } else if (prize.sendMessage < 70) {
                num1 = 70
            } else if (prize.sendMessage < 80) {
                num1 = 80
            } else if (prize.sendMessage < 90) {
                num1 = 90
            } else if (prize.sendMessage < 100) {
                num1 = 100
            }
            if (Number(prize.sendMessage) + 1 === num1) {
                firebase.firestore().collection('users').doc(docId).update({
                    coin: Number(coin) + (Number(prizeCoins.sendMessageCoin) ? Number(prizeCoins.sendMessageCoin) : 0),
                }).then(doc => {
                    firebase.firestore().collection("history").add({
                        t: "p_send_message",
                        a: docId,
                        c: Number(prizeCoins.sendMessageCoin) ? Number(prizeCoins.sendMessageCoin) : 0,
                        u: Number(coin),
                        time: firebase_app.firestore.FieldValue.serverTimestamp()
                    })
                })
            }
            if(messageCoin){
                firebase.firestore().collection('users').doc(docId).update({
                    coin:Number(Number(coin) - Number(messageCoin)) ? Number(Number(coin) - Number(messageCoin)) : 0,
                    "prize.sendMessage": Number(prize.sendMessage) + 1
                })
            }else{
                firebase.firestore().collection('users').doc(docId).update({
                    "prize.sendMessage": Number(prize.sendMessage) + 1
                })
            }
            //history
            firebase.firestore().collection("history").add({
                t: sendImage ? "send_image" : "send_message",
                a: docId,
                c: Number(messageCoin),
                u: Number(coin),
                b:badge ? badge : "",
                time: firebase_app.firestore.FieldValue.serverTimestamp()
            })
            if(sendImage){
                dispatch(MESSAGE_IMAGE_DELETE())
            }
            // dispatch(MESSAGE_CLEAR())

            if(document.getElementById("messageTexarea")){
                document.getElementById("messageTexarea").value = ""
            }
            // dispatch(onChange("message", ""))
        } catch (error) {
            dispatch(error(error.message, "error", true));
            console.log(error)
        }
    }
}
const buyMessageImageFree = (id) => {
    return (dispatch, getState) => {
        // const { coins } = getState().generalDataReducer;
        const { docId, coin } = getState().auth.userData;
        try {
            firebase.firestore().collection("messages").doc(id).update({
                buy: true
            })
        } catch (error) {
                dispatch(error(error.message, "error", true));
            console.log(error)
        }
        //history
        firebase.firestore().collection("history").add({
            t: "message_image",
            a: docId,
            c: 0,
            u: coin,
            time: firebase_app.firestore.FieldValue.serverTimestamp()
        })
    }
}

const buyMessageImage = (id, photoCoin) => {
    return (dispatch, getState) => {
        const { locale } = getState().preferences;
        // const { coins } = getState().generalDataReducer;
        const { docId, coin } = getState().auth.userData;
        if (Number(photoCoin) > coin) {
            dispatch(MESSAGES_FAIL({
                type:"coin",
                message:firebaseError("General.coinYeterliDegil", locale) + " ("+photoCoin+" coin)"
            }))
        }else{
            try {
                firebase.firestore().collection("users").doc(docId).update({
                    coin: Number(coin) - Number(photoCoin)
                })
                firebase.firestore().collection("messages").doc(id).update({
                    buy: true
                })
            } catch (error) {

                dispatch(error(error.message, "error", true));
                console.log(error)
            }
            //history
            firebase.firestore().collection("history").add({
                t: "message_image",
                a: docId,
                c: Number(photoCoin),
                u: coin,
                time: firebase_app.firestore.FieldValue.serverTimestamp()
            })
        }
    }
}
const deleteImg = () => {
    return (dispatch, getState) => {
        // const { active } = getState().messages;
        dispatch(MESSAGE_IMAGE_DELETE())
    }
}
const cleanError = () => {
    return (dispatch, getState) => {
        dispatch(MESSAGE_CLEAN_ERROR())
    }
}
const imageUploadEnd = (filename) => {
    return (dispatch, getState) => {
        const { sendImageSize } = getState().messages;
        const { locale } = getState().preferences;
        const { docId } = getState().auth.userData;
        if (sendImageSize < 10000000) {
            try {
                firebase.storage().ref("images/" + docId + "/send").child(filename).getDownloadURL().then(url => {
                    dispatch(IMAGE_UPLOAD_END(url))
                })  
            } catch (error) {

                dispatch(error(error.message, "error", true));
                console.log(error)
            }
        } else {
            dispatch(error(firebaseError("General.fotografBuyuk", locale), "error", true));
        }
    }
}

const closeMessage = () => {
    return (dispatch, getState) => {
        const { activeMessage } = getState().form;
        if (activeMessage){
            if(activeMessage){
                firebase.firestore().collection('messagesList').doc(activeMessage).update({
                    activeBox: false
                })
            }
            
            if(document.getElementById("messageTexarea")){
                document.getElementById("messageTexarea").value = ""
            }
        // console.log("close");
            // dispatch(onChange("message", ""))
            // dispatch(MESSAGES_DATA_RESET())
            dispatch(MESSAGES_CLOSE())
        }
    }
}
const closeMessageSidebar = (id) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('messagesList').doc(id).update({
            active: false,
            activeBox: false
        })
    }
}

const sendGift = (fakeId, giftId, giftCoin, giftName, noOpen) => {
    return async (dispatch, getState) => {
        const { locale } = getState().preferences;
        const list = getState().messagesList.list ? getState().messagesList.list : [];
        const { docId, coin, prize, meta } = getState().auth.userData;

        let lastCoin = Number(Number(coin) - Number(giftCoin))
        if(!lastCoin || (coin < Number(giftCoin))){
            dispatch(MESSAGES_FAIL({
                type:"coin",
                message:firebaseError("General.coinYeterliDegil", locale) + " ("+giftCoin+" coin)"
            }))
            return null
        }
        let messageId = ""
        list.forEach(doc=>{
            if (doc.to[0] === fakeId || doc.to[1] === fakeId){
                messageId = doc.id
            }
        })
        if(!noOpen){
            dispatch(setMessageOpen(true))
        }
        firebase.firestore().collection("users").doc(fakeId).get().then(async userData =>{
            if (!userData.data()){
                return null
            }
            if (!messageId) {
                await firebase.firestore().collection('messagesList').where("to", "array-contains", docId).where("delete", "==", true).orderBy("allGetMessages", "desc").get().then(doc => {
                    doc.forEach(doc => {
                        if (!messageId) {
                            if (doc.data().to[0] === fakeId || doc.data().to[1] === fakeId) {
                                messageId = doc.id
                            }
                        }
                    })
                })
            }
            if (!messageId) {

                let reality = true
                if (fakeId.startsWith(defaultFakeId)) { reality = false }
                let usersM = []
                usersM = [
                    {
                        a: meta.avatarThumb,
                        n: meta.nickname,
                    },
                    {
                        a: userData.data().meta.avatarThumb,
                        n: userData.data().meta.nickname,
                    }
                ]

                firebase.firestore().collection('messagesList').add({
                    callcenterId: 0,
                    callcenterList: "",
                    lastMessage: giftName,
                    lastSend: "user",
                    type: "",
                    reality: reality,
                    status: true,
                    delete: false,
                    time: firebase_app.firestore.FieldValue.serverTimestamp(),
                    create: firebase_app.firestore.FieldValue.serverTimestamp(),
                    allGetMessages: 1,
                    allSendMessages: 0,
                    newMessages: 0,
                    asa: false,
                    to: [docId, fakeId],
                    users: usersM,
                    activeBox: false,
                    active: true
                }).then(doc => {
                    firebase.firestore().collection('messages').add({
                        cc: 0,
                        buy: "",
                        get: fakeId,
                        post: docId,
                        id: doc.id,
                        message: giftName,
                        time: firebase_app.firestore.FieldValue.serverTimestamp(),
                        image: giftId,
                        type: "gift",
                        asa: "",
                        visible: false,
                    })
                    dispatch(openMessage(doc.id))
                })
                firebase.analytics().logEvent('create_message', { user1_nickname: meta.nickname, user2_nickname: userData.data().meta.nickname });
            } else {
                firebase.firestore().collection('messagesList').doc(messageId).get().then(doc => {
                    firebase.firestore().collection('messagesList').doc(messageId).update({
                        lastMessage: giftName,
                        lastSend: "user",
                        type: "",
                        status: true,
                        time: firebase_app.firestore.FieldValue.serverTimestamp(),
                        allGetMessages: Number(doc.data().allGetMessages) + 1 ? Number(doc.data().allGetMessages) + 1 : 0,
                        asa: false,
                    });
                    firebase.firestore().collection('messages').add({
                        cc: 0,
                        buy: "",
                        get: fakeId,
                        post: docId,
                        id: doc.id,
                        message: giftName,
                        time: firebase_app.firestore.FieldValue.serverTimestamp(),
                        image: giftId,
                        type: "gift",
                        asa: "",
                        visible: false,
                    })
                    dispatch(openMessage(doc.id))
                })
            }
            firebase.firestore().collection('users').doc(docId).update({
                coin: lastCoin,
                "prize.gift": Number(prize.gift) ? Number(prize.gift) + 1 : 1
            })
            //history
            firebase.firestore().collection("history").add({
                t: "gift",
                a: docId,
                c: Number(giftCoin),
                u: Number(lastCoin),
                time: firebase_app.firestore.FieldValue.serverTimestamp()
            })
        })
    }
}

const sendGif = (gifUrl, gifModalSet) => {
    return async (dispatch, getState) => {
        const { locale } = getState().preferences;
        // const list = getState().messagesList.list ? getState().messagesList.list : [];
        const { docId, coin, prize} = getState().auth.userData;
        // const { sendImage } = getState().messages;
        const messagesList = getState().messagesList.list ? getState().messagesList.list : [];
        const { coins } = getState().generalDataReducer;
        const {activeMessage} = getState().form
        
        let activeData;
        if(messagesList.length){
            let index = messagesList.findIndex(x => x.id === activeMessage)
            if(index !== -1){
                activeData = messagesList[index]
            }
        }

        let fakeId = activeData.to[1]
        if(activeData.to[0] !== docId){
            fakeId = activeData.to[0]
        }
        let lastCoin = Number(Number(coin) - Number(coins.gifCoin))
        if(!lastCoin || (coin < Number(coins.gifCoin))){
            dispatch(MESSAGES_FAIL({
                type:"coin",
                message:firebaseError("General.coinYeterliDegil", locale) + " ("+coins.gifCoin+" coin)"
            }))
            return null
        }
        firebase.firestore().collection('messagesList').doc(activeData.id).get().then(doc => {
            firebase.firestore().collection('messagesList').doc(activeData.id).update({
                lastMessage: "gif",
                lastSend: "user",
                type: "",
                status: true,
                time: firebase_app.firestore.FieldValue.serverTimestamp(),
                allGetMessages: Number(doc.data().allGetMessages) + 1 ? Number(doc.data().allGetMessages) + 1 : 0,
                asa: false,
            });
            firebase.firestore().collection('messages').add({
                cc: 0,
                buy: "",
                get: fakeId,
                post: docId,
                id: doc.id,
                message: gifUrl,
                time: firebase_app.firestore.FieldValue.serverTimestamp(),
                image: "",
                type: "gif",
                asa: "",
                visible: false,
            })
            gifModalSet("")
        })
        
        firebase.firestore().collection('users').doc(docId).update({
            coin: lastCoin,
            "prize.gif": Number(prize.gif) ? Number(prize.gif) + 1 : 1
        })
        //history
        firebase.firestore().collection("history").add({
            t: "gif",
            a: docId,
            c: Number(coins.gifCoin),
            u: Number(lastCoin),
            time: firebase_app.firestore.FieldValue.serverTimestamp()
        })
    }
}
// giftId, giftCoin, giftName, 
const sendFirstMessage = (fakeId, noOpen) => {
    return async (dispatch, getState) => {
        const { locale } = getState().preferences;
        let message
        if(document.getElementById("messageTexarea")){
            message = document.getElementById("messageTexarea").value
        }
        const coins = getState().generalDataReducer.coins;
        const list = getState().messagesList.list ? getState().messagesList.list : [];
        const { docId, coin, meta, badge, verify } = getState().auth.userData;

        let messageCoin = Number(coins.messageCoin) ? Number(coins.messageCoin) : 0
        if(messageCoin === 0){
            if (!badge){
                dispatch(error(firebaseError("General.mesajIcinVipOlmalisin", locale), "premium", true));
                return null
            }
        }else if(coin < coins.messageCoin){
            dispatch(MESSAGES_FAIL({
                type:"coin",
                message:firebaseError("General.coinYeterliDegil", locale) + " ("+coins.messageCoin+" coin)"
            }))
            return null
        }
        if (!verify){
            dispatch(error(firebaseError("Dashboard.verifyBaslik", locale) + meta.email, "error", true));
            dispatch(sendEmail())
            return null
        }
        let messageId = ""
        list.forEach(doc=>{
            if (doc.to[0] === fakeId || doc.to[1] === fakeId){
                messageId = doc.id
            }
        })
        if(!noOpen){
            dispatch(setMessageOpen(true))
        }
        firebase.firestore().collection("users").doc(fakeId).get().then(async userData =>{
            if (!userData.data()){
                return null
            }
            if (!messageId) {
                await firebase.firestore().collection('messagesList').where("to", "array-contains", docId).where("delete", "==", true).orderBy("allGetMessages", "desc").get().then(doc => {
                    doc.forEach(doc => {
                        if (!messageId) {
                            if (doc.data().to[0] === fakeId || doc.data().to[1] === fakeId) {
                                messageId = doc.id
                            }
                        }
                    })
                })
            }
            if (!messageId) {

                let reality = true
                if (fakeId.startsWith(defaultFakeId)) { reality = false }
                let usersM = []
                usersM = [
                    {
                        a: meta.avatarThumb,
                        n: meta.nickname,
                    },
                    {
                        a: userData.data().meta.avatarThumb,
                        n: userData.data().meta.nickname,
                    }
                ]

                firebase.firestore().collection('messagesList').add({
                    callcenterId: 0,
                    callcenterList: "",
                    lastMessage: message,
                    lastSend: "user",
                    type: messageCoin === 0 ? "waiting" : "",
                    reality: reality,
                    status: true,
                    delete: false,
                    time: firebase_app.firestore.FieldValue.serverTimestamp(),
                    create: firebase_app.firestore.FieldValue.serverTimestamp(),
                    allGetMessages: 1,
                    allSendMessages: 0,
                    newMessages: 0,
                    asa: false,
                    to: [docId, fakeId],
                    users: usersM,
                    activeBox: false,
                    active: true
                }).then(doc => {
                    firebase.firestore().collection('messages').add({
                        cc: 0,
                        buy: "",
                        get: fakeId,
                        post: docId,
                        id: doc.id,
                        message: message,
                        time: firebase_app.firestore.FieldValue.serverTimestamp(),
                        image: "",
                        type: "",
                        asa: "",
                        visible: false,
                    })
                    dispatch(openMessage(doc.id))
                })
                firebase.analytics().logEvent('create_message', { user1_nickname: meta.nickname, user2_nickname: userData.data().meta.nickname });
            } else {
                dispatch(openMessage(messageId))
            }
            //history
            firebase.firestore().collection("history").add({
                t: "send_message",
                a: docId,
                c: 0,
                u: Number(coin),
                time: firebase_app.firestore.FieldValue.serverTimestamp()
            })
        })
    }
}




export { sendGif, messagesReset, sendFirstMessage, openMessageAdmin, sendGift, openMessage, openMessageCheck, deleteMessage, imageUploadStart, sendMessage, buyMessageImageFree, buyMessageImage, deleteImg, cleanError, imageUploadEnd, closeMessage, closeMessageSidebar, setMessageOpen };
