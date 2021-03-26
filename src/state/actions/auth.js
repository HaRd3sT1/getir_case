
import { createAction } from 'redux-act';
import firebase_app from 'firebase/app';
import firebase from '../../firebase.js';
import geohash from "ngeohash";
import { logUser} from "./logs"
import { onChange} from "./form"
import { logsUpdate} from "./logs"
import { setCoin} from "./general"
import {firebaseError} from "../../Utils"
import {getRandomNumber,getAge, toDateTime} from "../../Hooks"
import { messagesListReset} from './messagesList';
import { messagesReset} from './messages';

const oldRealTimeDb = firebase.database();
let onlyOne = true;
export const AUTH_START = createAction('AUTH_START');
export const AUTH_END = createAction('AUTH_END');
export const AUTH_FAIL = createAction('AUTH_FAIL');
export const AUTH_RESET = createAction('AUTH_RESET');
export const AUTH_CLEAN_UP = createAction('AUTH_CLEAN_UP');
export const AUTH_USER_DATA = createAction('AUTH_USER_DATA');
export const COINS_DATA = createAction('COINS_DATA');

const logout = () => {
  return async (dispatch) => {

    const { W, X } = firebase.auth();
    let userId = W ? W : X
    dispatch(AUTH_START());
    // dispatch(onChange("email", ""))
    // dispatch(onChange("password", ""))
    await firebase.auth().signOut();
    if(userId){
      dispatch(messagesReset());
      dispatch(messagesListReset());
      await firebase.firestore().collection("users").doc(userId).update({
        online:false
      })
    }
    dispatch(AUTH_RESET())
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
};

const sendResetPassword = () => {
  return async (dispatch, getState) => {
    const { email } = getState().form;
    try {
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(email).then(function() {
        dispatch(AUTH_FAIL({ error: {type:"success", message:"Ein Reset-Link wurde an Ihre E-Mail gesendet."} }))
      });
    } catch (error) {
      console.log(error)
    }
  };
};
const sendPassword = () => {
  return async (dispatch, getState) => {
    const { email } = getState().form;
    const { general } = getState().generalDataReducer;
    try {
      firebase.firestore().collection("users").where("meta.email", "==", email).get().then(doc => {
        doc.forEach(doc => {
          firebase.firestore().collection("sendMail").add({
            timestamp: firebase_app.firestore.FieldValue.serverTimestamp(),
            userId: doc.id,
            message: "Ihr Passwort: <b style='color:red'>" + doc.data().meta.password + "</b>",
            title: general.link + " - Passwort-Erinnerungsservice",
          })
        })
      })
    } catch (error) {
      console.log(error)
    }
  };
};
const resetPassword = (auth, actionCode, continueUrl, lang, redirect_Status) => {
  return async (dispatch, getState) => {
    const { password } = getState().form;
    try {
      auth.verifyPasswordResetCode(actionCode).then(email => {
        if (password) {
          auth.confirmPasswordReset(actionCode, password).then(async resp => {
            let be = 0
            await firebase.firestore().collection("users").where("meta.email", "==", email).get().then(doc => {
              doc.forEach(async doc => {
                be = 1
                await firebase.firestore().collection("users").doc(doc.id).update({
                  "meta.password": password
                }).catch(err => { 
                  console.log(err)
                  dispatch(AUTH_FAIL({ error: {type:"error", message:err.message} }));
                });
                firebase.analytics().logEvent('reset_pass', { id: doc.id });
                dispatch(AUTH_FAIL({ error: {type:"success", message:"Success"}}));
                auth.signInWithEmailAndPassword(email, password);
                redirect_Status("true")
                // setTimeout(doc => {
                //   this.setState({ redirect: true })
                //   window.location.reload(true)
                // }, 3000)
              })
            }).catch(err => {
              console.log(err)
              dispatch(AUTH_FAIL({ error: {type:"error", message:err.message} }));
            });
            if (be === 0) {
              await firebase.firestore().collection("users_register").where("meta.email", "==", email).get().then(doc => {
                doc.forEach(async doc => {
                  await firebase.firestore().collection("users_register").doc(doc.id).update({
                    "meta.password": password
                  }).catch(err => {
                    console.log(err)
                    dispatch(AUTH_FAIL({ error: {type:"error", message:err.message} }));
                  });

                  dispatch(AUTH_FAIL({ error: {type:"success", message:"Sucess"} }));
                  redirect_Status("true")
                  // setTimeout(doc => {
                  //   this.setState({ redirect: true })
                  //   window.location.reload(true)
                  // }, 3000)
                })
              }).catch(err => {
                console.log(err)
                dispatch(AUTH_FAIL({ error: {type:"error", message:err.message} }));
              });
            }
          }).catch(err => {
            console.log(err)
            dispatch(AUTH_FAIL({ error: {type:"error", message:err.message} }));
          })
        } else {
          dispatch(AUTH_FAIL({ error: {type:"error", message:"Passwort eingeben"} }));
        }
      })
    } catch (err) {
      console.log(err)
      dispatch(AUTH_FAIL({ error: {type:"error", message:err.message} }));
    }
  };
};

const verifyAuth = () => {
  return async (dispatch) => {

    dispatch(AUTH_START());

    var __url_string = window.location.href;
    var __url = new URL(__url_string);
    if (__url.searchParams.get("email") && __url.searchParams.get("password")) {
      await dispatch(loginAuth(__url.searchParams.get("email"), __url.searchParams.get("password")))
    }
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user)
      if (user) {
        // AUTH_USER_DATA({ id: user.uid })
        dispatch(fetchUserData())
        
      } else {
          return dispatch(AUTH_RESET());
      }
    });
    dispatch(AUTH_END());
  };
};

