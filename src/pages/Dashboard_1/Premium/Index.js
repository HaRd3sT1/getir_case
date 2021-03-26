import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import { Link } from 'react-router-dom';
// import Bonus from '../../../assets/img/bonus';
import Gold from "../../../assets/img/gold.js";
import paypal from '../../../assets/img/paypal.png';
import visa from '../../../assets/img/visa.png';
import sofort from '../../../assets/img/sofort.png';
import paysafecard from '../../../assets/img/paysafecard.png';
import vorkasse from '../../../assets/img/vorkasse.png';
import { closeMessage } from "../../../state/actions/messages"
import classnames from 'classnames'
import Bonus from "../../../assets/img/icons/bonus.svg"
const Premium = (props) => {
    const dispatch = useDispatch();
    const { packets } = useSelector(
        (state) => ({
            packets: state.generalDataReducer.packets ? state.generalDataReducer.packets : []
        }), shallowEqual
    );
    useEffect(() => {
        window.scrollTo(0, 0);

        if (window.innerWidth < 991) {
            dispatch(closeMessage())
        }
    }, [dispatch]);

    return (
        <div id="premium" className={styles.container}>
            <div className={styles.list}>
                <div className={styles.active}>
                    1
          </div>
                <div>
                    2
          </div>
                <div>
                    3
          </div>
            </div>
            {packets.map((post, index) => {
                if (post.type === "vip"){
                    return null
                }
                return (
                    <Link key={index} className={classnames(styles.box, styles[post.type])} to={{
                        pathname: "/step2", state: { pay: post.pay, payText: post.payText, payTitle: post.paket, payTitle2: post.title }
                    }}>
                        <p className={styles.boxCoinP}><span className={styles.boxCoinB}>{post.coin}</span> Coins</p>

                        <div className={styles.content}>
                            <h4>{post.title} <Gold className={styles.medal} width="36px" height="36px" /></h4>
                            <b className={styles.boxPayB}>{post.payText}€</b>
                        </div>
                        {post.extraCoin ? <div className={styles.bonus}>
                            <img src={Bonus} style={{width:44, height:44}} alt="" />
                            {/* <Bonus width="44px" height="44px" /> */}
                            <div className=" text-right">
                                <p>+ {post.extraCoin}</p>
                                <p>Bonus Coins</p>
                            </div>
                        </div> : ""}
                        <i className="fi flaticon-right-arrow"></i>
                    </Link>
                )
            })}
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
export default Premium;
