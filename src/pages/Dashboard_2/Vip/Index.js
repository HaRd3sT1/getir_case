import React, {useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import { Link } from 'react-router-dom';
import classnames from 'classnames'
import paypal from '../../../assets/img/paypal.png';
import visa from '../../../assets/img/visa.png';
import sofort from '../../../assets/img/sofort.png';
import paysafecard from '../../../assets/img/paysafecard.png';
import vorkasse from '../../../assets/img/vorkasse.png';
import VipIcon from "../../../assets/img/vip.js";

const Vip = (props) => {
    const dispatch = useDispatch();
    const { packets } = useSelector(
        (state) => ({
            packets: state.generalDataReducer.packets ? state.generalDataReducer.packets : []
        }), shallowEqual
    );
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [dispatch]);

    return (
        <div id="vip" className={classnames(styles.containerVip)}>
            <div className={styles.vipTitle}>
                <VipIcon width="100px" height="100px" fill="none" color="#65676b" />
                <p>
                    Werde noch heute VIP - Mitglied & sichere Dir satte Rabatte, sowie exklusive Vorteile! Werde ein exklusiver Teil unserer Community und mach dadurch auf Dich aufmerksam!
          </p>
                <p>Nach dem Kauf wirst du auf unserer Seite als VIP - Mitglied geführt und genießt alle Vorteile.</p>
            </div>
            <div className={styles.box_list}>
                {packets.map((post, index) => {
                    if (post.type !== "vip") {
                        return null
                    }
                    return (
                        <Link key={index} className={classnames(styles.box, styles[post.type])} to={{
                            pathname: "/step2", state: { pay: post.pay, payText: post.payText, payTitle: post.paket, payTitle2: post.title }
                        }}>
                            <div>
                                <div className={styles.title}>
                                    <h4>{post.title}</h4>
                                    <p>{post.month} Monat</p>
                                </div>
                                <ul>
                                    {post.list.map((post, index) => {
                                        return (<li key={index}><span>
                                            <i className="flaticon-done-tick fi"></i>
                                            </span>{post}</li>)
                                    })}
                                </ul>
                                <small>(Einmalig {post.payText}€)</small>
                                <div className={styles.coin}>
                                    <p>Monatspreis</p>
                                    <b>{post.mountly}€</b>
                                </div>
                            </div>
                            <div className={styles.button}>
                                Wählen
                            </div>
                        </Link>
                    )
                })}
            </div>
            <ul className={styles.icons}>
                <li>
                    <img src={paypal} alt="" />
                </li>
                <li>
                    <img src={visa} alt="" />
                </li>
                <li>
                    <img src={sofort} alt="" />
                </li>
                <li>
                    <img src={paysafecard} alt="" />
                </li>
                <li>
                    <img src={vorkasse} alt="" />
                </li>
            </ul>
        </div>)
}
export default Vip;