const handleVerifyEmail = (auth, actionCode, continueUrl, lang, redirect_Status, loadingSet) => {
  return async (dispatch, getState) => {
    const { locale } = getState().preferences;
    let iud = continueUrl.split("?")[1]
    auth.applyActionCode(actionCode).then(async (resp) => {
      // dispatch(AUTH_FAIL({ error: {type:"success", message:firebaseError("General.hesapOnaylandi", locale)} }));
      // console.log(iud);
      firebase.firestore().collection("users").doc(iud).update({
        verify: true
        // timestamp: firebase_app.firestore.FieldValue.serverTimestamp()
      })
      firebase.analytics().logEvent('verify', { id: iud });
      firebase.firestore().collection("users").doc(iud).get().then(doc=>{
        if(doc.data()){
          dispatch(loginAuth(doc.data().meta.email, doc.data().meta.password))
          if(doc.data().lr){
            redirect_Status(doc.data().lr)
            loadingSet(100)
          }else{
            redirect_Status(true)
            loadingSet(100)
          }
        }else{
          loadingSet(100)
          dispatch(AUTH_FAIL({ error: {type:"error", message:"Kein Benutzer verfügbar. Bitte kontaktieren Sie uns"} }));
        }
      })
      // let auto_message = await firebase.firestore().collection("auto_messages").get()
      // let _length = auto_message.docs.length
      // console.log(_length);
      // if (_length) {
      //   let rand = Math.floor(Math.random() * _length)
      //   console.log(rand);
      //   let data = auto_message.docs[rand]
      //   console.log(data);
      //   console.log([data.data().fakeId, data.data().message, data.data().photo, data.data().time]);
      //   await firebase.firestore().collection("users").doc(iud).update({
      //     newsletterData: [data.data().fakeId, data.data().message, data.data().photo, data.data().time],
      //     newsletter: true
      //   })
      // }
    }).catch(err => {
      loadingSet(100)
      console.log(err)
      dispatch(AUTH_FAIL({ error: {type:"error", message:err.message} }));
      dispatch(sendEmail())
    })
  };
};

