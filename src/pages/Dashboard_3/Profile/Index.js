import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteProfile, profilMessage } from "../../../state/actions/auth"
import styles from "./Profile.module.scss"
import { ButtonDanger, ButtonDark, ButtonBlue, ButtonPrimary } from "../../../components/Items/buttons"
import classnames from "classnames"
import Modal from "../../../components/Items/modal"
import { profileUser} from "../../../state/actions/users"
import { addFriend, removeFriend} from "../../../state/actions/friends"
import {addViews} from "../../../state/actions/views"
import { buyImage, mainData } from "../../../state/actions/dashboard"
import GiftsList from "../../../components/Layout/GiftList/GiftList"
import {getRandomNumber} from "../../../Hooks"
import { openMessageCheck, closeMessage, sendFirstMessage } from "../../../state/actions/messages"
import { favRemove, favAdd } from "../../../state/actions/favs"
import { onChange } from "../../../state/actions/form"
import Hobs_1 from "../../../assets/img/hobs/1.svg"
import Hobs_2 from "../../../assets/img/hobs/2.svg"
import Hobs_3 from "../../../assets/img/hobs/3.svg"
import Hobs_4 from "../../../assets/img/hobs/4.svg"
import Hobs_5 from "../../../assets/img/hobs/5.svg"
import Hobs_6 from "../../../assets/img/hobs/6.svg"
import Hobs_7 from "../../../assets/img/hobs/7.svg"
import Hobs_8 from "../../../assets/img/hobs/8.svg"
import Hobs_9 from "../../../assets/img/hobs/9.svg"
import Hobs_10 from "../../../assets/img/hobs/10.svg"
import Hobs_11 from "../../../assets/img/hobs/11.svg"
import Hobs_12 from "../../../assets/img/hobs/12.svg"
import Hobs_13 from "../../../assets/img/hobs/13.svg"
import Hobs_14 from "../../../assets/img/hobs/14.svg"
import Hobs_15 from "../../../assets/img/hobs/15.svg"
import Hobs_16 from "../../../assets/img/hobs/16.svg"
import Hobs_17 from "../../../assets/img/hobs/17.svg"
import Hobs_18 from "../../../assets/img/hobs/18.svg"
import Hobs_19 from "../../../assets/img/hobs/19.svg"
import Hobs_20 from "../../../assets/img/hobs/20.svg"
import Hobs_21 from "../../../assets/img/hobs/21.svg"
import Hobs_22 from "../../../assets/img/hobs/22.svg"
import SecurityIcon from "../../../assets/img/icons/security.svg"
import GiftIcon from "../../../assets/img/icons/gift.svg"
import Chat2Icon from "../../../assets/img/icons/chat2.svg"
import SendIcon from "../../../assets/img/icons/send.svg"
import Gift2Icon from "../../../assets/img/icons/gift2.svg"
import Fire2Icon from "../../../assets/img/icons/fire2.svg"
import Fire2WhiteIcon from "../../../assets/img/icons/fire2White.svg"
import LockWhiteIcon from "../../../assets/img/icons/lockWhite.svg"
import AddFriendIcon from "../../../assets/img/icons/addFriend.svg"
import RemoveFriendIcon from "../../../assets/img/icons/removeFriend.svg"
import Gold from "../../../assets/img/icons/gold.svg"
import Bronze from "../../../assets/img/icons/bronze.svg"
import Silver from "../../../assets/img/icons/silver.svg"
import {userId_2_S, defaultHobs, defaultRelation, defaultLanguages, defaultSport, defaultMusic, defaultFilm, defaultActivite, defaultBody, defaultEyeColor, defaultHairColor, defaultStyle, defaultExtra, defaultMeslek, defaultMezuniyet, defaultIliskiDurumu, defaultCocuklar, defaultFakeId} from "../../../Settings"

