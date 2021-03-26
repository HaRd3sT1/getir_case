
import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
import visitorInfo from 'visitor-info';
import publicIp from 'public-ip';
import firebase_app from 'firebase/app';
const oldRealTimeDb = firebase.database();


export const LOG_DATA = createAction('LOG_DATA');
export const LOG_ID = createAction('LOG_ID');
export const logUser = () => {
    return (dispatch, getState) => {
        const userData = getState().auth.userData;
        const logs = getState().logs;
        //     console.log("setOInline2")
        oldRealTimeDb.ref('.info/connected').on('value', snapshot => {
            oldRealTimeDb.ref(`/onlineUsers/${userData.docId}`).onDisconnect().remove().then(() => {
                oldRealTimeDb.ref(`/onlineUsers/${userData.docId}`).set(userData.docId);
            })
        })
        try {
            if (!userData.delete && !userData.banned && logs.id && !userData.online){

                firebase.analytics().setUserId(userData.docId);
                firebase.analytics().logEvent('login', { nickname: userData.meta.nickname, email: userData.meta.email, id: userData.docId, coin: userData.coin });
                firebase.analytics().setUserProperties({ nickname: userData.meta.nickname, email: userData.meta.email, id: userData.docId, coin: userData.coin });


                
                // oldRealTimeDb.ref('.info/connected').on('value', snapshot => {
                //     oldRealTimeDb.ref(`/status/${userData.docId}`).onDisconnect().set('offline').then(() => {
                //         firebase.firestore().collection('users').doc(userData.docId).update({
                //             online: true,
                //             lastLogin: firebase_app.firestore.FieldValue.serverTimestamp()
                //         })
                //         oldRealTimeDb.ref(`/status/${userData.docId}`).set('online');
                //     })
                // })
                firebase.firestore().collection('logs').doc(logs.id).update({
                    u: userData.docId,
                    // s: true
                    // n: userData.meta.nickname ? userData.meta.nickname : "",
                    // a: userData.meta.avatarThumb ? userData.meta.avatarThumb : "",
                })

            }
        } catch (error) {
            console.log(error)
        }
    }

}
export const logsUpdate = (userId) =>{
    return (dispatch, getState) => {
        const { id } = getState().logs;
        // const userData = getState().auth.userData;
        if (id) {
            firebase.firestore().collection('logs').doc(id).update({
                u: userId,
                // s: true
                // n: userData.meta.nickname ? userData.meta.nickname : "",
                // a: userData.meta.avatarThumb ? userData.meta.avatarThumb : "",
            })
        }
    }
}
export const logsData = (size) => {
    return  (dispatch, getState) => {
        try {
            publicIp.v4().then(ipAddress =>{
                var __url_string = window.location.href;
                var __url = new URL(__url_string);
                let ref = __url.searchParams.get("ref") ? __url.searchParams.get("ref") : ""
                const userData = getState().auth.userData;
                let b = "";
                if (visitorInfo().browser.name && visitorInfo().browser.version){
                    b =  visitorInfo().browser.name + " - " + visitorInfo().browser.version
                }
                let o = ""
                if (visitorInfo().os.name && visitorInfo().os.version){
                    o = visitorInfo().os.name + " - " + visitorInfo().os.version 
                }
                firebase.firestore().collection('logs').add({
                    i: ipAddress,
                    b: b,
                    c: visitorInfo().country.alpha3 ? visitorInfo().country.alpha3 : "",
                    d: visitorInfo().device.model ? visitorInfo().device.model : "",
                    o: o,
                    t: firebase_app.firestore.FieldValue.serverTimestamp(),
                    r: ref,
                    u: userData.docId ? userData.docId : "",
                    // s: true
                    // n: userData.meta.nickname ? userData.meta.nickname : "",
                    // a: userData.meta.avatarThumb ? userData.meta.avatarThumb : "",
                    // r: userData.docId ? "user" : ""
                }).then(logId => {
                    dispatch(LOG_ID({ id: logId.id, userId: userData.docId ? userData.docId : "" }))
                    oldRealTimeDb.ref('.info/connected').on('value', snapshot => {
                        oldRealTimeDb.ref(`/online/${logId.id}`).onDisconnect().remove().then(() => {
                            oldRealTimeDb.ref(`/online/${logId.id}`).set(logId.id);
                        })
                    })
                })

                if (ref) {
                    firebase.firestore().collection("affiliate").doc(ref).get().then(doc => {
                        let count = doc.data().count ? doc.data().count : 0
                        let countSafe = doc.data().countSafe ? doc.data().countSafe : 0
                        firebase.firestore().collection("affiliate").doc(ref).update({ count: count + 1 })
                        firebase.firestore().collection("affiliateLog").doc(ref).collection("data").doc(ipAddress).get().then(doc => {
                            if (!doc.data()) {
                                firebase.firestore().collection("affiliateLog").doc(ref).collection("data").doc(ipAddress).set({
                                    ip: ipAddress,
                                    time: firebase_app.firestore.FieldValue.serverTimestamp()
                                })
                                firebase.firestore().collection("affiliate").doc(ref).update({ countSafe: countSafe + 1 })
                            }
                        })
                    })
                }

            })
        } catch (error) {
            
        }
        firebase.analytics();
        // var x = document.referrer;
        // firebase.firestore().collection('favs').where("a", "==", docId).orderBy("t", "desc").onSnapshot(doc => {
        //     let arr = []
        //     doc.forEach(doc => {
        //         arr.push(doc.data().b)
        //     })
        //     if (arr.length) {
        //         dispatch(FAVS_LIST(arr))
        //     }
        // })
    };
};