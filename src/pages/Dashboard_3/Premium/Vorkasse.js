import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import Vorkasse_logo from '../../../assets/img/vorkasse_logo.png';
import classnames from 'classnames'
import { getUserLastPayment} from "../../../state/actions/payment"
import PrintIcon from "../../../assets/img/icons/print.svg"
import {defaultHesapAdi, defaultIban, defaultBic} from "../../../Settings"
const Premium = (props) => {
    const dispatch = useDispatch();
    const { payments, userData } = useSelector(
        (state) => ({
            payments: state.payments ? state.payments : [],
            userData: state.auth.userData,
        }), shallowEqual
    );
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getUserLastPayment())
    }, [dispatch]);

    const print = () =>{
        var content = document.getElementById("divcontents");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }
    return (
        <div id="vorkasse" className={classnames(styles.Vorkasse)}>
            <div className={classnames(styles.content)}>
                <img src={PrintIcon} onClick={print} className={styles.print} style={{width:30, height:30}} alt="" />
                {/* <PrintIcon onClick={print} className={styles.print} style={{width:30, height:30}} fill="#333" /> */}
                <div className={classnames(styles.main)} id="divcontents">
                    <img className={classnames(styles.logo)} src={Vorkasse_logo} alt=""/>
                    <b>{payments.amount} €</b>
                    <p className={classnames(styles.small)}>{payments.time}</p>
                    <p>Bitte Überweisen Sie den angezeigten Betarg an die unten angegebene Bankverbindung und gib dabei als Verwendungszweck deinen Nickname und die angezeigte Nummer an! Das ist sehr wichtig andern falls können wir die Zahlung nicht zuordnen. </p>
                    <ul>
                        <li>
                            <span>Bank: </span> TransferWise Europe SA
                        </li>
                        <li>
                            <span>Konto inhaber: </span> {defaultHesapAdi}
                        </li>
                        <li>
                            <span>IBAN: </span> {defaultIban}
                        </li>
                        <li>
                            <span>BIC: </span> {defaultBic}
                        </li>
                        <li>
                            <span>Betrag: </span> {payments.amount} €
                        </li>
                        <li>
                            <span>Verwedungszweck: </span> {userData.meta.nickname} + {payments.id}
                        </li>
                    </ul>
                    <p className={styles.alert}>Witcting: Bitte gib als Verwendungszweck deine Nickname + Number an!</p>
                </div>
            </div>
            <iframe title="payment" id="ifmcontentstoprint" style={{height: 0,width:0, position: "absolute"}}></iframe>
        </div>)
}
export default Premium;
