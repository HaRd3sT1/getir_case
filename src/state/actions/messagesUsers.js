import { createAction } from 'redux-act';
import { getAge, getRandomInt} from "../../Hooks"

export const MESSAGES_USERS = createAction('MESSAGES_USERS');

const setUserData = (data) => {
  return (dispatch, getState) => {
    const usersList = getState().messagesUsers;
    const { meta } = getState().auth.userData;
    const { online } = getState().generalDataReducer.length;
    if (data && data.meta && !usersList[data.docId]){
        let randomOnline = getRandomInt(5, data, online);
        let onlineStatus = randomOnline !== "" ? randomOnline : data.online
        let country = meta ? meta.country : "",
          city = meta ? meta.city : "",
          age = data.meta.birtDate ? data.meta.birtDate.toDate() : new Date();
        if (data.meta.country !== 0 && data.meta.city !== 0) {
          country = data.meta.country
          city = data.meta.city
        }
        let users = {
          id: data.docId,
          nickname: data.meta.nickname,
          avatar: data.meta.avatarThumb === "noavatar.jpg" ? "/noavatar.jpg" : data.meta.avatarThumb,
          avatarLarge:  data.meta.avatarLarge === "noavatar.jpg" ? "/noavatar.jpg" : data.meta.avatarLarge,
          ab:  data.meta.ab === "noavatar.jpg" ? "/noavatar.jpg" : data.meta.ab,
          pl: data.photos.length,
          online: onlineStatus,
          age: getAge(age),
          badge: data.badge ? data.badge : "",
          country: country,
          city: city,
        }
        // console.log(users)
        dispatch(MESSAGES_USERS({ [data.docId]: users }));
    }
  };
};




export { setUserData };
