import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
import { getAge, getRandomInt} from "../../Hooks"
import {userId_2_S} from "../../Settings"

export const USERS_RESET = createAction('USERS_RESET');
export const GET_RANDOM_USER = createAction('GET_RANDOM_USER');
export const USERS_INIT = createAction('USERS_INIT');
export const USERS_FAIL = createAction('USERS_FAIL');
export const TWO_USERS_SUCCESS = createAction('TWO_USERS_SUCCESS');
export const PROFILE_USERS = createAction('PROFILE_USERS');

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

const clearUsers = () => {
  return (dispatch, getState) => {
    // console.log("clear")
    const users = getState().users;
    var size = Object.size(users);
    if(size > 300){
      dispatch(USERS_RESET());
    }
  };
};

const setUserData = (data) => {
  return (dispatch, getState) => {
    const usersList = getState().users;
    const { meta } = getState().auth.userData;
    const { online } = getState().generalDataReducer.length;
    // const userData = getState().auth.userData;
    // console.log(userData)
    if (data && data.meta && !usersList[data.docId]){
        let randomOnline = getRandomInt(5, data, online);
        let onlineStatus = randomOnline !== "" ? randomOnline : data.online
        let country = meta ? meta.country : "",
          city = meta ? meta.city : "",
          // zip = meta ? meta.zip : "",
          age = data.meta.birtDate ? data.meta.birtDate.toDate() : new Date();
        if (data.meta.country !== 0 && data.meta.city !== 0) {
          country = data.meta.country
          city = data.meta.city
        }
        let users = {
          id: data.docId,
          nickname: data.meta.nickname,
          // info: data.info,
          // gender: data.meta.gender,
          avatar: data.meta.avatarThumb === "noavatar.jpg" ? "/noavatar.jpg" : data.meta.avatarThumb,
          avatarLarge:  data.meta.avatarLarge === "noavatar.jpg" ? "/noavatar.jpg" : data.meta.avatarLarge,
          ab:  data.meta.ab === "noavatar.jpg" ? "/noavatar.jpg" : data.meta.ab,
          // avatarUrl: data.meta.avatarUrl === "noavatar.jpg" ? "/noavatar.jpg" : data.meta.avatarUrl,
          // hairColor: data.meta.hairColor,
          // style: data.meta.style,
          // extra: data.meta.extra,
          // eyeColor: data.meta.eyeColor,
          // body: data.meta.body,
          // height: data.meta.height,
          pl: data.photos.length,
          // photos: data.photos,
          // pBlur: data.pBlur ? data.pBlur : [],
          // hobs: data.hobs,
          online: onlineStatus,
          // relation: data.filter.relation,
          // filterGender: data.filter.gender,
          // like: data.meta.like,
          age: getAge(age),
          badge: data.badge ? data.badge : "",
          country: country,
          city: city,
          // zip: zip,
          // character: data.character ? data.character : [],
        }
        dispatch(PROFILE_USERS({ [data.docId]: users }));
    }
  };
};


