import firebase from '../../firebase.js';
import firebase_app from 'firebase/app';
import { createAction } from 'redux-act';
import {defaultVorkasse, defaultMicropaymentLink, defaultTitle} from "../../Settings"
import {error} from "./dashboard"
import {firebaseError} from "../../Utils"
export const LAST_PAYMENT = createAction('LAST_PAYMENT');
const getUserLastPayment =  () => {
    return (dispatch, getState) => {
        const { userData } = getState().auth;
        firebase.firestore().collection("payments").where("userid", "==", userData.docId).orderBy("time", "desc").limit(1).get().then(doc=>{
            doc.forEach(doc=>{
                let time = new Date(doc.data().time.toDate())
                var dd = String(time.getDate()).padStart(2, '0');
                var mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = time.getFullYear();

                dispatch(LAST_PAYMENT({
                    id: doc.id.substr(doc.id.length - 6),
                    amount: doc.data().pay2,
                    time: mm + '/' + dd + '/' + yyyy
                }))
            })
        })
    }
}
const paymentSubmit = (payType, payTitle, pay, payText, payType2, payTitle2, setreloadPayment, history) => {
    return (dispatch, getState) => {
        const { loading } = getState().dashboard;
        const { userData } = getState().auth;
        const { general } = getState().generalDataReducer;
        const { locale } = getState().preferences;
        if(!payTitle){
            dispatch(error(firebaseError("General.paketSeciniz", locale), "warning", true))
            return null;
        }
        if (payType && !loading) {
            setreloadPayment(true)
            let random = "";
            try {
                firebase.firestore().collection('payments').add({
                    time: firebase_app.firestore.FieldValue.serverTimestamp(),
                    packet: Number(payTitle),
                    paytype: payType,
                    amount: pay,
                    function: "new",
                    pay2: payText,
                    userid: userData.docId,
                }).then( doc => {

                    random = doc.id
                    // Number(payTitle)
                    firebase.firestore().collection("settings").doc("packets").collection("data").where("paket", "==", Number(payTitle)).limit(1).get().then(paymentDocFor => {
                        paymentDocFor.forEach(paymentDoc => {
                            let link = "https://" + payType + "."+defaultMicropaymentLink+"/" + payType2 + "/event/?project=" + general.paymentProjectId + "&testmode=0&theme=x1&gfx=x-default&bgcolor=ffffff&amount=" + pay + "&title=" + general.title + "&producttype=product&paytext=" + payTitle + "&id=" + random + "&pay2=" + payText + "&sitelink=" + general.link + "&userid=" + userData.docId + "&coin=" + Number(paymentDoc.data().coin) + "&extraCoin=" + Number(paymentDoc.data().extraCoin) + "&type=" + paymentDoc.data().type

                            if(payType === "creditcard" && defaultTitle === "Liebesradar"){
                                link = "https://" + payType + ".micropayment.de/" + payType2 + "/event/?project=11ib-umolu-607d0676&testmode=0&theme=x1&gfx=x-default&bgcolor=ffffff&amount=" + pay + "&title=" + general.title + "&producttype=product&paytext=" + payTitle + "&id=" + random + "&pay2=" + payText + "&sitelink=" + general.link + "&userid=" + userData.docId + "&coin=" + Number(paymentDoc.data().coin) + "&extraCoin=" + Number(paymentDoc.data().extraCoin) + "&type=" + paymentDoc.data().type
                            }
                            firebase.firestore().collection("payments").doc(doc.id).update({
                                id: doc.id,
                                link: link
                            }).then(doc=>{
                                // console.log(payType)
                                if(payType === "prepayment" && defaultVorkasse){
                                    history.push("/vorkasse") 
                                }else{
                                    window.location.replace(link) 
                                }
                            })
                        })
                    })
                })
                firebase.analytics().logEvent('pay_step_2', { user: userData.meta.nickname, packet: payTitle2, type: payType });
            } catch (error) {
                console.log(error)
            }
        }
    };
};

export {paymentSubmit, getUserLastPayment}