import {FormattedMessage, useIntl} from 'react-intl';
const Profile = (props) => {
    const intl = useIntl();
    const { id } = useParams();
    const { userData, users, coins, favs, messages, friends, friendsWaiting } = useSelector(
        (state) => ({
            coins: state.generalDataReducer.coins,
            friends: state.friends.list ? state.friends.list : [],
            friendsWaiting: state.friends.waiting ? state.friends.waiting : [],
            users: state.users ? state.users : [],
            messages: state.messages.list ? state.messages.list : [],
            userData: state.auth.userData,
            favs: state.favs.list ? state.favs.list : [],
        }), shallowEqual
    );
    const [avatarEffect, avatarEffectSet] = useState(true);
    const [modal_Image, modal_ImageStatus] = useState("");
    const [deleteProfileModal, deleteProfileStatus] = useState("");
    const [userProfile, userProfileStatus] = useState(false);
    const [sliding, setSliding] = useState(false);
    const [modal_1, modal_1Status] = useState("");
    const [modal_2, modal_2Status] = useState("");
    const [firstMessage, firstMessageStatus] = useState(false);
    const hobsIncon = [Hobs_1, Hobs_2, Hobs_3, Hobs_4, Hobs_5, Hobs_6, Hobs_7, Hobs_8, Hobs_9, Hobs_10, Hobs_11, Hobs_12, Hobs_13, Hobs_14, Hobs_15, Hobs_16, Hobs_17, Hobs_18, Hobs_19, Hobs_20, Hobs_21, Hobs_22];
    const [dragging, draggingStatus] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            avatarEffectSet(false)
        }, 3050);
        dispatch(mainData(5, true))
        dispatch(profileUser(id))
        if (userData.docId === id){
            userProfileStatus(true)
            if (userData.info){
                dispatch(onChange("info", userData.info))
            }
        }
        // if (window.innerWidth < 991){
            dispatch(closeMessage())
        // }
        
        // dispatch(setMessageOpen(false))

        setTimeout(() => {
            const ele = document.getElementById('slider');
            if(ele){
                let pos = { top: 0, left: 0, x: 0, y: 0 };

                const mouseDownHandler = function(e) {
                    pos = {
                        left: ele.scrollLeft,
                        top: ele.scrollTop,
                        x: e.clientX,
                        y: e.clientY,
                    };

                    document.addEventListener('mousemove', mouseMoveHandler);
                    document.addEventListener('mouseup', mouseUpHandler);
                };

                const mouseMoveHandler = function(e) {
                    if(!dragging){
                        draggingStatus(true)
                    }
                    const dx = e.clientX - pos.x;
                    const dy = e.clientY - pos.y;

                    ele.scrollTop = pos.top - dy;
                    ele.scrollLeft = pos.left - dx;
                };

                const mouseUpHandler = function() {
                    setTimeout(() => {
                        draggingStatus(false)
                    }, 100);
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    document.removeEventListener('mouseup', mouseUpHandler);
                };

                ele.addEventListener('mousedown', mouseDownHandler);
            }  
        }, 1000);


        if(id.split("_")[0] === "user"){
            dispatch(addViews(userId_2_S(id)))

            let random = getRandomNumber(5)
            if(random === 1){
                // let randomTime = 40000 * getRandomNumber(12)
                // setTimeout(() => {
                    profilMessage(userData.docId, userData.meta.nickname, userData.meta.avatarThumb, userId_2_S(id), userData.meta.city, userData.meta.birtDate)
                // }, randomTime);
            }
        }
    // eslint-disable-next-line
    }, [dispatch, id]);
    useEffect(() => {
        let firstM = true
        messages.forEach(doc=>{
            if (doc.to[0] === id || doc.to[1] === id){
                firstM = false
            }
        })
        firstMessageStatus(firstM)
    }, [messages, id]);
    useEffect(() => {
        setTimeout(() => {
            setSliding(false)
        }, 300);
    }, [sliding]);
    if (!users[id] ||  !coins){
        return null
    }
    return (
        <section className={styles.profilePage}>
            <div className={styles.top}>
                <div className={styles.avatar}>
                    <div className={styles.image} style={{backgroundImage:"url("+(users[id].avatar === "noavatar.jpg" ? "/"+users[id].avatar : users[id].avatar)+")"}}></div>
                    <div className={styles.effect}>
                        {avatarEffect ? <svg className={styles.circular} viewBox="25 25 50 50">
                            <circle id="storyPath" className={styles.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"></circle>
                        </svg> : <svg className={styles.circular} viewBox="25 25 50 50">
                            <circle id="storyPath" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"></circle>
                        </svg>}
                        
                        
                    </div>
                </div>
                <div className={styles.nickname}>
                    <h2 className={styles.h2}>
                        {users[id].badge ? users[id].badge === "Gold" ? <img src={Gold} alt="" style={{marginRight:6, width:30, height:30}} /> : users[id].badge === "Bronze" ? <img src={Bronze} alt="" style={{marginRight:6, width:30, height:30}} /> : <img src={Silver} alt="" style={{marginRight:6, width:30, height:30}} /> : <span></span>} {users[id].nickname}, {users[id].age}
                        <div className={styles.bottom}>
                            <div className={styles.item}  tooltip={intl.formatMessage({id:"Profile.onaylandi"})} flow="down">
                                <img src={SecurityIcon} style={{width:12, height:12}} alt="" />
                            </div>
                            <div className={styles.item} tooltip={intl.formatMessage({id:"Profile.hediyeGonder"})} flow="down" onClick={(e)=>userData.docId !== id ? modal_2Status(true) : ""}>
                                <img src={GiftIcon} style={{width:12, height:12}} alt="" />
                            </div>
                            {favs.includes(userId_2_S(id)) ? <div className={styles.item} style={{backgroundColor:"#fe646f"}} tooltip={intl.formatMessage({id:"Profile.favoriCikar"})} flow="down" onClick={(e) => userData.docId !== id ? dispatch(favRemove(userId_2_S(id))) : ""} >
                                <img src={Fire2WhiteIcon} style={{width:14, height:14}} alt="" />
                            </div> :
                            <div className={styles.item} tooltip={intl.formatMessage({id:"Profile.favoriEkle"})} onClick={(e) => userData.docId !== id ? dispatch(favAdd(userId_2_S(id))) : ""} flow="down">
                                <img src={Fire2Icon} style={{width:14, height:14}} alt="" />
                            </div>}
                            
                        </div>
                    </h2>
                    <p className={styles.p} style={{ textTransform: "capitalize" }}>{users[id].online ? "Online" : "Offline"}, {users[id].city && users[id].city.charAt(0).toUpperCase() + users[id].city.slice(1)}</p>
                </div>
                <div className={styles.buttons}>
                    <button tooltip={intl.formatMessage({id:"Profile.mesajGonder"})} flow="down"  onClick={(e) => userData.docId !== id ? dispatch(openMessageCheck(userId_2_S(id))) : ""}>
                        <img src={Chat2Icon} style={{width:30, height:30}} alt="" />
                    </button>
                    
                    {favs.includes(userId_2_S(id)) ? <button style={{backgroundColor:"#fe646f"}} onClick={(e) => userData.docId !== id ? dispatch(favRemove(userId_2_S(id))) : ""} tooltip={intl.formatMessage({id:"Profile.favoriCikar"})} flow="down">
                        <img src={Fire2WhiteIcon} style={{width:30, height:30}} alt="" />
                    </button> :
                    <button  onClick={(e) => userData.docId !== id ? dispatch(favAdd(userId_2_S(id))) : ""} tooltip={intl.formatMessage({id:"Profile.favoriEkle"})} flow="down">
                        <img src={Fire2Icon} style={{width:30, height:30}} alt="" />
                    </button>}
                    
                </div>
            </div>
            {<div className={styles.photosGeneral}>
                <div className={styles.hidden}>
                    <div id="slider" className={styles.slider}>
                        <ul className={classnames(styles.photos, sliding ? styles.sliding : "", styles.sliderContent)}>
                            {userProfile && users[id].photos && users[id].photos ?
                                users[id].photos.map((post, index) => {
                                    return (<li 
                                    key={index}
                                    ><div className={styles.overlay} onClick={(e) => !dragging && modal_ImageStatus(post)}>
                                    </div><img src={post} alt="photos" />
                                    </li>)
                                })
                                : ""}
                            {!userProfile && users[id].photos && users[id].photos ? users[id].photos.map((post, index) => {
                                    if (friends.includes(id)) {
                                        return (<li key={index} onClick={(e) => !dragging && modal_ImageStatus(post)}><div className={styles.overlay}>
                                        </div><img style={{ maxHeight: "none" }} src={post} alt="photos" /></li>)
                                    } else {
                                        return (<li key={index}><div className={styles.buyBtn}><img style={{ maxHeight: "none" }} src={users[id].pBlur[index]} alt="photos" /><div className={styles.buyInfo}><img src={LockWhiteIcon} style={{width:32, height:32}} alt="" /><p><FormattedMessage id="Profile.sadeceArkadaslar" /></p></div></div></li>)
                                    }
                            }) : ""}
                        </ul>
                    </div>
                </div>
            </div>}
            <div className={styles.content}>
                <div className={styles.left}>
                    <h4><FormattedMessage id="Profile.biyografi" /></h4>
                    <p>{users[id].info ? users[id].info : "-"}</p>
                    <h4><FormattedMessage id="Profile.kisiselOzellikler" /></h4>
                    <ul className={styles.list}>
                        <li className={styles.p}><div className={styles.b}><FormattedMessage id="Profile.sacRengi" />: </div> <b style={{ textTransform: "capitalize" }}>{!Number(users[id].hairColor) && Number(users[id].hairColor) !== 0 ? users[id].hairColor : defaultHairColor[users[id].hairColor]}</b></li>
                        <li className={styles.p}><div className={styles.b}><FormattedMessage id="Profile.gozRengi" />: </div> <b style={{ textTransform: "capitalize" }}>{!Number(users[id].eyeColor) && Number(users[id].eyeColor) !== 0 ? users[id].eyeColor : defaultEyeColor[users[id].eyeColor]}</b></li>
                        <li className={styles.p}><div className={styles.b}><FormattedMessage id="Profile.vucutYapisi" />: </div> <b style={{ textTransform: "capitalize" }}>{!Number(users[id].body) && Number(users[id].body) !== 0 ? users[id].body : defaultBody[users[id].body]}</b> </li>
                        <li className={styles.p}><div className={styles.b}><FormattedMessage id="Profile.boy" />: </div> <b style={{ textTransform: "capitalize" }}>{users[id].height}</b></li>
                        <li className={styles.p}><div className={styles.b}><FormattedMessage id="Profile.ilgilenilenler" />: </div> <b style={{ textTransform: "capitalize" }}>{users[id].filterGender === 0 ? <FormattedMessage id="General.erkek" /> : <FormattedMessage id="General.kadin" />}</b></li>
                        <li className={styles.p}><div className={styles.b}><FormattedMessage id="Profile.arananIliskiler" />: </div>
                        <div className={styles.list_2} style={{width:"auto"}}>
                            {users[id].relation && users[id].relation.map((doc, index) => {
                                    return <div key={index}>{defaultRelation[doc]}</div>
                            })}
                        </div>
                        </li>
                        <li className={styles.p}>
                            <div className={styles.b}><FormattedMessage id="Profile.mezuniyet" />:</div>
                            <b>{users[id].character && defaultMezuniyet[users[id].character.abschluss]}</b>
                        </li>
                        <li className={styles.p}>
                            <div className={styles.b}><FormattedMessage id="Profile.meslek" />:</div>
                            <b>{users[id].character && defaultMeslek[users[id].character.berufsstand]}</b>
                        </li>
                        <li className={styles.p}>
                            <div className={styles.b}><FormattedMessage id="Profile.iliskiDurumu" />:</div>
                            <b>{users[id].character && defaultIliskiDurumu[users[id].character.beziehungsstatus]}</b>
                        </li>
                        <li className={styles.p}>
                            <div className={styles.b}><FormattedMessage id="Profile.cocuklar" />:</div>
                            <b>{users[id].character && defaultCocuklar[users[id].character.kinder]}</b>
                        </li>
                        <li className={styles.p}>
                            <div className={styles.b}><FormattedMessage id="Profile.stil" />:</div>
                            <b>{!Number(users[id].style) && Number(users[id].style) !== 0 ? users[id].style : defaultStyle[users[id].style]}</b>
                        </li>
                        <li className={styles.p}>
                            <div className={styles.b}><FormattedMessage id="Profile.dovmePiercing" />:</div>
                            <b>{!Number(users[id].extra) && Number(users[id].extra) !== 0 ? users[id].extra : defaultExtra[users[id].extra]}</b>
                        </li>
                    </ul>
                    <h4><FormattedMessage id="Profile.hobiler" /></h4>
                    <div className={styles.list_2}>
                        {users[id].hobs ? users[id].hobs.map((doc, index) => {
                            if (!defaultHobs[doc]) { return null }
                            return (
                                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                    <img style={{ height: 18, marginRight: 10 }} src={hobsIncon[doc]} alt="" />
                                    {defaultHobs[doc]}
                                </div>
                            )
                        }) : "-"}
                    </div>
                    <h4><FormattedMessage id="Profile.filmler" /></h4>
                    <div className={styles.list_2}>
                        {users[id].character && users[id].character.filme ? users[id].character.filme.map((doc, index) =>{
                            return(
                            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                {defaultFilm[doc]}
                            </div>
                            )
                        }) : "-"}
                    </div>
                    <h4><FormattedMessage id="Profile.muzikler" /></h4>
                    <div className={styles.list_2}>
                        {users[id].character && users[id].character.musik ? users[id].character.musik.map((doc, index) =>{
                            return(
                            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                {defaultMusic[doc]}
                            </div>
                            )
                        }) : "-"}
                    </div>
                    <h4><FormattedMessage id="Profile.spor" /></h4>
                    <div className={styles.list_2}>
                    {users[id].character && users[id].character.sport ? users[id].character.sport.map((doc, index) =>{
                        return(
                        <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                            {defaultSport[doc]}
                        </div>
                        )
                    }) : "-"}
                    </div>
                    <h4><FormattedMessage id="Profile.diller" /></h4>
                    <div className={styles.list_2}>
                    {users[id].character && users[id].character.sprachen  ? users[id].character.sprachen.map((doc, index) =>{
                        return(
                        <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                            {defaultLanguages[doc]}
                        </div>
                        )
                    }) : "-"}
                    </div>
                    <h4><FormattedMessage id="Profile.eglence" /></h4>
                    <div className={styles.list_2}>
                    {users[id].character && users[id].character.unterhaltung ? users[id].character.unterhaltung.map((doc, index) =>{
                        return(
                        <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                            {defaultActivite[doc]}
                        </div>
                        )
                    }) : "-"}
                    </div>
                </div>
                <div className={styles.right}>
                    {friends.includes(id) ? <ButtonPrimary onClick={(e)=> dispatch(removeFriend(id))} 
                    icon={<img src={RemoveFriendIcon} style={{width:28, height:28, marginRight:6}} alt="" />} 
                    text={<FormattedMessage id="General.arkadasCikar" />} style={{textTransform:"none", borderRadius:10, height:50, marginTop:10}} /> : friendsWaiting.includes(id) ? <ButtonDark  text={<FormattedMessage id="Profile.arkadaslikIstegiBekleniyor" />} style={{textTransform:"none", borderRadius:10, height:50, marginTop:10}} /> : <ButtonBlue onClick={(e)=> dispatch(addFriend(id))} icon={<img src={AddFriendIcon} style={{width:28, height:28, marginRight:6}} alt="" />} text={<FormattedMessage id="General.arkadasEkle" />} style={{textTransform:"none", borderRadius:10, height:50, marginTop:10}} />}

                    
                    {firstMessage ? <h4><FormattedMessage id="Profile.ilkMesajiGonder" /></h4> : ""}
                    {firstMessage ? <div className={styles.firstMessage}>
                        <div className={styles.main}>
                            <div className={styles.arrow}></div>
                            <img src={Chat2Icon} style={{width:40, height:40}} alt="" />
                            <p><FormattedMessage id="Profile.ilk1" /> <span><FormattedMessage id="Profile.ilk2" /> </span> <FormattedMessage id="Profile.ilk3" /> </p>
                        </div>
                        <div className={styles.footer}>
                            {/*  */}
                            <input type="text" placeholder={intl.formatMessage({id:"Profile.ilkMesaj"})} onChange={(e) => dispatch(onChange("message", e.target.value))} />
                            <img src={SendIcon} style={{width:22, height:22}} alt="" onClick={(e) => userData.docId !== id ? dispatch(sendFirstMessage(id, true)) :  ""} />
                        </div>
                    </div> : ""}
                    <h4><FormattedMessage id="Profile.hediyeler" /> </h4>
                    <div className={styles.list} onClick={(e)=>userData.docId !== id ? modal_2Status(true) : ""}>
                        <img src={Gift2Icon} style={{width:60, height:60}} alt="" />
                        <p><span>{users[id].nickname}</span> <FormattedMessage id="Profile.hediyeYazi" /> </p>
                    </div>
                </div>
            </div>

            <div className={styles.buttonsMobil}>
                <button tooltip={intl.formatMessage({id:"Profile.mesajGonder"})} flow="down"  onClick={(e) => userData.docId !== id ? dispatch(openMessageCheck(userId_2_S(id))) : ""}>
                    <img src={Chat2Icon} style={{width:30, height:30}} alt="" />
                    <p>{intl.formatMessage({id:"Profile.mesajGonder"})}</p>
                </button>
                
                {favs.includes(userId_2_S(id)) ? <button style={{backgroundColor:"#fe646f"}} onClick={(e) => userData.docId !== id ? dispatch(favRemove(userId_2_S(id))) : ""} tooltip={intl.formatMessage({id:"Profile.favoriCikar"})} flow="down">
                    <img src={Fire2WhiteIcon} style={{width:30, height:30}} alt="" />
                </button> :
                <button  onClick={(e) => userData.docId !== id ? dispatch(favAdd(userId_2_S(id))) : ""} tooltip={intl.formatMessage({id:"Profile.favoriEkle"})} flow="down">
                    <img src={Fire2Icon} style={{width:30, height:30}} alt="" />
                </button>}
                
            </div>
            {modal_2 ? <Modal title={<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{width:44, height:44, borderRadius:44, marginRight:10,flex:"none",backgroundImage:"url("+users[id].avatar+")"}}></div>{users[id].nickname} <FormattedMessage id="General.seninHediyeleriniBekliyor" /></div>} content={<GiftsList fakeId={id} close={modal_2Status} />} status={modal_2} width={700} close={(e) => modal_2Status("")} type="buyGift" /> : ""}


            {deleteProfileModal ? <Modal title={<FormattedMessage id="General.bilgi" /> } content={<FormattedMessage id="Profile.profilSilUyari" /> } buttons={<div><ButtonDark onClick={(e) => deleteProfileStatus("")} style={{ flex: 1, borderRadius:10, height:50 }} text={<FormattedMessage id="General.hayir" />} /><ButtonDanger onClick={(e) => { deleteProfileStatus(""); dispatch(deleteProfile()) }} style={{ flex: 1, borderRadius:10, height:50 }} text={<FormattedMessage id="General.evet" />} /></div>} status={deleteProfileModal} width={500} close={(e) => deleteProfileStatus("")} /> : ""}

            {modal_1 ?<Modal title={<FormattedMessage id="General.bilgi" /> } content={<FormattedMessage id="Profile.kilitAcUyari" />} buttons={<div><ButtonDark onClick={(e) => modal_1Status("")} style={{ flex: 1, borderRadius:10, height:50 }} text={<FormattedMessage id="General.hayir" />} /><ButtonDanger onClick={(e) => { modal_1Status(""); dispatch(buyImage(modal_1)) }} style={{ flex: 1, borderRadius:10, height:50 }} text={coins.profilePhotoCoin+" Coin)"} /></div>} status={modal_1} width={500} close={(e) => modal_1Status("")} /> : ""}
            {modal_Image ? <Modal title="Photo" content={<img style={{pointerEvents: 'none'}} src={modal_Image} alt="" />} status={modal_Image} width={700} close={(e) => modal_ImageStatus("")} /> : ""}
        </section>
    )
}

export default Profile;