const profileUser = (id) => {
  return (dispatch, getState) => {
    const { meta } = getState().auth.userData;
    if(!id){
      return null
    }
    firebase.firestore().collection("users").doc(userId_2_S(id)).onSnapshot(doc=>{
      if (doc.data()){
        let country = meta.country,
          city = meta.city,
          zip = meta.zip,
          age = doc.data().meta.birtDate.toDate();
        if (doc.data().meta.country !== 0 && doc.data().meta.city !== 0) {
          country = doc.data().meta.country
          city = doc.data().meta.city
        }
        let users = {
          id: doc.id,
          nickname: doc.data().meta.nickname,
          info: doc.data().info,
          gender: doc.data().meta.gender,
          avatar: doc.data().meta.avatarThumb === "noavatar.jpg" ? "/noavatar.jpg" : doc.data().meta.avatarThumb,
          avatarLarge: doc.data().meta.avatarLarge === "noavatar.jpg" ? "/noavatar.jpg" : doc.data().meta.avatarLarge,
          avatarUrl: doc.data().meta.avatarUrl === "noavatar.jpg" ? "/noavatar.jpg" : doc.data().meta.avatarUrl,
          ab:  doc.data().meta.ab ? doc.data().meta.ab : "/noavatar.jpg",
          hairColor: doc.data().meta.hairColor,
          eyeColor: doc.data().meta.eyeColor,
          body: doc.data().meta.body,
          height: doc.data().meta.height,
          style: doc.data().meta.style,
          extra: doc.data().meta.extra,
          pl: doc.data().photos.length,
          photos: doc.data().photos,
          pBlur: doc.data().pBlur ? doc.data().pBlur : [],
          hobs: doc.data().hobs,
          online: doc.data().online,
          relation: doc.data().filter.relation,
          filterGender: doc.data().filter.gender,
          like: doc.data().meta.like,
          age: getAge(age),
          badge: doc.data().badge ? doc.data().badge : "",
          country: country,
          city: city,
          zip: zip,
          character: doc.data().character ? doc.data().character : [],
        }
        dispatch(PROFILE_USERS({ [id]: users }));
      }
    })
    
  };
};
const getRandomFake = (size) => {
  return async (dispatch, getState) => {
    dispatch(USERS_INIT());
    const length = getState("state").generalDataReducer.length ? getState("state").generalDataReducer.length.user : 0
    const { meta } = getState().auth.userData;
    // let match = getState().users.match;
    var random = Math.floor(Math.random() * Math.floor(length));
    let arr = [];
    // match = []

    try {
      await firebase.firestore().collection("users").where("role", "==", 1).orderBy("id").startAt(random).limit(size ? size : 2).get().then(doc => {
        doc.forEach(doc => {
          
          // let randomOnline = getRandomInt(5, doc.data());
          // let onlineStatus = randomOnline !== "" ? randomOnline : doc.data().online
          let city = meta ? meta.city : ""
          if (doc.data().meta.city !== 0 || !city) {
            city = doc.data().meta.city
          }
          arr.push({
            id: doc.id,
            userId: doc.id,
            avatarLarge: doc.data().meta.avatarLarge,
            nickname: doc.data().meta.nickname,
            city: city,
            // online: onlineStatus,
            hobs: doc.data().hobs ? doc.data().hobs : [],
            age: getAge(doc.data().meta.birtDate.toDate()),
          })
        })
      });
    } catch (error) {
      console.log(error)
      return dispatch(USERS_FAIL({ error }));
    }
    if (size) {
    }else{
      return dispatch(
        TWO_USERS_SUCCESS({
          twoUsers: arr
        })
      );
    }
  }
};
const getRandomUser = (size) => {
  return (dispatch, getState) => {
    const { meta } = getState().auth.userData;
    const length = getState("state").generalDataReducer.length.user
    const userData = getState("state").auth.userData
    var random = Math.floor(Math.random() * Math.floor(length));
    let arr = [];
    try {
      firebase.firestore().collection("users").where("meta.gender", "==", userData.filter.gender).orderBy("id").startAt(random).limit(size).get().then(doc => {
        doc.forEach(doc => {
          
          // let randomOnline = getRandomInt(5, doc.data());
          // let onlineStatus = randomOnline !== "" ? randomOnline : doc.data().online
          let city = meta.city
          if (doc.data().meta.city !== 0) {
            city = doc.data().meta.city
          }
          arr.push({
            id: doc.id,
            userId: doc.id,
            avatarLarge: doc.data().meta.avatarLarge === "noavatar.jpg" ? "/noavatar.jpg" : doc.data().meta.avatarLarge,
            nickname: doc.data().meta.nickname,
            city: city,
            // online: onlineStatus,
            hobs: doc.data().hobs ? doc.data().hobs : [],
            age: getAge(doc.data().meta.birtDate.toDate()),
          })
          
        })
      });
    } catch (error) {
      console.log(error)
      // toastr.error('', error);
    }
    
  }
};
const checkUsers = (array) => {
  return (dispatch, getState) => {
    const usersList = getState().users;
    array.forEach(doc=>{
      if(!usersList[doc]){
        firebase.firestore().collection("users").doc(doc).get().then(doc=>{
          dispatch(setUserData(doc.data()))
        })
      }
    })
  }
};

export { getRandomUser, getRandomFake, profileUser, clearUsers, setUserData, checkUsers};
