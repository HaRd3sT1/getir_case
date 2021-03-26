import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './Footer_2.module.scss';
import Modal from "../../../components/Items/modal"
import Contact from "../../../components/template_1/Contact"
import app2 from "../../../assets/img/app2.svg"
import marked from 'marked';
import {defaultSocial, defaultApplink} from "../../../Settings"
import HeartIcon from "../../../assets/img/icons/heart.svg"
import Facebook from "../../../assets/img/icons/facebook.svg"
import Instagram from "../../../assets/img/icons/instagram.svg"

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
        }
    };

    return (
        <div className={styles.footerGeneral}>
            <div className="container">
                <div className={styles.footer}>
                    <div className={styles.links2}>
                        <div className={styles.c}>
                            ©️ {general.title} 2018 - 2020 Hand-crafted with <img src={HeartIcon} style={{width:18, height:18, marginLeft:6}} alt="" /> 
                        </div>
                        <ul>
                            <li onClick={(e) => modal("modal_1")}>
                                Datenschutz
                        </li>
                            <li onClick={(e) => modal("modal_2")}>
                                Nutzungsbedingungen
                        </li>
                            <li onClick={(e) => modal("modal_3")}>
                                Impressum
                        </li>
                            <li onClick={(e) => modal_4Status("true")}>
                                Kontakt
                        </li>
                        </ul>
                    </div>
                    {/* <div>Das Mindestalter für die Teilnahme an disem 1:-Chat-Dienst beträgt 18 Jahre. Personen unter dıesem Mindestalter ist die Nutzung des Dienstes nıcht gestattet.</div> */}

                    <div className={styles.links}>
                        {defaultSocial ? 
                        <div className={styles.social}>
                            <a href={general.facebook} target="_blank" rel="noopener noreferrer">
                                <img src={Facebook} alt="" />
                            </a>
                            <a  href={general.instagram} target="_blank" rel="noopener noreferrer">
                                <img src={Instagram} alt="" />
                            </a>
                        </div> : ""}
                        {defaultApplink ? <a href="https://play.google.com/store/apps/details?id=de.beepr" rel="noopener noreferrer" target="_blank" className={styles.img}><img src={app2} alt=""/></a> : ""}
                    </div>
                </div>
            </div>
            {modal_1 ? <Modal title="Datenschutz" content={<div id="data1"></div>} status={modal_1} width={700} close={(e) => modal_1Status("")} /> : ""}
            {modal_2 ? <Modal title="Nutzungsbedingungen" content={<div id="data2"></div>} status={modal_2} width={700} close={(e) => modal_2Status("")} /> : ""}
            {modal_3 ? <Modal title="Impressum" content={<div id="data3"></div>} status={modal_3} width={700} close={(e) => modal_3Status("")} /> : ""}
            {modal_4 ? <Modal title="Kontakt" content={<Contact close={(e) => modal_4Status("")} />} status={modal_4} width={500} close={(e) => modal_4Status("")} /> : ""}
        </div>)
}
export default Footer;
