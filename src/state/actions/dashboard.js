
import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
import firebase_app from 'firebase/app';
// import { getRandomInt} from "../../Hooks"
import {setUserData} from "./users"
import {firebaseError} from "../../Utils"

export const DASHBOARD_END = createAction('DASHBOARD_END');
export const DASHBOARD_START = createAction('DASHBOARD_START');
export const DASHBOARD_FAIL = createAction('DASHBOARD_FAIL');
export const NOTICES_DELETE = createAction('NOTICES_DELETE');
export const MATCHS = createAction('MATCHS');
export const MATCH_POPUP = createAction('MATCH_POPUP');
export const DASHBOARD_FAIL_CLEAR = createAction('DASHBOARD_FAIL_CLEAR');
export const MOBILE_TOGGLE = createAction('MOBILE_TOGGLE');
export const MAIN_USERS_DATA = createAction('MAIN_USERS_DATA');
export const VIP_USERS = createAction('VIP_USERS');
export const CLEAR_DASHBOARD = createAction('CLEAR_DASHBOARD');
export const MOBILE_USER_LIST = createAction('MOBILE_USER_LIST');


export const clearDashboard = () => {
    return (dispatch, getState) => {
        dispatch(CLEAR_DASHBOARD())
    }
}
export const startEvent = () => {
    return (dispatch, getState) => {
        dispatch(DASHBOARD_START())
    }
}
export const endEvent = () => {
    return (dispatch, getState) => {
        dispatch(DASHBOARD_END())
    }
}
export const mobileToggleFunc = () =>{
    return (dispatch, getState) => {
        const dashboard = getState().dashboard;
        if (dashboard.mobileToggle){
            dispatch(MOBILE_TOGGLE(false))
        }else{
            dispatch(MOBILE_TOGGLE(true))
        }
    }
}
export const buyImage = (buyId) => {
    return async (dispatch, getState) => {
        const { locale } = getState().preferences;
        const { docId, buy, coin } = getState().auth.userData;
        const { profilePhotoCoin } = getState().generalDataReducer.coins;
        //check coin
        let userData2 = await firebase.firestore().collection("users").doc(docId).get()
        if(Number(coin) !== userData2.data().coin){
            return null
        }

        if (profilePhotoCoin > coin) {
            dispatch(DASHBOARD_FAIL({
                error:firebaseError("General.coinYeterliDegil", locale),
                type:"error",
                autoDismiss: true,
            }))
        } else {
            let _buy = buy
            _buy.push(buyId)
            firebase.firestore().collection("users").doc(docId).update({
                coin: Number(coin - profilePhotoCoin),
                buy: _buy
            })
            //history
            firebase.firestore().collection("history").add({
                t: "profile_image",
                a: docId,
                c: profilePhotoCoin,
                u: coin,
                time: firebase_app.firestore.FieldValue.serverTimestamp()
            })
        }
    }
}

export const matchData = () => {
    return (dispatch, getState) => {
        const { docId } = getState().auth.userData;
        firebase.firestore().collection('match').where("a", "==", docId).where("s", "==", true).orderBy("t", "desc").limit(14).onSnapshot(doc => {
            let messagesUsers = []
            doc.forEach(doc => {
                let data = doc.data()
                if (data.t) {
                    messagesUsers.push({
                        userId: data.b,
                        avatar: data.av,
                        nickname: data.n,
                        time: data.t.toDate(),
                    })
                }
            })
            dispatch(MATCHS(messagesUsers))
        })
    }
}
export const mainData = (size, savePrevData) => {
    return async(dispatch, getState) => {
        // const { meta } = getState().auth.userData;
        const { length } = getState().generalDataReducer;
        dispatch(DASHBOARD_START())
        //for (let index = 0; index < size; index++) {
        let random = Math.floor(Math.random() * Math.floor(length.user));
        firebase.firestore().collection('users').where("role", "==", 1).orderBy("id").startAt(length.user - random).limit(size).get().then(async data => {
            let users = [];
            data.forEach(doc => {
                if (!doc.id){
                    return null
                }
                dispatch(setUserData(doc.data()))
                if (users.some(item => item.id === doc.id)) {
                    return null
                }
                users.push(doc.id)
            })
            if (users && users.length){
                dispatch(MAIN_USERS_DATA(users))
            }
        })  
        //}
        dispatch(DASHBOARD_END())

    }
}

export const matchPopupData = () => {
    return (dispatch, getState) => {
        const { docId } = getState().auth.userData;
        const { matchId } = getState().dashboard.matchPopup ? getState().dashboard.matchPopup : "";
        firebase.firestore().collection('match').where("a", "==", docId).where("p", "==", true).orderBy("t", "desc").onSnapshot(doc => {
            doc.forEach(doc => {
                if (!matchId) {
                    dispatch(MATCH_POPUP({
                        avatar: doc.data().av,
                        userId: doc.data().b,
                        userName: doc.data().n,
                        matchId: doc.id
                    }))
                }
            })
        })
    }
}

export const matchPopupReset = () => {
    return (dispatch, getState) => {
        const { matchId } = getState().dashboard.matchPopup;
        dispatch(MATCH_POPUP({
            avatar: "",
            userId: "",
            userName: "",
            matchId: ""
        }))
        setTimeout(doc=>{
            firebase.firestore().collection('match').doc(matchId).update({
                p: ""
            })
        }, 1000)
    }
}

export const deleteNotice = (id) => {
    return async (dispatch, getState) => {
        const { notices, docId } = getState().auth.userData;
        let arr = []
        notices.forEach((doc, index) => {
            if (id !== index) {
                arr.push(doc)
            }
        })
        firebase.firestore().collection("users").doc(docId).update({
            notices: arr
        })
    } 
}
export const error = (message, type, autoDismiss) => {
    return (dispatch) => {
        dispatch(DASHBOARD_FAIL({
            error:message,
            type:type,
            autoDismiss: autoDismiss,
        }))
    }
}
export const cleanErrorDash = () => {
    return (dispatch) => {
        dispatch(DASHBOARD_FAIL_CLEAR())
    }
}
export const vipUsers = (size) => {
    return async (dispatch, getState) => {
        // const vipUsers = getState().dashboard.vipUsers ? getState().dashboard.vipUsers : []
        // if(!vipUsers.length){
            firebase.firestore().collection("users").where("badge", "==", "vip").orderBy('lastLogin', 'desc').limit(size).get().then(doc => {
                let users = []
                doc.forEach(doc => {
                    // dispatch(setUserData(doc.data()))
                    users.push({
                        id:doc.id,
                        avatar:doc.data().meta.avatarThumb
                    })
                })

                if (users && users.length) {
                    dispatch(VIP_USERS(users))
                }
            })
        // }
    };
};

export const mobileListData = () => {
    return (dispatch, getState) => {
        const { length } = getState().generalDataReducer;
        let data = firebase.firestore().collection('users').where("role", "==", 1)
        let random = Math.floor(Math.random() * Math.floor(length.user));
        data = data.orderBy("id").startAt(length.user - random).limit(1)
        // console.log(random);
        data.get().then(data => {
            data.forEach(doc => {
                if (!doc.id){
                    return null
                }

                dispatch(setUserData(doc.data()))
                dispatch(MOBILE_USER_LIST([doc.id]))
            })
        })  

    }
}