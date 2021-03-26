
import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
// import { getAge } from "../../Hooks"
import firebase_app from 'firebase/app';
// import { startEvent, endEvent} from "./dashboard"
import {setUserData} from "./users"


export const FAVS_DATA_FULL = createAction('FAVS_DATA_FULL');
export const FAVS_DATA_ADD = createAction('FAVS_DATA_ADD');
export const FAVS_RESET = createAction('FAVS_RESET');
export const FAVS_LIST = createAction('FAVS_LIST');
export const FAVS_START = createAction('FAVS_START');
export const FAVS_END = createAction('FAVS_END');
export const FAVS_DATA_ADD_FIRST = createAction('FAVS_DATA_ADD_FIRST');

export const favsDataReset = (size) => {
    return (dispatch, getState) => {
        const users = getState().favs.users;
        let arr = []
        users.forEach((doc, index) => {
            if (index < size) {
                arr.push(doc)
            }
        })
        dispatch(FAVS_DATA_FULL(arr))
    }
}
// export const favsData = (size) => {
//     return (dispatch, getState) => {
//         const { docId} = getState().auth.userData;
//         firebase.firestore().collection('favs').where("a", "==", docId).orderBy("t", "desc").onSnapshot(doc => {
//             let arr = []
//             doc.forEach(doc => {
//                 arr.push(doc.data().b)
//             })
//             if (arr && arr.length) {
//                 dispatch(FAVS_LIST(arr))
//             }
//         })
//     };
// };

export const favsData = (first) => {
    return async (dispatch, getState) => {
        let loading = getState().favs.loading;
        let list = getState().favs.list ? getState().favs.list : [];
        const { docId} = getState().auth.userData;
        let lastTime = Number(getState().favs.lastTime) ? getState().favs.lastTime : new Date();
        if (loading && !first) {
            return null
        }
        dispatch(FAVS_START())
        if (first) {
            list = []
            lastTime = new Date()
        }
        let fireData = firebase.firestore().collection('favs').where("a", "==", docId).where("t", "<=", lastTime).orderBy("t", "desc")
        fireData.limit(12).get().then(async doc => {
            doc.forEach(doc=>{
                if (!list.some(item => item === doc.data().b)) {
                    lastTime = doc.data().t
                    firebase.firestore().collection("users").doc(doc.data().b).get().then(doc=>{
                        dispatch(setUserData(doc.data()))
                    })
                    // dispatch(setUserData(doc.data()))
                    list.push(doc.data().b);
                }
            })
            dispatch(FAVS_LIST({
                list: list,
                lastTime: lastTime
            }))
        })
    }
}
export const favAdd = (fakeId) => {
    return (dispatch, getState) => {
        const { docId } = getState().auth.userData;
        const favsList = getState().favs.list ? getState().favs.list : [];
        let oldArray = favsList
        if(!oldArray.includes(fakeId)){
            firebase.firestore().collection("favs").add({
                a: docId,
                b: fakeId,
                t: firebase_app.firestore.FieldValue.serverTimestamp()
            })
            oldArray.unshift(fakeId)
            oldArray = oldArray.filter(item => item !== "")
            dispatch(FAVS_DATA_ADD_FIRST({
                list:oldArray
            }))
        }
        // let be = false
        // if (users) {
        //     users.forEach(doc2 => {
        //         if (doc2.id === fakeId) {
        //             be = true
        //         }
        //     })
        // }
        // if (!be){
        //     firebase.firestore().collection('users').doc(fakeId).get().then(doc => {
        //         let country = meta.country,
        //             city = meta.city,
        //             zip = meta.zip,
        //             age = doc.data().meta.birtDate.toDate();
        //         if (doc.data().meta.country !== 0) {
        //             country = doc.data().meta.country
        //             city = doc.data().meta.city
        //         }
        //         dispatch(FAVS_DATA_ADD_FIRST({
        //             data: [{
        //                 id: doc.id,
        //                 nickname: doc.data().meta.nickname,
        //                 gender: doc.data().meta.gender,
        //                 avatar: doc.data().meta.avatarThumb,
        //                 avatarLarge: doc.data().meta.avatarLarge,
        //                 like: doc.data().meta.like,
        //                 photos: doc.data().photos ? doc.data().photos.length : 0,
        //                 age: getAge(age),
        //                 badge: doc.data().badge ? doc.data().badge : "",
        //                 country: country,
        //                 city: city,
        //                 zip: zip,
        //             }]
        //         }))
        //     })
        // }
    };
};
export const favRemove = (fakeId) => {
    return (dispatch, getState) => {
        const { docId } = getState().auth.userData;
        const favsList = getState().favs.list;
        let oldArray = favsList
        firebase.firestore().collection("favs").where("a", "==", docId).where("b", "==", fakeId).get().then(doc => {
            doc.forEach(doc => {
                firebase.firestore().collection("favs").doc(doc.id).delete()
            })
        })
        oldArray = oldArray.filter(item => item !== fakeId)
        dispatch(FAVS_DATA_ADD_FIRST({
            list:oldArray
        }))
    };
};
export const favsUsers = (start, end) => {
    // return async (dispatch, getState) => {
    //     const { meta } = getState().auth.userData;
    //     const {list, users} = getState().favs;
    //     dispatch(startEvent())
    //     // if (start === 0){
    //     //     await dispatch(FAVS_RESET())
    //     // }
    //     if (list && list.length){
    //         list.forEach((doc, index) => {
    //             let be = false
    //             if (users){
    //                 users.forEach(doc2 => {
    //                     if (doc2){
    //                         if (doc2.id === doc) {
    //                             be = true
    //                         }
    //                     }
    //                 })
    //             }
    //             if (!be){
    //                 if (index >= start && index <= end) {
    //                     firebase.firestore().collection('users').doc(doc).get().then(doc => {
    //                         if (doc.data()){
    //                             let country = meta.country,
    //                                 city = meta.city,
    //                                 zip = meta.zip,
    //                                 age = doc.data().meta.birtDate.toDate();
    //                             if (doc.data().meta.country !== 0) {
    //                                 country = doc.data().meta.country
    //                                 city = doc.data().meta.city
    //                             }
    //                             dispatch(FAVS_DATA_ADD({
    //                                 data: {
    //                                     id: doc.id,
    //                                     nickname: doc.data().meta.nickname,
    //                                     gender: doc.data().meta.gender,
    //                                     avatar: doc.data().meta.avatarThumb,
    //                                     avatarLarge: doc.data().meta.avatarLarge,
    //                                     like: doc.data().meta.like,
    //                                     photos: doc.data().photos ? doc.data().photos.length : 0,
    //                                     age: getAge(age),
    //                                     badge: doc.data().badge ? doc.data().badge : "",
    //                                     country: country,
    //                                     city: city,
    //                                     zip: zip,
    //                                 }
    //                             }))
    //                             dispatch(endEvent())
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     }else{
    //         setTimeout(() => {
    //             dispatch(favsUsers())
    //         }, 1000)
    //     }
    // };
};
