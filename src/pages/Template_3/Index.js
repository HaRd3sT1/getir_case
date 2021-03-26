import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Home.module.scss';
import Contact from "../../components/template_1/Contact"
// import { getRandomFake } from '../../state/actions/users';
// import { onlineUsers } from '../../state/actions/general';
import Modal from "../../components/Items/modal"
import marked from 'marked';
import { cleanErrorAuth, sendPassword } from "../../state/actions/auth"
import Register from "../../components/template_1/Register"
import paths from '../../pages/Router/paths';
import Login from "../../components/template_1/Login";
import { ButtonDanger} from "../../components/Items/buttons"
import {defaultLogoWhite, template2Type} from "../../Settings"
import defaultStyles from "../../Settings.module.scss"
import btnBg from "../../settings/img/btn.png"
import {FormattedMessage} from 'react-intl';

const Index = () => {
  const { site, info, error, isAuth, form } = useSelector(
    (state) => ({
      // general: state.generalDataReducer.general,
      // online: state.generalDataReducer.onlineUsers,
      // online: state.generalDataReducer.length.online,
      info: state.generalDataReducer.info,
      site: state.generalDataReducer.site[3],
      error: state.auth.error,
      form: state.form,
      isAuth: state.auth.userData.id,
      // twoUsers: state.users.twoUsers ? state.users.twoUsers : []
    }), shallowEqual
  );
  // const [online, setOnline] = useState(0);
  const [modal_1, modal_1Status] = useState("");
  const [modal_2, modal_2Status] = useState("");
  const [modal_3, modal_3Status] = useState("");
  const [modal_4, modal_4Status] = useState("");
  const [modal_5, modal_5Status] = useState("");
  const [modalStatus, modal_Status] = useState("");
  const modal = (e) => {
    if(e === "modal_1"){
      modal_1Status("true")
      setTimeout(doc=>{
          document.getElementById("data1").innerHTML = marked(info.neden)
      }, 100)
    }else if(e === "modal_2"){
      modal_2Status("true")
      setTimeout(doc=>{
          // document.getElementById("data2").innerHTML = marked(info.yardim)
      }, 100)
    }else if(e === "modal_3"){
      modal_3Status("true")
      setTimeout(doc=>{
          document.getElementById("data3").innerHTML = marked(info.gizlilikSozlesmesi)
      }, 100)
    }else if(e === "modal_4"){
      modal_4Status("true")
      setTimeout(doc=>{
          document.getElementById("data5").innerHTML = marked(info.iletisim)
      }, 100)
    }else if(e === "modal_5"){
      modal_5Status("true")
      setTimeout(doc=>{
          document.getElementById("data4").innerHTML = marked(info.UyelikSozlesmesi)
      }, 100)
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
      // dispatch(getRandomFake());
      // dispatch(onlineUsers());
  }, [dispatch]);
  const redirect = isAuth && <Redirect to={paths.DASHBOARD} />;
  if (!site){
    return null
  }
  return (
    <div id="landingPage_3" className={classNames(styles.landingPage_3, template2Type ? styles[template2Type] : "")} style={{backgroundImage: `url(${site.bg})`}}>
      {redirect}
      <div className={classNames(styles.center, "container")}>
        <div className={styles.logo}>
          <NavLink to="/" exact>{defaultLogoWhite}</NavLink>
        </div>
        <button onClick={(e) => modal_Status("login")} className={classNames(styles.login, defaultStyles.button, defaultStyles.success)}>
         <FormattedMessage id="Home.login" />
        </button>
        <div className={styles.text}>
          <div className={styles.btnBg} style={{backgroundImage: `url(${btnBg})`}}>UYUDUNMU</div>{site.text_1}
        </div>
        <div className={styles.text} style={{maxWidth:"100%"}}>
          {site.text_2}
        </div>
        <button onClick={(e) => modal_Status("register")} className={classNames(styles.register, defaultStyles.button, defaultStyles.primary)}>
          <FormattedMessage id="Home.register" />
        </button>
        <button onClick={(e) => modal_Status("login")} className={classNames(styles.loginMobile, defaultStyles.button, defaultStyles.success)}>
         <FormattedMessage id="Home.login" />
        </button>
      </div>
      <div className={styles.footerLink}>
        <ul>
          <li onClick={(e) => modal("modal_1")}>
            <FormattedMessage id="Home.nedenUyudunMu" />
          </li>
          <span>|</span>
          <li onClick={(e) => modal("modal_2")}>
            <FormattedMessage id="Home.yardim" />
          </li>
          <span>|</span>
          <li onClick={(e) => modal("modal_3")}>
            <FormattedMessage id="Home.gizlilikSozlesmesi" />
          </li>
          <span>|</span>
          <li onClick={(e) => modal("modal_5")}>
            <FormattedMessage id="Home.uyelikSozlesmesi" />
          </li>
          <span>|</span>
          <li onClick={(e) => modal("modal_4")}>
            <FormattedMessage id="Home.iletisim" />
          </li>
        </ul>
      </div>
      <div className={styles.footerBottom}>
        2020 © <div className={styles.btnBg} style={{backgroundImage: `url(${btnBg})`}}>UYUDUNMU</div> <FormattedMessage id="Home.haklariSaklidir" />
      </div>
      {modal_1 ? <Modal title={<FormattedMessage id="Home.nedenUyudunMu" />} content={<div id="data1"></div>} status={modal_1} width={700} close={(e) => modal_1Status("")} /> : ""}
      {modal_2 ? <Modal title={<FormattedMessage id="Home.yardim" />} content={<Contact close={(e) => modal_2Status("")} />} status={modal_2} width={500} close={(e) => modal_2Status("")} /> : ""}
      {modal_3 ? <Modal title={<FormattedMessage id="Home.gizlilikSozlesmesi" />} content={<div id="data3"></div>} status={modal_3} width={700} close={(e) => modal_3Status("")} /> : ""}
      {modal_5 ? <Modal title={<FormattedMessage id="Home.uyelikSozlesmesi" />} content={<div id="data4"></div>} status={modal_5} width={700} close={(e) => modal_5Status("")} /> : ""}
      {modal_4 ? <Modal title={<FormattedMessage id="Home.iletisim" />} content={<div><div id="data5"></div></div>} status={modal_4} width={600} close={(e) => modal_4Status("")} /> : ""}
      {modalStatus === "login" ? <Modal title={<FormattedMessage id="Home.login" />} content={<Login />} status={modalStatus === "login" ? true : false} width={500} close={(e) => modal_Status("")} /> : ""}
      {modalStatus === "register" ? <Modal title={<FormattedMessage id="Home.register" />} content={<Register />} status={modalStatus === "register" ? true : false} width={500} close={(e) => modal_Status("")} /> : ""}
      {error ? <Modal title={<FormattedMessage id="Home.hata" />} content={error} status={error} width={400} buttons={error === "The password is invalid or the user does not have a password." ? <div><ButtonDanger onClick={(e) => { dispatch(cleanErrorAuth()); dispatch(sendPassword()) }} style={{ flex: 1 }} text={'Sende mein Passwort: ' + form.email} /></div> : ""}  close={(e) => dispatch(cleanErrorAuth())} /> : ""}
    </div>
  );
};

export default Index;
