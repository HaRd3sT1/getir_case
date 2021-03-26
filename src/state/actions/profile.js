import firebase_app from 'firebase/app';
import firebase from '../../firebase.js';
import ResizeImage from 'image-resize'
import { error} from "./dashboard"
import {firebaseError} from "../../Utils"

const resize = new ResizeImage({
    format: 'jpg',
    width: 640,
    outputType: "blob"
});

const resize2 = new ResizeImage({
    format: 'jpg',
    width: 300,
    outputType: "blob"
});

const resize3 = new ResizeImage({
    format: 'jpg',
    width: 64,
    outputType: "blob"
});

export const photoUpdate2 = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        const { locale } = getState().preferences;
        resize.play(e).then((response) => {
            if (response.size < 200000) {
                firebase.storage().ref('images/' + userData.docId + '/' + e.files[0].name).put(response).then(doc => {
                    firebase.storage().ref('images/' + userData.docId + '/' + e.files[0].name).getDownloadURL().then(url => {
                        let arr = userData.photos
                        if (arr) {
                            arr.push(url)
                        } else {
                            arr = [url]
                        }
                        firebase.firestore().collection('users').doc(userData.docId).update({
                            photos: arr
                        })
                    })
                })
            } else {
                dispatch(error(firebaseError("General.fotografBuyuk", locale), "error", true))
            }
        })
    }
}

export const photoUpdate = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        const prize = getState().generalDataReducer.prize;
        resize.play(e).then((response) => {
            if (response.size < 200000) {
                firebase.storage().ref('images/' + userData.docId + '/avatar.jpg').put(response).then(doc => {
                    firebase.storage().ref('images/' + userData.docId + '/avatar.jpg').getDownloadURL().then(url => {
                        firebase.firestore().collection('users').doc(userData.docId).update({
                            "meta.avatarUrl": url
                        }).catch(doc => { console.log(doc.message) })
                    }).catch(doc => { console.log(doc.message) });
                }).catch(doc => { console.log(doc.message) });
            }
        }).catch(doc => {console.log(doc.message) })

        resize2.play(e).then((response) => {
            firebase.storage().ref('images/' + userData.docId + '/avatarLarge.jpg').put(response).then(doc => {
                firebase.storage().ref('images/' + userData.docId + '/avatarLarge.jpg').getDownloadURL().then(url => {
                    firebase.firestore().collection('users').doc(userData.docId).update({
                        "meta.avatarLarge": url
                    }).catch(doc => { console.log(doc.message) })
                }).catch(doc => { console.log(doc.message) });
            }).catch(doc => { console.log(doc.message) });
        }).catch(doc => {console.log(doc.message) })

        resize3.play(e).then((response) => {
            firebase.storage().ref('images/' + userData.docId + '/avatarThumb.jpg').put(response).then(doc => {
                firebase.storage().ref('images/' + userData.docId + '/avatarThumb.jpg').getDownloadURL().then(async url => {
                    firebase.firestore().collection('users').doc(userData.docId).update({
                        "meta.avatarThumb": url,
                    }).catch(doc => { console.log(doc.message) })
                    if (userData.prize.profilePhoto === 0) {

                        //check coin
                        let userData2 = await firebase.firestore().collection("users").doc(userData.docId).get()
                        if(Number(userData.coin) !== userData2.data().coin){
                            return null
                        }

                        firebase.firestore().collection('users').doc(userData.docId).update({
                            "prize.profilePhoto": 1,
                            coin: Number(userData.coin) + Number(prize.profilePhotoCoin)
                        }).then(doc => {
                            //history
                            firebase.firestore().collection("history").add({
                                t: "p_profile_photo",
                                a: userData.docId,
                                c: prize.profilePhotoCoin,
                                u: Number(userData.coin) + Number(prize.profilePhotoCoin),
                                time: firebase_app.firestore.FieldValue.serverTimestamp()
                            })
                        }).catch(doc => { console.log(doc.message) })
                    }
                }).catch(doc => { console.log(doc.message) });
            }).catch(doc => { console.log(doc.message) });
        }).catch(doc => { console.log(doc.message) })
    }
}

