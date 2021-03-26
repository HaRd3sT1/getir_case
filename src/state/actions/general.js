import { createAction } from 'redux-act';
import firebase from '../../firebase.js';
// import Client from 'shopify-buy';
import {defaultColors} from "../../Settings"

export const GENERAL_DATA = createAction('GENERAL_DATA');
export const INFO_DATA = createAction('INFO_DATA');
export const PRIZE_DATA = createAction('PRIZE_DATA');
export const SITE_DATA = createAction('SITE_DATA');
export const GENERAL_INIT = createAction('GENERAL_INIT');
export const GENERAL_ERROR = createAction('GENERAL_ERROR');
export const TOTAL_DATA = createAction('TOTAL_DATA');
export const PACKETS_DATA = createAction('PACKETS_DATA');
export const FAQ_DATA = createAction('FAQ_DATA');
export const ONLINE_DATA = createAction('ONLINE_DATA');
export const SET_COIN = createAction('SET_COIN');
export const GIFTS_DATA = createAction('GIFTS_DATA');

export const defaultColorsSet = () => {
  let root = document.documentElement;
  root.style.setProperty('--primary-color', defaultColors.primary);
  root.style.setProperty('--primary-color-dark', defaultColors.primaryH);
  root.style.setProperty('--success-color', defaultColors.success);
  root.style.setProperty('--success-color-dark', defaultColors.successH);
}
export const generalData = () => {
    return async (dispatch) => {
      // dispatch(GENERAL_INIT());
      firebase.firestore().collection("settings").doc("general").onSnapshot(doc=>{
        if(doc.data()){
          return dispatch(
              GENERAL_DATA(doc.data())
          );
        }
      })
    };
  };

  export const onlineUsers = () => {
    return async (dispatch, getState) => {
      const { onlineUsers } = getState().generalDataReducer;
      const lenght = getState().generalDataReducer.length && getState().generalDataReducer.length.online ? getState().generalDataReducer.length.online : 3000;
      if(onlineUsers){
        var y = Math.random();
        if (y < 0.5){
          dispatch(ONLINE_DATA(onlineUsers + ((-6) + Math.floor((6 - (-6)) * Math.random()))))
        }
        
      }else{
        dispatch(ONLINE_DATA(lenght + Math.floor(Math.random(lenght) * 1000)))
      }
      
    };
  };
  export const setCoin = (coin) => {
    return async (dispatch, getState) => {
      dispatch(SET_COIN(coin))
    };
  };

  export const infoData = () => {
    return async (dispatch) => {
      // dispatch(GENERAL_INIT());
      firebase.firestore().collection("settings").doc("info").get().then(doc => {
        if (doc.data()) {
          return dispatch(
            INFO_DATA(doc.data())
          );
        }
      })
    };
  };
  export const giftsData = () => {
    return async (dispatch) => {
      // dispatch(GENERAL_INIT());
      firebase.firestore().collection("gifts").orderBy("coin").get().then(doc => {
        let arr = []
        doc.forEach(doc=>{
          arr.push(doc.data())
        })
        dispatch(GIFTS_DATA(arr));
      })
    };
  };
  export const prizeData = () => {
    return async (dispatch) => {
      // dispatch(GENERAL_INIT());
      firebase.firestore().collection("settings").doc("prize").get().then(doc => {
        if (doc.data()) {
          return dispatch(
            PRIZE_DATA(doc.data())
          );
        }
      })
    };
  };
    
  export const siteData = () => {
    return (dispatch) => {
      // dispatch(GENERAL_INIT());
      firebase.firestore().collection("settings").doc("templates").collection("data").get().then(doc=>{
        let arr = []
        doc.forEach(doc=>{
          arr[doc.data().id] = doc.data()
        })
        return dispatch(SITE_DATA(arr));
      })
    };
  };

export const totalLength = () => {
  return (dispatch) => {
    // dispatch(GENERAL_INIT());
    firebase.firestore().collection("totalLength").onSnapshot(doc => {
      if (doc.size) {
        return dispatch(TOTAL_DATA({
          fake: doc.docs[0].data().length,
          user: doc.docs[2].data().length,
          online:doc.docs[1].data().length,
        }));
      }
    })
  };
};

export const Packets = () => {
  return (dispatch) => {
    // dispatch(GENERAL_INIT());
    firebase.firestore().collection("settings").doc("packets").collection("data").orderBy("id").get().then(doc => {
      let arr = []
      doc.forEach(doc => {
        arr.push(doc.data())
      })
      dispatch(PACKETS_DATA(arr));
    })
  };
};

export const Faq = () => {
  return (dispatch) => {
    firebase.firestore().collection("settings").doc("faq").get().then(doc => {
      dispatch(FAQ_DATA(doc.data()));
    })
  };
};
