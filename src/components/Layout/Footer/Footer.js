import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './Footer.module.scss';
import Modal from "../../../components/Items/modal"
import Contact from "../../../components/template_1/Contact"
import marked from 'marked';

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
        <div className={styles.footer}>
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
            <div>Copyright by {general.title}</div>
            <Modal title="Datenschutz" content={<div id="data1"></div>} status={modal_1} width={700} close={(e) => modal_1Status("")} />
            <Modal title="Nutzungsbedingungen" content={<div id="data2"></div>} status={modal_2} width={700} close={(e) => modal_2Status("")} />
            <Modal title="Impressum" content={<div id="data3"></div>} status={modal_3} width={700} close={(e) => modal_3Status("")} />
            <Modal title="Kontakt" content={<Contact close={(e) => modal_4Status("")} />} status={modal_4} width={500} close={(e) => modal_4Status("")} />
        </div>)
}
export default Footer;
