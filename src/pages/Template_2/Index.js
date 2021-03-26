import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Home.module.scss';
import Contact from "../../components/template_1/Contact"
import { getRandomFake } from '../../state/actions/users';
import { onlineUsers } from '../../state/actions/general';
import Modal from "../../components/Items/modal"
import marked from 'marked';
import { cleanErrorAuth, sendPassword } from "../../state/actions/auth"
import Register from "../../components/template_1/Register"
import paths from '../../Router/paths';
import Login from "../../components/template_1/Login";
import { ButtonDanger} from "../../components/Items/buttons"

import {defaultLogoWhite, template2Type, defaultHomeTemplate} from "../../Settings"
import HeartIcon from "../../assets/img/icons/heart.svg"
import {FormattedMessage, useIntl} from 'react-intl';

const Index = () => {
    const intl = useIntl();
  const { general, site, twoUsers, info, auth, isAuth,online } = useSelector(
    (state) => ({
      general: state.generalDataReducer.general,
      online: state.generalDataReducer.onlineUsers,
      // online: state.generalDataReducer.length.online,
      info: state.generalDataReducer.info,
      site: state.generalDataReducer.site ? state.generalDataReducer.site[Number(defaultHomeTemplate)] : "",
      
      auth: state.auth,
      // form: state.form,
      isAuth: state.auth.userData.id,
      twoUsers: state.users.twoUsers ? state.users.twoUsers : []
    }), shallowEqual
  );
  // const [online, setOnline] = useState(0);
  const [modal_1, modal_1Status] = useState("");
  const [modal_2, modal_2Status] = useState("");
  const [modal_3, modal_3Status] = useState("");
  const [modal_4, modal_4Status] = useState("");
  const [modalStatus, modal_Status] = useState("");
  const modal = (e) => {
    if(e === "modal_1"){
      modal_1Status("true")
      setTimeout(doc=>{
          document.getElementById("data1").innerHTML = marked(info.Datenschutz)
      }, 100)
    }else if(e === "modal_2"){
      modal_2Status("true")
      setTimeout(doc=>{
          document.getElementById("data2").innerHTML = marked(info.Nutzungdbedingungen)
      }, 100)
    }else if(e === "modal_3"){
      modal_3Status("true")
      setTimeout(doc=>{
          document.getElementById("data3").innerHTML = marked(info.Impressum)
      }, 100)
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getRandomFake());
      dispatch(onlineUsers());
  }, [dispatch]);
  const redirect = isAuth && <Redirect to={paths.DASHBOARD} />;
  if (!site){
    return null
  }
  return (
    <div id="landingPage_2" className={classNames(styles.landingPage_2, template2Type ? styles[template2Type] : "")}>
      {redirect}
      <div className={styles.buttons}>
        <button onClick={(e) => modal_Status("login")} className={classNames(styles.btnStyle1, 'primary-bg-2')}>
          EINLOGGEN
        </button>
      </div>
      <div className={styles.banner} style={{backgroundImage: `url(${site.bg})`}}>
        <div className={styles.overlay}></div>
        <div className={styles.shadow}></div>
        <div className={styles.text}>
          <div className={styles.logo}>
            <NavLink to="/" exact>{defaultLogoWhite}</NavLink>
          </div>
          <h1 className="mt-0">{site.text_1}</h1>
          <p>{site.text_2}</p>
          <button onClick={(e) => modal_Status("register")} className={classNames(styles.btnStyle1, 'success-bg')}>
            KOSTENLOS REGISTRIEREN
          </button>  
          <div style={{color:"#fff", display:"flex", fontSize:30, marginTop:20}}>
            {online && online.toFixed(0)}
            <div style={{color:"#2ecc71", display:"flex", alignItems:"center", marginLeft:15, fontSize:18}}>Online 
              <div className={classNames("intro-banner-vdo-play-btn", "ml-2", "online")}>
                      <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
                      <span className={classNames("ripple", "online")}></span>
                      <span className={classNames("ripple", "online")}></span>
                      <span className={classNames("ripple", "online")}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames(styles.usersGeneral, "container p-5")}>
          <div className="p-5 d-flex align-items-center justify-content-center text-center">
            <div className={styles.users}>
              {twoUsers.map((doc, index) =>{
                return (<div key={index} className={classNames(styles.user, "fixed-bg")} style={{ backgroundImage: `url(${doc.avatarLarge})`}}></div>)
              })}
            </div>
            <div>
              <h2 className={styles.title}>{site.text_4}</h2>
              <p className={styles.text}>{site.text_5}</p>
              <button onClick={(e) => modal_Status("register")} className={classNames(styles.btnStyle1, 'primary-bg-2')}>
                Jetzt kostenlos registrieren!
              </button>  
            </div>
          </div>
          <div className={styles.iconList}>
            <div>
              <i className="fi flaticon-cell-phone"></i>
              <p><b>Optimiert</b> für Desktop PC, Tablet und Smartphone</p>
            </div>
            <div>
              <i className="fi flaticon-ribbon"></i>
              <p><b>Führend</b> bei Online-Kontakten in D-A-CH</p>
            </div>
            <div>
              <i className="fi flaticon-locked-padlock"></i>
              <p><b>Schutz der Privatsphäre</b> in einem diskreten Umfeld</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={(e) => modal_Status("register")} className={classNames(styles.btnStyle1, 'primary-bg-2')}>
            Jetzt kostenlos Mitglied werden
            </button>
          </div>  
          <div className={styles.footerLink}>
            <ul>
              <li onClick={(e) => modal("modal_1")}>
                Datenschutz |
              </li>
              <li onClick={(e) => modal("modal_2")}>
                Nutzungsbedingungen |
              </li>
              <li onClick={(e) => modal("modal_3")}>
                Impressum |
              </li>
              <li onClick={(e) => modal_4Status("true")}>
                Kontakt
              </li>
            </ul>
          </div>
          <p className={styles.text_2}>{site.text_6}</p>
          <p className={styles.text_2} style={{display:"flex", alignItems:"center"}}>{general.title} (c) 2018 - 2020 Alle Rechte vorbehalten.  Hand-crafted with 
          <img src={HeartIcon} style={{width:18, height:18, marginLeft:6}} alt="" />
          </p>
      </div>
      {modal_1 ? <Modal title="Datenschutz" content={<div id="data1"></div>} status={modal_1} width={700} close={(e) => modal_1Status("")} /> : ""}
      {modal_2 ? <Modal title="Nutzungsbedingungen" content={<div id="data2"></div>} status={modal_2} width={700} close={(e) => modal_2Status("")} /> : ""}
      {modal_3 ? <Modal title="Impressum" content={<div id="data3"></div>} status={modal_3} width={700} close={(e) => modal_3Status("")} /> : ""}
      {modal_4 ? <Modal title="Kontakt" content={<Contact close={(e) => modal_4Status("")} />} status={modal_4} width={500} close={(e) => modal_4Status("")} /> : ""}
      {modalStatus === "login" ? <Modal title="EINLOGGEN" content={<Login />} status={modalStatus === "login" ? true : false} width={500} close={(e) => modal_Status("")} /> : ""}
      {modalStatus === "register" ? <Modal title="KOSTENLOS REGISTRIEREN" content={<Register />} status={modalStatus === "register" ? true : false} width={500} close={(e) => modal_Status("")} /> : ""}
      
      {auth.error && auth.error.type ? <Modal title={auth.error.type === "success" ? intl.formatMessage({id:"General.basarili"}) : intl.formatMessage({id:"General.hata"})} content={auth.error.message} status={auth.error.type} width={400} close={(e) => dispatch(cleanErrorAuth())} /> : ""
      } 
    </div>
  );
};

export default Index;
