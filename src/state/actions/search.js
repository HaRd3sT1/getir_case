

import firebase from '../../firebase.js';
import {setUserData} from "./users"
import { createAction } from 'redux-act';
export const SEARCH_USERS_DATA_RESET_SIZE = createAction('SEARCH_USERS_DATA_RESET_SIZE');
export const SEARCH_USERS_DATA_RESET = createAction('SEARCH_USERS_DATA_RESET');
export const SEARCH_USERS_DATA_ASC = createAction('SEARCH_USERS_DATA_ASC');
export const SEARCH_USERS_DATA = createAction('SEARCH_USERS_DATA');


export const searchDataReset = (size) =>{
    return (dispatch, getState) => {
        const searchUsers = getState().searchUsers && getState().searchUsers.list ? getState().searchUsers.list : [];
        if(size){
            let arr = []
            searchUsers.forEach((doc, index) =>{
                if(index < size){
                    arr.push(doc)
                }
            })
            dispatch(SEARCH_USERS_DATA_RESET_SIZE(arr))
        }else{
            dispatch(SEARCH_USERS_DATA_RESET())
        }
    }
}
export const searchData = (size, reset, asc, type, page) => {
    return async(dispatch, getState) => {
        // const { meta } = getState().auth.userData;
        const { length } = getState().generalDataReducer;
        // let searchUsersYedek = getState().dashboard.searchUsers;
        const { searchNickname, searchCountry, searchCity, searchGender, searchRange } = getState().form;
        if(type === "nickname" && !searchNickname){
            return null
        }
        let onlyFirst = true
        let _size = size;

        if (reset) {
            dispatch(SEARCH_USERS_DATA_RESET())
        }
        if (type === "nickname") {
            _size = 1
        }
        if (type === "dashboard" && searchNickname) {
            _size = 1
        }
        for (let index = 0; index < _size; index++) {
            let data = firebase.firestore().collection('users')
            if (type === "nickname") {
                data = data.where("meta.nickname_search", ">=", searchNickname.toLowerCase()).limit(size)
            }else{
                if(type === "dashboard" && searchNickname){
                    data = data.where("meta.nickname_search", ">=", searchNickname.toLowerCase()).limit(size)
                }else{
                    if (searchCountry) {
                        data = data.where("meta.country", "==", searchCountry)
                    }
                    if (searchCity) {

                        data = data.where("meta.city", "==", searchCity)
                    }
                    if (searchGender) {
                        data = data.where("meta.gender", "==", Number(searchGender))
                    }
                    if (searchRange) {
                        data = data.where("range", "==", Number(searchRange))
                    }
                    let random = Math.floor(Math.random() * Math.floor(length.user));
                    data = data.orderBy("id").startAt(length.user - random).limit(1)
                }
            }
            data.get().then(async data => {
                const searchUsers = getState().search.list ? getState().search.list : [];
                let users = [];
                data.forEach(doc => {
                    if (!doc.id || doc.data().delete){
                        return null
                    }
                    if(type !== "nickname" && !searchNickname && page === "home"){
                        if(doc.data().meta.avatarUrl === "noavatar.jpg"){
                            return null
                        }
                    }
                    dispatch(setUserData(doc.data()))
                    if (users.some(item => item.id === doc.id)) {
                        return null
                    }
                    //  && !reset
                    if (searchUsers && searchUsers.length){
                        if (searchUsers.some(item => item === doc.id)){
                            return null
                        }
                    }
                    users.push(doc.id)
                })
                // console.log(users);
                if (users && users.length){
                    if (asc){
                        dispatch(SEARCH_USERS_DATA_ASC(users))
                    }else{

                        dispatch(SEARCH_USERS_DATA(users))
                    }
                    // if(users.length < (size-1)){
                    // dispatch(noResultFakes(size, reset, asc, type)) 
                    // }
                }else{
                    if(onlyFirst){
                        onlyFirst = false
                        dispatch(noResultFakes(size, reset, asc, type, page))
                        if(reset){
                            //dispatch(SEARCH_USERS_DATA(searchUsersYedek))
                        }
                    }
                }
            })  
        }

    }
}
const noResultFakes = (size, reset, asc, type, page) => {
    return async(dispatch, getState) => {
        const searchUsers =  getState().searchUsers && getState().searchUsers.list ? getState().searchUsers.list : [];
        const {searchGender, searchRange, searchCountry, searchCity, searchNickname } = getState().form;
        let data = firebase.firestore().collection('users')
        let onlyFirst = true;
        if (searchCountry) {
            data = data.where("meta.country", "==", searchCountry)
        }
        if (searchCity) {
            data = data.where("meta.city", "==", searchCity)
        }
        if (searchGender) {
            data = data.where("meta.gender", "==", Number(searchGender))
        }
        if (searchRange) {
            data = data.where("range", "==", Number(searchRange))
        }
        data = data.orderBy("timestamp", "desc").limit(size)
        data.get().then(async data => {
            let users = [];
            data.forEach(doc => {
                if (!doc.id){
                    return null
                }
                if(type !== "nickname" && !searchNickname && page === "home"){
                    if(doc.data().meta.avatarUrl === "noavatar.jpg"){
                        return null
                    }
                }
                dispatch(setUserData(doc.data()))
                if (users.some(item => item.id === doc.id)) {
                    return null
                }
                if (searchUsers && searchUsers.length && !reset){
                    if (searchUsers.some(item => item.id === doc.id)){
                        return null
                    }
                }
                users.push(doc.id)
            })
            if (users && users.length){
                if (asc){
                    dispatch(SEARCH_USERS_DATA_ASC(users))
                }else{

                    dispatch(SEARCH_USERS_DATA(users))
                }
                if(users.length < (size-1)){
                   dispatch(noResultCountry(size, reset, asc, type, page)) 
                }
            }else{
                if(onlyFirst){
                    onlyFirst = false
                    dispatch(noResultCountry(size, reset, asc, type, page))
                }
            }
        })  

    }
}
const noResultCountry = (size, reset, asc, type, page) => {
    return async(dispatch, getState) => {
        // const { meta } = getState().auth.userData;
        // const { length } = getState().generalDataReducer;
        const searchUsers =  getState().searchUsers && getState().searchUsers.list ? getState().searchUsers.list : [];
        //  searchNickname, searchCountry, searchCity, 
        const {searchGender, searchRange, searchNickname} = getState().form;
        let data = firebase.firestore().collection('users').where("meta.city", "==", 0)
        if (searchGender) {
            data = data.where("meta.gender", "==", Number(searchGender))
            // firebase.analytics().logEvent('search_gender', { user: meta.nickname, search: searchGender });
        }
        if (searchRange) {
            data = data.where("range", "==", Number(searchRange))
            // firebase.analytics().logEvent('search_range', { user: meta.nickname, search: searchRange });
        }
        // 
        data = data.orderBy("timestamp", "desc").limit(size)
        data.get().then(async data => {
            let users = [];
            data.forEach(doc => {
                if (!doc.id || doc.data().delete){
                    return null
                }
                if(type !== "nickname" && !searchNickname && page === "home"){
                    if(doc.data().meta.avatarUrl === "noavatar.jpg"){
                        return null
                    }
                }
                dispatch(setUserData(doc.data()))
                if (users.some(item => item.id === doc.id)) {
                    return null
                }
                if (searchUsers && searchUsers.length && !reset){
                    if (searchUsers.some(item => item.id === doc.id)){
                        return null
                    }
                }
                users.push(doc.id)
            })
            if (users && users.length){
                if (asc){
                    dispatch(SEARCH_USERS_DATA_ASC(users))
                }else{

                    dispatch(SEARCH_USERS_DATA(users))
                }
            }
        })  

    }
}
export {noResultFakes, noResultCountry}