export const editFunction1 = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        const form = getState().form;
        firebase.firestore().collection('users').doc(userData.docId).update({
            "meta.height": form.formHeight,
            "meta.body": form.formBody,
            "meta.eyeColor": form.formEyeColor,
            "meta.hairColor": form.formHairColor,
            "meta.style": form.formStyle,
            "meta.extra": form.formExtra,
        })
    }
}
export const editFunction2 = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        const form = getState().form;
        let arr =[]
        form.formHobs.forEach(doc=>{
            arr.push(Number(doc.value))
        })
        firebase.firestore().collection('users').doc(userData.docId).update({
            "hobs": arr
        })
    }
}

export const editFunction3 = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        const form = getState().form;
        let arr = []
        form.filterRelation.forEach(doc => {
            arr.push(Number(doc.value))
        })
        firebase.firestore().collection('users').doc(userData.docId).update({
            "filter.relation": arr,
            "filter.gender": Number(form.filterGender),
            "filter.age": form.filterAge,
            "filter.country": form.filterCountry,
            "filter.city": form.filterCity,
        })
    }
}
export const infoUpdate = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        const form = getState().form;
        firebase.firestore().collection('users').doc(userData.docId).update({
            "info": form.info
        })
    }
}
export const editFunction4 = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        const form = getState().form;
        firebase.firestore().collection('users').doc(userData.docId).update({
            "meta.birtDate": new Date(form.birthDate),
            "meta.gender": Number(form.formGender),
            "meta.country": form.formCountry,
            "meta.zip": Number(form.formZip),
            "meta.city": form.formCity,
            "info": form.formInfo ? form.formInfo : "",
        })
        if (form.formPassword) {
                firebase.auth().signInWithEmailAndPassword(userData.meta.email, userData.meta.password)
                firebase.auth().currentUser.updatePassword(form.formPassword.toString()).then((e) => {
                    firebase.firestore().collection("users").doc(userData.docId).update({
                        "meta.password": form.formPassword.toString(),
                    })
                })
        }
    }
}
export const editCharacters = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        const form = getState().form;
        let arr =[],
        arr2 =[],
        arr3 =[],
        arr4 =[],
        arr5 =[]
        form.formSprachen.forEach(doc=>{
            arr.push(doc.value)
        })
        form.formSport.forEach(doc=>{
            arr2.push(doc.value)
        })
        form.formMusik.forEach(doc=>{
            arr3.push(doc.value)
        })
        form.formFilme.forEach(doc=>{
            arr4.push(doc.value)
        })
        form.formUnterhaltung.forEach(doc=>{
            arr5.push(doc.value)
        })
        firebase.firestore().collection('users').doc(userData.docId).update({
            "character.sprachen": arr,
            "character.sport": arr2,
            "character.musik": arr3,
            "character.filme": arr4,
            "character.unterhaltung": arr5,
            "character.berufsstand":form.formBerufsstand,
            "character.beziehungsstatus":form.formBeziehungsstatus,
            "character.kinder":form.formKinder,
            "character.abschluss":form.formAbschluss,
        })
    }
}
export const settingsSave = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        const form = getState().form;
        const { locale } = getState().preferences;
        firebase.firestore().collection('users').doc(userData.docId).update({
            notification: form.formNotification
        })
        if (form.formPassword) {
            if(form.formPassword.toString().length < 6){
                dispatch(error(firebaseError("General.sifreEnAz6Karakter",locale), "error", true))
                return null
            }
            if(form.formPassword !== form.formPassword2){
                dispatch(error(firebaseError("General.sifreEslesmiyor",locale), "error", true))
                return null
            }
            if(userData.meta.password === form.formPasswordOld){
                await firebase.auth().signInWithEmailAndPassword(userData.meta.email, userData.meta.password)
                firebase.auth().currentUser.updatePassword(form.formPassword.toString()).then((e) => {
                    firebase.firestore().collection("users").doc(userData.docId).update({
                        "meta.password": form.formPassword.toString(),
                    })
                })
                dispatch(error(firebaseError("General.duzenlemeKaydedildi",locale), "success", true))
            }else{
                dispatch(error(firebaseError("General.sifreYanlis",locale), "error", true))
            }
        }else{
            dispatch(error(firebaseError("General.duzenlemeKaydedildi",locale), "success", true))
        }
    }
}
export const deletePhoto = (e) => {
    return async (dispatch, getState) => {
        const userData = getState().auth.userData;
        let arr = userData.photos
        arr.splice(e, 1)
        firebase.firestore().collection('users').doc(userData.docId).update({
            photos: arr
        })
    }
}