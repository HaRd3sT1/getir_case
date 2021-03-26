import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Home.module.scss';
// import Odometer from 'react-odometerjs';
import app2 from "../../assets/img/app2.svg"
import app2_white from "../../assets/img/app2_white.png"
import Register from "../../components/template_1/Register"
import Login from "../../components/template_1/Login"
import Contact from "../../components/template_1/Contact"
import ResetPassword from "../../components/template_1/ResetPasswordForm"
import {ButtonPrimaryOutline, ButtonSuccess, ButtonPrimary} from "../../components/Items/buttons"
import Modal from "../../components/Items/modal"
import marked from 'marked';
import { Redirect } from 'react-router-dom';
import paths from '../../Router/paths';
import { cleanErrorAuth } from "../../state/actions/auth"
import {defaultSocial, defaultApplink, defaultLogoWhite} from "../../Settings"
import {FormattedMessage, useIntl} from 'react-intl';
import Test from "../../assets/img/test.png"
import Facebook from "../../assets/img/icons/facebook.svg"
import Instagram from "../../assets/img/icons/instagram.svg"
// import VerifyAlert from "../../components/Items/verifyAlert"

const Index = () => {
    const intl = useIntl();
  const { general, site,info,isAuth, auth } = useSelector(
    (state) => ({
      general: state.generalDataReducer.general,
      info: state.generalDataReducer.info,
      site: state.generalDataReducer.site ? state.generalDataReducer.site[1] : "",
      isAuth: state.auth.userData.id,
      auth: state.auth,
      // error: state.auth.error,
      // length: state.generalDataReducer.length ? state.generalDataReducer.length.user : 0
    }), shallowEqual
  );
  const [formStatus, setformStatus] = useState(0);
  const [modal_1, modal_1Status] = useState("");
  const [modal_2, modal_2Status] = useState("");
  const [modal_3, modal_3Status] = useState("");
  const [modal_4, modal_4Status] = useState("");
  const [mobileMenu, mobileMenuStatus] = useState(false);
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
  const mobileToggle = () => {
    mobileMenuStatus(true)
    setformStatus(1)
  };
  const mobileToggle2 = () => {
    mobileMenuStatus(true)
    setformStatus(0)
  };

  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);
  const redirect = isAuth && <Redirect to={paths.DASHBOARD} />;
  return (
    <div id="landingPage_1" className={styles.landingPage_1}>
      {redirect}
      <div className={classNames(styles.left, "text-center")} style={{backgroundImage: `url(${site ? site.bg : ""})`}}>
        <div className={styles.logo}>
          <div className={styles.img_wrap}> 
            <NavLink to="/" exact>
              {defaultLogoWhite}
              {/* <Logo color="#fff" width="190px" height="140px" /> */}
            </NavLink>
          </div>

        </div>
        <div className={styles.text} display="block">
          <h1 className="mt-0">{site ? site.text_1 : ""}</h1>
          <p>{site ? site.text_2 : ""}</p>
          <div className={styles.logos}>
            {/* <div className={styles.test}>
              {window.innerWidth < 991 ? 
                <div className={styles.count}>
                  <Odometer value={length} format="(.ddd),dd" />
                  <p><FormattedMessage id="Home.userSayisi" /></p>
                </div> : 
              ""}
            </div> */}
            {defaultApplink ? <a href="https://play.google.com/store/apps/details?id=de.beepr" rel="noopener noreferrer" target="_blank" className={styles.onlyMobile}><img src={app2_white} alt=""/></a> : "" }
          </div>
          {window.innerWidth < 991 ? <ButtonPrimary style={{fontSize:16, textTransform:"uppercase", borderRadius:3, fontWeight:"500"}} text="EMAIL EINLOGGEN" classNames="onlyMobile" onClick={mobileToggle} /> : ""}
          {window.innerWidth < 991 ? <ButtonSuccess style={{fontSize:16, textTransform:"uppercase", borderRadius:3, fontWeight:"500"}} text="KOSTENLOS REGISTRIEREN" classNames="onlyMobile" onClick={mobileToggle2} /> : ""}

            {window.innerWidth < 991 && defaultSocial ? <div className={styles.social}>
              <a href={general ? general.facebook : ""} target="_blank" rel="noopener noreferrer">
                <img src={Facebook} style={{width:27}} alt="" />
              </a>
              <a  href={general ? general.instagram : ""} target="_blank" rel="noopener noreferrer">
                <img src={Instagram} style={{width:27}} alt="" />
              </a>
            </div> : ""}
        </div>
          {/* {window.innerWidth < 991 ? <div className={styles.test}>
            <img src={Test} alt="" />
          </div> : ""} */}
        <div className={styles.bottom}>

          {/* {window.innerWidth > 991 ? <div className={styles.test}>
            <div className={styles.count}>
              <Odometer value={length} format="(.ddd),dd" />
              <p><FormattedMessage id="Home.userSayisi" /></p>
            </div>
            <img src={Test} alt="" />
          </div> : ""} */}
          <div className={styles.menus}>
            <div>Copyright by {general ? general.title : ""}</div>
            <ul>
              <li onClick={(e) => modal("modal_1")}>
                <FormattedMessage id="Home.gizlilikSozlesmesi" />
              </li>
              <li onClick={(e) => modal("modal_2")}>
                
                <FormattedMessage id="Home.uyelikSozlesmesi" />
              </li>
              <li onClick={(e) => modal("modal_3")}>
                <FormattedMessage id="Home.kunye" />
                
              </li>
              <li onClick={(e) => modal_4Status("true")}>
                <FormattedMessage id="Home.iletisim" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classNames(styles.right, mobileMenu ? styles.active : "")} id="right">

          {window.innerWidth > 991 && defaultSocial ? <div className={styles.social}>
            <a href={general ? general.facebook : ""} target="_blank" rel="noopener noreferrer">
              <img src={Facebook} style={{width:27}} alt="" />
            </a>
            <a  href={general ? general.instagram : ""} target="_blank" rel="noopener noreferrer">
              <img src={Instagram} style={{width:27}} alt="" />
            </a>
          </div> : ""}
        <div className={styles.login}>
          {formStatus === 0 && !mobileMenu ?  <small className={styles.formTopText}><FormattedMessage id="Home.veyaEposta" /></small>: ""}
          {formStatus === 0 && !mobileMenu ?  <ButtonPrimaryOutline text={<FormattedMessage id="Home.girisYap" />} style={{marginBottom:14, borderRadius:3, fontWeight:500}} onClick={(e) => setformStatus(1)} />: ""}
          {mobileMenu ? <svg className={styles.close} onClick={(e) => mobileMenuStatus("")} fill="#9997a2" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path></svg>: ""}
          {formStatus === 1 ? <Login /> : formStatus === 0 ? <Register /> : <ResetPassword /> }
          {formStatus === 1 ? <div className={classNames(styles.a, "blue mt-4")} onClick={(e) => setformStatus(2)}><FormattedMessage id="Home.sifremiUnuttum" /></div> : ""}
          {formStatus === 2 ? <div className={classNames(styles.a, "blue mt-4")} onClick={(e) => setformStatus(1)}><FormattedMessage id="Home.girisYap" /></div> : ""}
          {formStatus ? <div className={classNames(styles.textColor, "mt-3")}><FormattedMessage id="Home.henuzUyeDegilmisin" /> <span className={classNames(styles.a, "blue")} onClick={(e) => setformStatus(0)}><FormattedMessage id="Home.buradanKayitOlun" /></span></div>: ""}
          {formStatus === 2 ? <div className={classNames(styles.textColor, "mt-3")}><FormattedMessage id="Home.sifreSifirlama_1" /></div> : ""}
        </div>
        {defaultApplink ? <a href="https://play.google.com/store/apps/details?id=de.beepr" rel="noopener noreferrer" target="_blank" className={styles.onlyWeb}><img src={app2} alt=""/></a> : "" }
      </div>

      {auth.error && auth.error.type ? <Modal title={auth.error.type === "success" ? intl.formatMessage({id:"General.basarili"}) : intl.formatMessage({id:"General.hata"})} content={auth.error.message} status={auth.error.type} width={400} close={(e) => dispatch(cleanErrorAuth())} /> : ""
      } 
      {/* <Modal title="Error" content={error} status={error} width={400} close={(e) => dispatch(cleanError())} /> */}
      {modal_1 ? <Modal title={<FormattedMessage id="Home.gizlilikSozlesmesi" />} content={<div id="data1"></div>} status={modal_1} width={700} close={(e) => modal_1Status("")}  /> : ""}
      {modal_2 ? <Modal title={<FormattedMessage id="Home.uyelikSozlesmesi" />} content={<div id="data2"></div>} status={modal_2} width={700} close={(e) => modal_2Status("")}  /> : ""}
      {modal_3 ? <Modal title={<FormattedMessage id="Home.kunye" />} content={<div id="data3"></div>} status={modal_3} width={700} close={(e) => modal_3Status("")}  /> : ""}
      {modal_4 ? <Modal title={<FormattedMessage id="Home.iletisim" />} content={<Contact close={(e) => modal_4Status("")} />} status={modal_4} width={500} close={(e) => modal_4Status("")}  /> : ""}
    </div>
  );
};

export default Index;
