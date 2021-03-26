
import firebase from '../../firebase.js';
import { createAction } from 'redux-act';
import {setUserData} from "./users"
export const LAST_USERS = createAction('LAST_USERS');

export const lastUsersData = (size) => {
    return async (dispatch, getState) => {
        // console.log(1)
        const { docId } = getState().auth.userData;
        // const { meta } = getState().auth.userData;
        await firebase.firestore().collection("users").where("role", "==", 1).orderBy("timestamp", "desc").limit(size ? Math.round(size / 2) : 3).get().then(doc => {
            let fakes = []
            doc.forEach(doc => {
                dispatch(setUserData(doc.data()))
                fakes.push(doc.id)
            })
            firebase.firestore().collection("users").orderBy("timestamp", "desc").limit(size ? Math.round(size / 2) : 7).get().then(doc => {
                let users = fakes
                doc.forEach(doc => {
                    dispatch(setUserData(doc.data()))
                    if (doc.id !== docId) {
                        users.push(doc.id)
                    }
                })
                if (users && users.length) {
                    dispatch(LAST_USERS(users))
                }
            })
        })
    };
};