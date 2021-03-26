import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './Footer_3.module.scss';
import Modal from "../../../components/Items/modal"
import Contact from "../../../components/template_1/Contact"
import app2 from "../../../assets/img/app2.svg"
import marked from 'marked';
import {defaultApplink} from "../../../Settings"
import {FormattedMessage} from 'react-intl';
import HeartIcon from "../../../assets/img/icons/heart.svg"

const Footer = (props) => {
    const { general, info } = useSelector(
        (state) => ({
            info: state.generalDataReducer.info,
            general: state.generalDataReducer.general
        }), shallowEqual
    );
    const [modal_1, modal_1Status] = useState("");
    const [modal_2, modal_2Status] = useState("");
    const [modal_3, modal_3Status] = useState("");
  const [modal_5, modal_5Status] = useState("");
    const [modal_4, modal_4Status] = useState("");

    const modal = (e) => {
        if (e === "modal_1") {
            modal_1Status("true")
            setTimeout(doc => {
                document.getElementById("data1").innerHTML = marked(info.Datenschutz)
            }, 100)
        } else if (e === "modal_2") {
            modal_2Status("true")
            setTimeout(doc => {
                document.getElementById("data2").innerHTML = marked(info.Nutzungdbedingungen)
            }, 100)
        } else if (e === "modal_3") {
            modal_3Status("true")
            setTimeout(doc => {
                document.getElementById("data3").innerHTML = marked(info.Impressum)
            }, 100)
        }else if(e === "modal_4"){
            modal_4Status("true")
            // setTimeout(doc=>{
            //     document.getElementById("data5").innerHTML = marked(info.iletisim)
            // }, 100)
        }else if(e === "modal_5"){
        modal_5Status("true")
        setTimeout(doc=>{
            document.getElementById("data4").innerHTML = marked(info.UyelikSozlesmesi)
        }, 100)
        }
    };

    return (
        <div className={styles.footerGeneral}>
            <div className="container">
                <div className={styles.footer}>
                    <div className={styles.links}>

                        {defaultApplink ? <FormattedMessage id="Home.ucretsizUygulamaniziIndirin" /> : ""}
                        
                        {defaultApplink ? <a href="https://play.google.com/store/apps/details?id=de.beepr" rel="noopener noreferrer" target="_blank" className={styles.img}><img src={app2} alt=""/></a> : ""}
                    </div>
                    <div className={styles.links2}>
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
                            {/* <li onClick={(e) => modal("modal_1")}>
                                <FormattedMessage id="Home.nedenUyudunMu" />
                            </li>
                            <li onClick={(e) => modal("modal_2")}>
                                <FormattedMessage id="Home.yardim" />
                            </li>
                            <li onClick={(e) => modal("modal_3")}>
                                <FormattedMessage id="Home.gizlilikSozlesmesi" />
                            </li>
                            <li onClick={(e) => modal("modal_5")}>
                                <FormattedMessage id="Home.uyelikSozlesmesi" />
                            </li>
                            <li onClick={(e) => modal("modal_4")}>
                                <FormattedMessage id="Home.iletisim" />
                        </li> */}
                        </ul>
                    </div>
                    <div className={styles.c}> 
                        <span role="img" aria-label="img">©️</span> {general.title} 2018 - 2020 Hand-crafted with <img src={HeartIcon} style={{width:18, height:18, marginLeft:6}} alt="" />
                    </div>
                    {/* <div>Das Mindestalter für die Teilnahme an disem 1:-Chat-Dienst beträgt 18 Jahre. Personen unter dıesem Mindestalter ist die Nutzung des Dienstes nıcht gestattet.</div> */}

                </div>
            </div>
            {modal_1 ? <Modal title={<FormattedMessage id="Home.gizlilikSozlesmesi" />} content={<div id="data1"></div>} status={modal_1} width={700} close={(e) => modal_1Status("")} /> : ""}
            {modal_2 ? <Modal title={<FormattedMessage id="Home.uyelikSozlesmesi" />} content={<div id="data2"></div>} status={modal_2} width={700} close={(e) => modal_2Status("")} /> : ""}
            {/* <Modal title={<FormattedMessage id="Home.yardim" />} content={<Contact close={(e) => modal_2Status("")} />} status={modal_2} width={500} close={(e) => modal_2Status("")} /> */}
            {modal_3 ?<Modal title={<FormattedMessage id="Home.kunye" />} content={<div id="data3"></div>} status={modal_3} width={700} close={(e) => modal_3Status("")} /> : ""}
            {modal_5 ? <Modal title={<FormattedMessage id="Home.uyelikSozlesmesi" />} content={<div id="data4"></div>} status={modal_5} width={700} close={(e) => modal_5Status("")} /> : ""}
            {modal_4 ? <Modal title={<FormattedMessage id="Home.iletisim" />} content={<Contact />} status={modal_4} width={500} close={(e) => modal_4Status("")} /> : ""}
        </div>)
}
export default Footer;
