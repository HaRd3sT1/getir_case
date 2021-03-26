import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import firebase from "../../../firebase"
import styles from './Styles.module.scss';
import { closeMessage, setMessageOpen } from "../../../state/actions/messages"
import classnames from 'classnames'
import { ButtonSuccess} from "../../../components/Items/buttons"
import { paymentSubmit} from "../../../state/actions/payment"
import Faq from "../../../components/Layout/Faq/Faq_2"
import {defaultPayments, defaultVip, defaultPaysafecard, defaultCurrency} from "../../../Settings"
import {FormattedMessage, useIntl} from 'react-intl';
import LockIcon from "../../../assets/img/icons/lock.svg"
import CheckIcon from "../../../assets/img/icons/check.svg"
import SSLIcon from "../../../assets/img/icons/ssl.svg"
const Premium = (props) => {
    const intl = useIntl();
    let location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [firstPayment, firstPaymentSet] = useState(true)
    const [payText, setpayText] = useState("")
    const [payTitle, setpayTitle] = useState("")
    const [payTitle2, setpayTitle2] = useState("")
    const [pay, setpay] = useState("")
    const [payType, setpayType] = useState("")
    const [payType2, setpayType2] = useState("")
    const [howManyDay, sethowManyDay] = useState("")
    const [paymentType, setPaymentType] = useState(1)
    const [reloadPayment, setreloadPayment] = useState(false)
    const payList = defaultPayments

   const payTypeRef = useRef(null)
   const packetsRef = useRef(null)
   const buttonRef = useRef(null)
    const { packets, userData } = useSelector(
        (state) => ({
            userData: state.auth.userData,
            packets: state.generalDataReducer.packets ? state.generalDataReducer.packets : []
        }), shallowEqual
    );
    useEffect(() => {
        firebase.firestore().collection("payments").where("userid", "==", userData.docId).where("function", "==", "ok").where("packet", "==", 1).get().then(doc=>{
            if(!doc.size){
                firstPaymentSet(false)
            }
        })
        setTimeout(() => {
            dispatch(setMessageOpen(false))
        }, 1);
        window.scrollTo(0, 0);
        handleChange("directbanking", true)
        packets.forEach(post=>{
            if(post.type === "active"){
                setpayTitle(post.paket);
                setpay(post.pay);
                setpayText(post.payText);
                setpayTitle2(post.title);
            }
        })
        if (window.innerWidth < 991) {
            dispatch(closeMessage())
        }
        if(new URLSearchParams(location.search).get("type") === "vip"){
            handleChangeType(2)

        }
        if(userData.vip_end){
            // To calculate the time difference of two dates 
            var Difference_In_Time = (userData.vip_end.seconds  * 1000) - new Date().getTime(); 
            // To calculate the no. of days between two dates 
            sethowManyDay((Difference_In_Time / (1000 * 3600 * 24)).toFixed()) 
        }
        // eslint-disable-next-line
    }, [dispatch]);

    const handleChange = (e, noScroll) => {
        if(!noScroll){
            if(window.innerWidth > 991){
                setTimeout(() => {
                    // window.scrollTo({
                    //     top: 100,
                    //     behavior: "smooth"
                    // });
                    // ScrollEvent(packetsRef)
                    // packetsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })  
                }, 100);
            }
        }
        setpayTitle("");
        setpay("");
        setpayText("");
        setpayTitle2("");
        if (e === "directbanking") {
            setpayType2("sofort")
        } else if (e === "prepayment") {
            setpayType2("prepay")
        } else {
            setpayType2(e)
        }
        setpayType(e)
    }
    const handleChangeType = (e) => {
        setpayTitle("")
            if(window.innerWidth > 991){
                setTimeout(() => {
                    // ScrollEvent(payTypeRef)
                    // payTypeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })  
                }, 100);
            }
        setPaymentType(e)
    }
    return (
        <div id="premium" className={classnames(styles.container, styles.Premium)}>
            {reloadPayment && <div id="reloadPayment" className={styles.reloadPayment}>
                <b><FormattedMessage id="Premium.loading" /></b>
            </div>} 
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", position:"relative"}}>
                <div className={styles.title}><FormattedMessage id="Premium.title1" /></div>  
                <img src={SSLIcon} className={styles.ssl} style={{width:60, height:60, position:"absolute", right:0,top:0}} alt="" />
                {/* <SSLIcon className={styles.ssl} style={{width:60, height:60, position:"absolute", right:0,top:0}} /> */}
            </div>
            <div className={styles.typeList}>  
                <div style={{width:200, flex:"none"}} className={classnames(styles.item, paymentType === 1 ? styles.active3 : "")} onClick={(e) => handleChangeType(1)}>
                    <FormattedMessage id="Premium.premiumPaket" />
                </div>
                {defaultVip ? <div style={{width:200, flex:"none"}} className={classnames(styles.item, paymentType === 2 ? styles.active3 : "")} onClick={(e) => handleChangeType(2)}>
                    <FormattedMessage id="Premium.vipPaketler" />
                </div> : ""}
            </div>     
            {!userData.badge || paymentType !== 2 ? <div className={styles.title}  ref={payTypeRef}>{intl.formatMessage({id:"Premium.odemeYontemiSecin"})}</div> : ""} 
            {!userData.badge || paymentType !== 2 ? <div className={styles.typeList}>  
                {!reloadPayment && payList.map((doc, index) => {
                    return (
                        <div key={index} className={classnames(styles.item, payType === doc.value && styles.active)} onClick={(e) => handleChange(doc.value)}>
                            <img style={{ height: 22 }} src={doc.img} alt="" />
                        </div>)
                })}
            </div> : ""}    
            <div ref={packetsRef}> 
                <div>
                    {!userData.badge || paymentType !== 2 ? <div className={styles.title}><FormattedMessage id="Premium.seninPaketlerin" /></div> : ""}
                    {paymentType === 1 ?
                        <div className={styles.packetList}>  
                            {packets.map((post, index) => {
                                if(payType === "paysafecard" && defaultPaysafecard){
                                    if (post.type !== "paysafecard"){
                                        return null
                                    }
                                }else{

                                    if (post.type !== "" && post.type !== "active" && post.type !== "vorkasse"){

                                        // if(payType !== "prepayment" && post.type !== "vorkasse"){
                                        return null
                                        // }
                                    }
                                    if(post.type === "vorkasse" && payType !== "prepayment"){
                                        return null
                                    }
                                }
                                if(post.id === 1 && firstPayment){
                                    return null
                                }
                                // if(!starterPacket && index === 0){
                                //     return null
                                // }

                                    // <Link key={index} className={classnames(styles.box, styles[post.type])} to={{
                                    //     pathname: "/step2", state: { pay: post.pay, payText: post.payText, payTitle: post.paket, payTitle2: post.title }
                                    // }}>
                                return (
                                    <div key={index} className={classnames(styles.box, styles[post.type], payTitle === post.paket ? styles.active2 : "")} onClick={(e) => {
                                        setpayTitle(post.paket);
                                        setpay(post.pay);
                                        setpayText(post.payText);
                                        setpayTitle2(post.title);

                                        if(window.innerWidth > 991){
                                            setTimeout(() => {
                                                // console.log(buttonRef)
                                                // ScrollEvent(buttonRef)
                                                // window.scrollTo({
                                                //     top: 300,
                                                //     behavior: "smooth"
                                                // });
                                                // buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })  
                                            }, 100);
                                        }
                                    }}>
                                        <h4>{post.title} <div className={styles.medal}><FormattedMessage id="Premium.populer" /></div></h4>
                                        <p  className={styles.coin}><span>{post.coin}</span> <FormattedMessage id="Premium.coinler" /></p>
                                        <b><FormattedMessage id="Premium.benzersiz" /> {post.payStr} {defaultCurrency}</b>

                                        {post.extraCoin ? <div className={styles.bonus}>
                                            {/* <Bonus width="44px" height="44px" /> */}
                                            <p>+ {post.extraCoin}</p>
                                            <p><FormattedMessage id="Premium.bonusCoin" /></p>
                                        </div> : ""}
                                        {payTitle === post.paket &&<div className={styles.check}>
                                            <img src={CheckIcon} style={{width:20, height:20}} alt="" />
                                            {/* <CheckIcon style={{width:20, height:20}} fill="#fff"/> */}
                                        </div>}
                                    </div>
                                )
                            })}
                            
                        </div>:
                        !userData.badge ? <div className={styles.box_list}>
                            {packets.map((post, index) => {
                                if (post.type !== "vip"){
                                    return null
                                }

                                    // <Link key={index} className={classnames(styles.box, styles[post.type])} to={{
                                    //     pathname: "/step2", state: { pay: post.pay, payText: post.payText, payTitle: post.paket, payTitle2: post.title }
                                    // }}>
                                return (
                                            
                                    <div key={index} className={classnames(styles.box, payTitle === post.paket ? styles.active : "")}  onClick={(e) => {
                                        setpayTitle(post.paket);
                                        setpay(post.pay);
                                        setpayText(post.payText);
                                        setpayTitle2(post.title);

                                        if(window.innerWidth > 991){
                                            setTimeout(() => {
                                                // ScrollEvent(buttonRef)

                                                // window.scrollTo({
                                                //     top: 300,
                                                //     behavior: "smooth"
                                                // });
                                                // buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })  
                                            }, 100);
                                        }
                                    }}>
                                        <div>
                                            <div className={styles.title}>
                                                <h4>{post.title}</h4>
                                                <p>{post.month} Monat</p>
                                            </div>
                                            <ul>
                                                {post.list.map((post, index) => {
                                                    return (<li key={index}><span>
                                                        <img src={CheckIcon} alt="" />
                                                        {/* <i className="flaticon-done-tick fi"></i> */}
                                                        </span>{post}</li>)
                                                })}
                                            </ul>
                                            <small>(Einmalig {post.payText}€)</small>
                                            <div className={styles.coin}>
                                                <p>Monatspreis</p>
                                                <b>{post.mountly}€</b>
                                            </div>
                                            {payTitle === post.paket &&<div className={styles.check}>
                                                <img src={CheckIcon} style={{width:20, height:20}} alt="" />
                                                {/* <CheckIcon style={{width:20, height:20}} fill="#fff"/> */}
                                            </div>}
                                        </div>
                                        {/* <div className={styles.button}>
                                            Wählen
                                        </div> */}
                                    </div>
                                )
                            })}
                        </div> : <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <div style={{width:120,height:120, marginTop:60,borderStyle:"solid",borderWidth:4,borderColor:"#fff",borderRadius:"100%", backgroundSize:"cover", backgroundPosition:"center",backgroundImage:"url("+userData.meta.avatarThumb+")"}}>

                            </div>
                            <div style={{boxShadow:"0 10px 25px 0 rgba(0, 0, 0, 0.12)",padding:14,borderRadius:10, width:340, marginTop:30, textShadow:"1px 1px 3px #cc853d", fontWeight:500, textAlign:"center",color:"#fff", fontSize:18,background:"linear-gradient(153deg, rgba(255,170,100,1) 0%, rgb(249 203 99) 100%)"}}>
                            Noch <b>{howManyDay}</b> Tage bis Premium Ablauf</div>
                            {/* vip_end */}
                        </div>
                    }
                </div>
            </div>
            {!userData.badge || paymentType !== 2 ? <div>
            <div ref={buttonRef}>
                {/* {payTitle &&  */}
                <div className={styles.bottom}>
                    <ButtonSuccess  onClick={(e) => dispatch(paymentSubmit(payType, payTitle, pay, payText, payType2, payTitle2, setreloadPayment, history))} style={{width:270}} text={<FormattedMessage id="Premium.SatinAl" />} />
                    <p>
                        <img src={LockIcon} style={{width:22, height:22}} alt="" />
                        {/* <LockIcon style={{width:22, height:22}} fill="#333" /> */}
                        
                        <FormattedMessage id="Premium.SSL" />
                    </p>
                </div>
            </div>
            <Faq />
            </div> : ""}
        </div>)
}
export default Premium;
