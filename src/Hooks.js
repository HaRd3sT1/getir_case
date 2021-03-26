import { useIntl } from 'react-intl';
import firebase from "./firebase";
const toDateTime = (secs) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}
const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const getRandomNumber = (max) => {
  return (Math.floor(Math.random() * Math.floor(max))) + 1;
}
const getRandomInt = (max, data) => {
  let online = "";
  let randomOnline = Math.floor(Math.random() * Math.floor(max));
  if(data.lastLogin){
    if(new Date() - new Date(data.lastLogin.toDate()) > (60 * 60 * 1000 * 3)){
      if(randomOnline !== 1 && !data.online && data.role === 1){
          firebase.firestore().collection("users").doc(data.docId).update({
              online:true,
              lastLogin: new Date()
          })
          online = true
      }
      if(randomOnline === 1 && data.online && data.role === 1){
          firebase.firestore().collection("users").doc(data.docId).update({
              online:false,
              lastLogin: new Date()
          })
          online = false
      }
    }
  }else{
    if(randomOnline !== 1 && !data.online && data.role === 1){
        firebase.firestore().collection("users").doc(data.docId).update({
            online:true,
            lastLogin: new Date()
        })
        online = true
    }
    if(randomOnline === 1 && data.online && data.role === 1){
        firebase.firestore().collection("users").doc(data.docId).update({
            online:false,
            lastLogin: new Date()
        })
        online = false
    }
  }
  return online;
}
const ScrollEvent = (element) => {
  var headerOffset =250;
  var elementPosition = element.current.getBoundingClientRect().top;
  var offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
  });
}
const getParameterByName = (name) => {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);

  if (results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
const useChangeHandler = setState => {
  const onChangeHandler = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setState(prevState => ({ ...prevState, [`${name}`]: value }));
  };

  return onChangeHandler;
};

const useFormatMessage = (
  id,
  values = {},
  defaultMessage = '',
  description = ''
) => {
  const intl = useIntl();
  return intl.formatMessage({ id, defaultMessage, description }, values);
};

export { toDateTime, getRandomNumber, useChangeHandler, useFormatMessage, getParameterByName, getAge, ScrollEvent, getRandomInt };
