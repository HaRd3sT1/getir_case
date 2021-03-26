

import firebase from '../../firebase.js';
import {setUserData} from "./users"
import { createAction } from 'redux-act';
export const ONLINE_USERS = createAction('ONLINE_USERS');


export const onlineUsersData = (size) => {
    return async (dispatch, getState) => {
        firebase.firestore().collection("users").where("online", "==", true).orderBy('lastLogin', 'desc').limit(size).get().then(doc => {
            let users = []
            doc.forEach(doc => {
                dispatch(setUserData(doc.data()))
                users.push(doc.id)
            })
            if (users && users.length) {
                dispatch(ONLINE_USERS(users))
            }
        })
    };
};