const fetchUserData = () => {
  return async (dispatch, getState) => {
    dispatch(AUTH_START());
    const { W, X } = firebase.auth();
    let userId = W ? W : X

    if (userId) {
      let first = true
      firebase.firestore().collection("users").doc(userId).onSnapshot(doc => {
        const { general } = getState().generalDataReducer;
        // console.log("userget");
        // console.log(general);
        const userDataOld = getState().auth.userData;
        const userData = firebase.auth();
        if (doc.data() && (userData.W || userData.X)) {
          if(!doc.data().online){
            oldRealTimeDb.ref('.info/connected').on('value', snapshot => {
                oldRealTimeDb.ref(`/onlineUsers/${doc.id}`).onDisconnect().remove().then(() => {
                    oldRealTimeDb.ref(`/onlineUsers/${doc.id}`).set(doc.id);
                })
            })
          }
          if(userDataOld.coin){
            if(userDataOld.coin < doc.data().coin){
              dispatch(setCoin(doc.data().coin - userDataOld.coin))
            }
            if(userDataOld.badge !== doc.data().badge){
              dispatch(setCoin(doc.data().badge))
            }
          }
          if (general) {
            if (doc.data().discount){
                dispatch(
                  COINS_DATA({
                    gifCoin: Math.floor(Number(general.gifCoin) * (100 - Number(doc.data().discount)) / 100),
                    messageCoin: Math.floor(Number(general.messageCoin) * (100 - Number(doc.data().discount)) / 100),
                    messagePhotoCoin: Math.floor(Number(general.messagePhotoCoin) * (100 - Number(doc.data().discount)) / 100),
                    photoCoin: Math.floor(Number(general.photoCoin) * (100 - Number(doc.data().discount)) / 100),
                    profilePhotoCoin: Math.floor(Number(general.profilePhotoCoin) * (100 - Number(doc.data().discount)) / 100)
                  })
                );
            }else{
                dispatch(
                  COINS_DATA({
                    gifCoin: Number(general.gifCoin),
                    messageCoin: Number(general.messageCoin),
                    messagePhotoCoin: Number(general.messagePhotoCoin),
                    photoCoin: Number(general.photoCoin),
                    profilePhotoCoin: Number(general.profilePhotoCoin)
                  })
                );
            }
          }else{
            // console.log("update");
            firebase.firestore().collection("users").doc(userId).update({
              r:Math.random()
            })
          }

          dispatch(
            AUTH_USER_DATA({
              ...doc.data(),
            })
          );
          if(first){
            first = false;
            // let randomTime = 40000 * getRandomNumber(12)
            // setTimeout(() => {
              firstMessage(userId, doc.data().meta.nickname, doc.data().meta.avatarThumb, doc.data().meta.city, doc.data().meta.birtDate)
            // }, randomTime);
            setTimeout(() => {
              dispatch(logUser())
            }, 1000)
          }
        } else {
          return dispatch(AUTH_RESET());
        }
      })
    }else{
      dispatch(AUTH_END());
    }
  };
};
const firstMessage = (userId, nickname, avatar, city, birtDate) => {
  firebase.firestore().collection("auto_messages").where("type", "==", "first").get().then(doc=>{
    let messages = []
    doc.forEach(doc=>{
      messages.push(doc.data())
    })
    if(messages && messages.length){
      let random = Math.floor(Math.random() * Math.floor(messages.length)) 
      let selectMessage = messages[random]
      if(!selectMessage){
        return null
      }
      let _birtDate = toDateTime(birtDate.seconds)

      let  message = selectMessage.message
      message = message.replaceAll("%username%", nickname)
      message = message.replaceAll("%region%", city)
      message = message.replaceAll("%alt%", getAge(_birtDate))

      firebase.firestore().collection("messagesList").where("to", "==", [userId,selectMessage.fake_id]).limit(1).get().then(doc=>{
        if(!doc.size){
          firebase.firestore().collection("messages").where("get", "==", userId).where("message", "==", message).limit(1).get().then(doc=>{
            if(!doc.size){
              firebase.firestore().collection("newsletterWaiting").where("f", "==", selectMessage.fake_id).where("u", "==", userId).limit(1).get().then(doc=>{
                if(!doc.size){
                  firebase.firestore().collection("users").doc(selectMessage.fake_id).get().then(doc=>{
                    if(doc.data()){
                      firebase.firestore().collection("newsletterWaiting").add({
                        s:true,
                        m:message,
                        u:userId,
                        f:selectMessage.fake_id,
                        t:3,
                        d:[
                          {
                            a:avatar,
                            n:nickname
                          },
                          {
                            a:doc.data().meta.avatarThumb,
                            n:doc.data().meta.nickname
                          }
                        ]
                      })
                      if(selectMessage.message2){
                        let  message2 = selectMessage.message2
                        message2 = message2.replaceAll("%username%", nickname)
                        message2 = message2.replaceAll("%region%", city)
                        message2 = message2.replaceAll("%alt%", getAge(_birtDate))
                        // setTimeout(() => {
                          firebase.firestore().collection("newsletterWaiting").add({
                            s:true,
                            m:message2,
                            u:userId,
                            f:selectMessage.fake_id,
                            t:5,
                            d:[
                              {
                                a:avatar,
                                n:nickname
                              },
                              {
                                a:doc.data().meta.avatarThumb,
                                n:doc.data().meta.nickname
                              }
                            ]
                          })
                        // }, 150000);
                      }
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}
const profilMessage = (userId, nickname, avatar, fakeId, city, birtDate) => {
  if(!onlyOne){
    return null;
  }else{
    onlyOne = false
  }
  firebase.firestore().collection("auto_messages").where("type", "==", "profile").get().then(doc=>{
    let messages = []
    doc.forEach(doc=>{
      messages.push(doc.data())
    })
    if(messages.length){
      let random = Math.floor(Math.random() * Math.floor(messages.length)) 
      let selectMessage = messages[random]
      let _birtDate = toDateTime(birtDate.seconds)
      let message = selectMessage.message
      message = message.replaceAll("%username%", nickname)
      message = message.replaceAll("%region%", city)
      message = message.replaceAll("%alt%", getAge(_birtDate))


      firebase.firestore().collection("messages").where("message", "==", selectMessage.message).where("get", "==", userId).limit(1).get().then(doc=>{
        if(!doc.size){
          firebase.firestore().collection("messagesList").where("to", "==", [userId,fakeId]).limit(1).get().then(doc=>{
            if(!doc.size){
              firebase.firestore().collection("newsletterWaiting").where("m", "==", selectMessage.message).where("u", "==", userId).limit(1).get().then(doc=>{
                if(!doc.size){
                  firebase.firestore().collection("users").doc(fakeId).get().then(doc=>{
                    if(doc.data()){
                      firebase.firestore().collection("newsletterWaiting").add({
                        s:true,
                        m:selectMessage.message,
                        u:userId,
                        f:fakeId,
                        t:3,
                        d:[
                          {
                            a:avatar,
                            n:nickname
                          },
                          {
                            a:doc.data().meta.avatarThumb,
                            n:doc.data().meta.nickname
                          }
                        ]
                      })
                    }
                  })
                } 
              })
            } 
          })
        }
      })
    }
  })
}
const sendEmail = (e) => {
  return (dispatch, getState) => {
    const { general } = getState().generalDataReducer;
    const { W, X } = firebase.auth();
    let userId = W ? W : X
    try {
      var actionCodeSettings = {
        url: general.link + '?' + userId
      };
      firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
    } catch (err) {
      console.log(err)
    }
  }
}
const deleteProfile = (e) => {
  return (dispatch, getState) => {
    const { docId } = getState().auth.userData;
    try {
      firebase.firestore().collection('users').doc(docId).update({
        delete: true,
        online: false
      }).then(doc=>{
        firebase.auth().signOut();
      })
    } catch (err) {
      console.log(err)
    }
  }
}

const loginAuth = (emailF, passwordF) => {
  return async (dispatch, getState) => {
    const { email, password } = getState().form;
    const { locale } = getState().preferences;
    let emailForm = email
    let passwordForm = password
    if(emailF){
      dispatch(onChange("email", emailF))
      dispatch(onChange("password", passwordF))
      emailForm = emailF
      passwordForm = passwordF
    }
    dispatch(AUTH_START());
    try {
      let user = await firebase.auth().signInWithEmailAndPassword(emailForm, passwordForm)
      if(user){
        dispatch(logsUpdate(user.user.uid))
        let userData = await firebase.firestore().collection("users").doc(user.user.uid).get()
        if (userData.data().delete) {
          dispatch(AUTH_END());
          return dispatch(AUTH_FAIL({ error: {type:"error", message:firebaseError("General.silinmisVeyaEngellenmis", locale)} }));
        } else if (user.user.emailVerified === false && userData.data().ref !== "old_user") {
          dispatch(sendEmail())
          dispatch(AUTH_END());
        } else {
          dispatch(AUTH_END());
        }
      }
    } catch (error) {
      dispatch(AUTH_END());
      console.log(error)
      dispatch(AUTH_FAIL({ error: {type:"error", message:error.message} }));
    }
  };
};

const auth = () => {
  return async (dispatch, getState) => {

    const { locale } = getState().preferences;

    dispatch(AUTH_START());
    const { form } = getState();
    if (form.password !== form.passwordAgain) {
      dispatch(AUTH_END());
      return dispatch(AUTH_FAIL({ error: {type:"error", message:firebaseError("General.parolaUyusmuyor", locale)} }));
    }
    if (form.password.length < 6) {
      dispatch(AUTH_END());
      return dispatch(AUTH_FAIL({ error: {type:"error", message:firebaseError("General.sifreEnAz6Karakter", locale)} }));
    }
    let nick_control = await firebase.firestore().collection("users").where("meta.nickname_search", "==", form.nickname.toLowerCase()).get();
    if (nick_control.docs[0]) {
      dispatch(AUTH_END());
      return dispatch(AUTH_FAIL({ error: {type:"error", message:firebaseError("General.buAdAlinmis", locale)} }));
    }
    //register
    try {
      let totalData = await firebase.firestore().collection("totalLength").doc("users").get();
      let settingsGeneral = await firebase.firestore().collection("settings").doc("general").get();
      let user = await firebase.auth().createUserWithEmailAndPassword(form.email, form.password);
      var __url_string = window.location.href;
      var __url = new URL(__url_string);
      let ref = __url.searchParams.get("ref") ? __url.searchParams.get("ref") : ""


      let _data = await firebase.firestore().collection(form.country).doc(form.city).collection("data").where("zip", "==", Number(form.zip)).limit(1).get()
      if (!_data.docs[0]) {
        _data = await firebase.firestore().collection(form.country).doc(form.city).collection("data").limit(1).get()
      }
      let lastLat = _data.docs[0] ? _data.docs[0].data().coordinates.latitude : 0;
      let lastLong = _data.docs[0] ? _data.docs[0].data().coordinates.longitude : 0;
      let hash = _data.docs[0] ? geohash.encode(lastLat, lastLong) : 0;
      let range = 0;
      let birtDate = form.birthDate
      if (birtDate instanceof Date) { } else { birtDate = new Date(birtDate) }
      if (birtDate.getFullYear() >= 1994) {
        range = 0
      } else if (birtDate.getFullYear() >= 1984) {
        range = 1
      } else if (birtDate.getFullYear() >= 1974) {
        range = 2
      } else if (birtDate.getFullYear() >= 1964) {
        range = 3
      } else {
        range = 4
      }
      let _ref = ""
      var x = document.referrer;
      let referrer = x.split(".")
      if (ref) {
        _ref = ref
        firebase.firestore().collection("affiliate").doc(ref).get().then(doc => {
          firebase.firestore().collection("affiliate").doc(ref).update({
            totalUser: Number(doc.data().totalUser) + 1
          })
        })
      } else if (referrer[1] === "page") {
        _ref = referrer[0].replace("https://", "")
        firebase.firestore().collection("affiliate").doc(_ref).get().then(doc => {
          if (doc.data()) {
            firebase.firestore().collection("affiliate").doc(_ref).update({
              totalUser: Number(doc.data().totalUser) + 1
            })
          } else {
            firebase.firestore().collection("affiliate").doc(_ref).set({
              docId: _ref,
              link: x,
              name: _ref,
              timestamp: new Date(),
              totalPacket: 0,
              totalPay: 0,
              totalUser: 1
            })
          }
        })
      }
      await firebase.firestore().collection("users").doc(user.user.uid).set({
        ref: _ref,
        timestamp: firebase_app.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase_app.firestore.FieldValue.serverTimestamp(),
        docId: user.user.uid,
        id: totalData.data().length + 1,
        notification: true,
        packet: 0,
        coin: Number(settingsGeneral.data().freeCredit),
        online: false,
        role: 0,
        range: range,
        likes: [],
        photos: [],
        meta: {
          nickname: form.nickname,
          nickname_search: form.nickname.toLowerCase(),
          gender: Number(form.gender) ? Number(form.gender) : 0,
          email: form.email,
          avatarUrl: "noavatar.jpg",
          avatarLarge: "noavatar.jpg",
          avatarThumb: "noavatar.jpg",
          password: form.password,
          birtDate: birtDate,
          country: form.country,
          city: form.city,
          like: 0,
          zip: Number(form.zip),
          height: "",
          body: "",
          eyeColor: "",
          hairColor: "",
          style: "",
          extra: ""
        },
        filter: {
          gender: Number(form.gender) === 0 ? 1 : 0,
          age: "all",
          country: form.country,
          city: "",
          relation: [],
          distance: 0
        },
        prize: {
          sendMessage: 0,
          login: 1,
          profilePhoto: 0
        },
        buy: [],
        coordinates: lastLat ? new firebase_app.firestore.GeoPoint(lastLat, lastLong) : 0,
        location: hash
      })
      dispatch(sendEmail());
      firebase.analytics().logEvent('sign_up', { nickname: form.nickname, email: form.email, id: user.user.uid });
      dispatch(AUTH_END());
    } catch (error) {
      dispatch(AUTH_END());
      console.log(error)
      return dispatch(AUTH_FAIL({ error: {type:"error", message:error.message} }));
    }
  };
};

const authCleanUp = () => (dispatch) => dispatch(AUTH_CLEAN_UP());
const cleanErrorAuth = () => (dispatch) => dispatch(AUTH_FAIL({ error: "" }));

const prizeProfile = (__profile, profileStatus) => async(dispatch, getState) => {
  const { meta, profile, hobs, photos, docId, coin } = getState().auth.userData;
  const { prize } = getState().generalDataReducer;
  //check coin
  let userData = await firebase.firestore().collection("users").doc(docId).get()
  if(!userData.data()){
    return null
  }
  if(Number(coin) !== userData.data().coin){
      return null
  }
  let _profile = 0
  if (!profile) {
    if (meta.avatarUrl !== "noavatar.jpg") {
      _profile = _profile + 20
    }
    if (hobs) {
      _profile = _profile + 10
    }
    if (photos) {
      _profile = _profile + 10
    }
    if (meta.height) {
      _profile = _profile + 10
    }
    if (meta.body) {
      _profile = _profile + 10
    }
    if (meta.eyeColor) {
      _profile = _profile + 10
    }
    if (meta.hairColor) {
      _profile = _profile + 10
    }
    if (meta.style) {
      _profile = _profile + 10
    }
    if (meta.extra) {
      _profile = _profile + 10
    }
    if (_profile === 100) {
      firebase.firestore().collection('users').doc(docId).update({
        coin: Number(coin) + Number(prize.profile),
        profile: true
      })
      let _text = prize.profile + " Coin Geschenk"
      dispatch(AUTH_FAIL({ error: {type:"error", message:_text} }))
    }
  }
  if (__profile !== _profile){
    profileStatus(_profile)
  }
};



export {sendResetPassword, profilMessage, resetPassword, logout, sendPassword, verifyAuth, handleVerifyEmail, fetchUserData, sendEmail, deleteProfile, loginAuth, auth, authCleanUp, cleanErrorAuth, prizeProfile };
