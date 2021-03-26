import React, { useEffect, useState } from 'react';
import { cleanErrorAuth } from '../state/actions/auth'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Modal from "../components/Items/modal"
import ResetPassword from "../components/template_1/ResetPassword"
import Contact from "../components/template_1/Contact"
import { Redirect } from 'react-router-dom';
import paths from '../Router/paths';
import firebase from '../firebase.js';
import ClassNames from 'classnames';
import { getParameterByName } from '../Hooks';
import styles from  "./Verify.module.scss";
import { handleVerifyEmail, resetPassword} from "../state/actions/auth"
import {FormattedMessage} from 'react-intl';

const Verify = () => {
    const { error } = useSelector(
        (state) => ({
            error: state.auth.error
        }), shallowEqual
    );
    const [modalStatus, modal_Status] = useState("");
    const [loading, loadingSet] = useState(0);
    const [iframe, iframeSet] = useState("");
    const [success, successSet] = useState("");
  const [modal_4, modal_4Status] = useState("");
    const [redirectStatus, redirect_Status] = useState("");
    const dispatch = useDispatch();

    let mode = getParameterByName('mode');
    let actionCode = getParameterByName('oobCode');
    let continueUrl = getParameterByName('continueUrl');
    let lang = getParameterByName('lang') || 'en';
    let auth = firebase.auth();
    useEffect(() => {

        if(loading < 96){
          let timer1 = setInterval(() => {
            if(loading < 96){
                loadingSet(loading+1)
            }
          }, 40)
    
          // this will clear Timeout when component unmount like in willComponentUnmount
          return () => {
            clearInterval(timer1)
          }
        }
        // eslint-disable-next-line
    }, [loading]);
    useEffect(() => {
        let first = 0
        auth.onAuthStateChanged(async user => {
            switch (mode) {
                case 'resetPassword':
                    if (first === 0) {
                        modal_Status("true")
                        first = 1
                    }
                    break;
                case 'verifyEmail':
                    if (first === 0) {
                        dispatch(handleVerifyEmail(auth, actionCode, continueUrl, lang, successSet, loadingSet))
                        first = 1
                    }
                    break;
                default:
            }
        })
        // eslint-disable-next-line
    }, [dispatch]);
    useEffect(() => {
        if(success === true){
            setTimeout(() => {
                redirect_Status(true)
            }, 3000);
        }else if(success !== ""){
            iframeSet(success)
            setTimeout(() => {
                redirect_Status(true)
            }, 4000);
        }
        // eslint-disable-next-line
    }, [success]);

    const redirect = redirectStatus && <Redirect to={paths.DASHBOARD} />;
    // console.log(error)
    return (
        <div className={styles.verify}>
            {redirect}


                    <div className={styles.content}>
                        {modalStatus ? <header>
                            <h1><FormattedMessage id="General.sifreSifirla" /></h1>
                        </header> : <header>
                            <h1>E-Mail-Bestätigung</h1>
                            <p>Prozess geht weiter... Bitte verlassen Sie die Seite nicht</p>
                        </header> }
                        {!success ? 
                        <div>
                        {modalStatus ? <ResetPassword submit={e => dispatch(resetPassword(auth, actionCode, continueUrl, lang, successSet))} close={(e) => modal_Status("")} /> : <div className={styles.progress}>
                            <div className={styles.progressDone} style={{width:loading+"%"}}>
                                {loading}%
                            </div>
                        </div>}
                        </div> : ""}
                        {success ? <div className={styles.successMessage}>
                            <svg viewBox="0 0 76 76" className={ClassNames(styles.successMessage__icon, styles.iconCheckmark)}>
                                <circle cx="38" cy="38" r="36"/>
                                <path fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M17.7,40.9l10.9,10.9l28.7-28.7"/>
                            </svg>
                            <h1 className={styles.successMessage__title}><FormattedMessage id="General.basarili" /></h1>
                            <div className={styles.successMessage__content}>
                                <p><FormattedMessage id="General.hesapOnaylandi" /></p>
                            </div>
                        </div> : ""}

                        <p className={styles.info}>
                            Gibt es ein Problem? 
                            <b onClick={(e) => modal_4Status("true")}>
                                <FormattedMessage id="Home.iletisim" />
                            </b>
                        </p>
                    </div>
                    {iframe ? <iframe  style={{width:0, height:0, border:0, border:"none"}} src={"https://track.lobby-x.eu/postback?cid="+iframe+"&payout=7"}></iframe> : ""}
            {error ? <Modal title={error.type && error.type === "success" ? <FormattedMessage id="General.basarili" />:<FormattedMessage id="General.hata" />} content={error.message ? error.message : error} status={error} width={400} close={(e) => dispatch(cleanErrorAuth())} /> : ""}
      {modal_4 ? <Modal title={<FormattedMessage id="Home.iletisim" />} content={<Contact close={(e) => modal_4Status("")} />} status={modal_4} width={500} close={(e) => modal_4Status("")}  /> : ""}
        </div>
    )
}

export default Verify;
