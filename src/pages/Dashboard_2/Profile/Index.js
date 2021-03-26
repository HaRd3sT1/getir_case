
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteProfile, profilMessage } from "../../../state/actions/auth"
import styles from "./Profile.module.scss"
import { ButtonDanger, ButtonDark, ButtonGold, ButtonPrimary, ButtonBlue } from "../../../components/Items/buttons"
import classnames from "classnames"
import Modal from "../../../components/Items/modal"
import { profileUser} from "../../../state/actions/users"
import { buyImage, mainData } from "../../../state/actions/dashboard"
import { addFriend, removeFriend} from "../../../state/actions/friends"
import {addViews} from "../../../state/actions/views"
import { openMessageCheck, closeMessage, setMessageOpen } from "../../../state/actions/messages"
import { favRemove, favAdd } from "../../../state/actions/favs"
import {getRandomNumber} from "../../../Hooks"
import { onChange } from "../../../state/actions/form"
// import Draggable from 'react-draggable';
import GiftsList from "../../../components/Layout/GiftList/GiftList"
import UserList from "../../../components/Layout/UserList_3/Index"
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
import TirnakIcon from "../../../assets/img/icons/tirnak.svg"
import LeftIcon from "../../../assets/img/icons/left.svg"
import RightIcon from "../../../assets/img/icons/right.svg"
import Gold from "../../../assets/img/icons/gold.svg"
import Bronze from "../../../assets/img/icons/bronze.svg"
import Silver from "../../../assets/img/icons/silver.svg"
import Gift2Icon from "../../../assets/img/icons/gift2.svg"
import LockWhiteIcon from "../../../assets/img/icons/lockWhite.svg"
// import AddFriendIcon from "../../../assets/img/icons/addFriend.svg"
// import RemoveFriendIcon from "../../../assets/img/icons/removeFriend.svg"
// import {TirnakIcon,LeftIcon, RightIcon } from "../../../assets/img/Icons"
import Chat2Icon from "../../../assets/img/icons/chat2.svg"
import Fire2Icon from "../../../assets/img/icons/fire2.svg"
import Fire2WhiteIcon from "../../../assets/img/icons/fire2White.svg"
import {userId_2_S, defaultHobs, defaultRelation, defaultLanguages, defaultSport, defaultMusic, defaultFilm, defaultActivite, defaultBody, defaultEyeColor, defaultHairColor, defaultStyle, defaultExtra, defaultMeslek, defaultMezuniyet, defaultIliskiDurumu, defaultCocuklar, defaultFakeId} from "../../../Settings"
import {FormattedMessage} from 'react-intl';
const Profile = (props) => {
    const { id } = useParams();
    const { userData, users, coins, searchUsers, favs, friends, friendsWaiting } = useSelector(
        (state) => ({
            coins: state.generalDataReducer.coins,
            friends: state.friends.list ? state.friends.list : [],
            friendsWaiting: state.friends.waiting ? state.friends.waiting : [],
            users: state.users ? state.users : [],
            userData: state.auth.userData,
            favs: state.favs.list ? state.favs.list : [],
            searchUsers: state.dashboard.searchUsers ? state.dashboard.searchUsers : [],
        }), shallowEqual
    );

//     const { userData, users, coins, favs, messages, friends, friendsWaiting } = useSelector(
//         (state) => ({
//             coins: state.generalDataReducer.coins,
//             friends: state.friends.list ? state.friends.list : [],
//             friendsWaiting: state.friends.waiting ? state.friends.waiting : [],
//             users: state.users ? state.users : [],
//             messages: state.messages.list ? state.messages.list : [],
//             userData: state.auth.userData,
//             favs: state.favs.list ? state.favs.list : [],
//         }), shallowEqual
//     );
    const [modal_Image, modal_ImageStatus] = useState("");
    const [deleteProfileModal, deleteProfileStatus] = useState("");
    const [userProfile, userProfileStatus] = useState(false);
    const [sliding, setSliding] = useState(false);
    const [modal_1, modal_1Status] = useState("");
    const [modal_2, modal_2Status] = useState("");
    const hobsIncon = [Hobs_1, Hobs_2, Hobs_3, Hobs_4, Hobs_5, Hobs_6, Hobs_7, Hobs_8, Hobs_9, Hobs_10, Hobs_11, Hobs_12, Hobs_13, Hobs_14, Hobs_15, Hobs_16, Hobs_17, Hobs_18, Hobs_19, Hobs_20, Hobs_21, Hobs_22];
    const relationList = ["Feste Beziehung", "Abenteuer", "Affäre", "Flirt", "Freundschaft"]
    const [dragging, draggingStatus] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(mainData(5, true))
        dispatch(profileUser(id))
        if (userData.docId === id){
            userProfileStatus(true)
            if (userData.info){
                dispatch(onChange("info", userData.info))
            }
        }
        if (window.innerWidth < 991){
            dispatch(closeMessage())
        }
        dispatch(setMessageOpen(false))






        setTimeout(() => {
            const ele = document.getElementById('slider');
            if(ele){
                let pos = { top: 0, left: 0, x: 0, y: 0 };

                const mouseDownHandler = function(e) {
                    pos = {
                        left: ele.scrollLeft,
                        top: ele.scrollTop,
                        // Get the current mouse position
                        x: e.clientX,
                        y: e.clientY,
                    };

                    document.addEventListener('mousemove', mouseMoveHandler);
                    document.addEventListener('mouseup', mouseUpHandler);
                };

                const mouseMoveHandler = function(e) {
                    // How far the mouse has been moved
                    if(!dragging){
                        draggingStatus(true)
                    }
                    const dx = e.clientX - pos.x;
                    const dy = e.clientY - pos.y;

                    // Scroll the element
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

                // Attach the handler
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
        setTimeout(() => {
            setSliding(false)
        }, 300);
        // eslint-disable-next-line
    }, [sliding]);
    if (!users[id] ||  !coins){
        return null
    }
    let avatar = users[id].avatarUrl === "noavatar.jpg" ? "/noavatar.jpg" : users[id].avatarLarge
    // let relation = relationList[users[id].relation]
    // if (Array.isArray(users[id].relation)) {
    //     relation = users[id].relation.map((doc, index) => {
    //         if (users[id].relation.length === index + 1) {
    //             return relationList[doc]
    //         } else {
    //             return relationList[doc] + ", "
    //         }
    //     })
    // }
    const nextSlider = () =>{
        var slider = document.getElementById('slider');
        var screenPosition = slider.scrollLeft;
        document.getElementById('slider').scrollTo({
        left:  screenPosition + 125,
        behavior: 'smooth',
        });
    }
    const prevSlider = () =>{
        var slider = document.getElementById('slider');
        var screenPosition = slider.scrollLeft;
        if(screenPosition > 0){
            document.getElementById('slider').scrollTo({
            left:  screenPosition - 125,
            behavior: 'smooth',
            });
        }
    }
    // const { data, error, isLoading } = useAsync({ promiseFn: loadData, id: parseInt(id), watch: id });
    
    return (
        <section className={styles.profilePage}>
            <div className={styles.top}>
                <div className={classnames(styles.container, "container")}>
                    <div className={styles.left}>
                        <div className={styles.mainImage} onClick={(e) => modal_ImageStatus(avatar)} style={{ backgroundImage: "url(" + avatar + ")" }}>
                            
                        </div>
                        <p style={{ fontWeight: "300", fontSize: 17 }}>{users[id].photos && users[id].photos.length} Fotos</p>
                        {users[id].photos && users[id].photos.length ? <div className={styles.photosGeneral}>
                             {/* onClick={(e) => {setSlidePosition(slidePosition > 0 ? slidePosition-1 : 0); setSliding(true)}} */}
                            <div className={styles.leftArrow} onClick={(e) => prevSlider()}>
                                <img src={LeftIcon} style={{width:18, height:18}}  alt="" />
                            </div>
                             {/* onClick={(e) => {setSlidePosition(slidePosition+1); setSliding(true)}} */}
                            <div className={styles.rightArrow} onClick={(e) => nextSlider()}>
                                <img src={RightIcon} style={{width:18, height:18}}  alt="" />
                            </div>
                            <div className={styles.hidden}>
                                <div id="slider" className={styles.slider}>
                                {/* <Draggable
                                    axis="x"
                                    // allowAnyClick={true}
                                    handle=".handle"
                                    //  cancel=".not-draggable"
                                    position={slidePosition ?{x: slidePosition*-125, y: 0} : ""}
                                    bounds={{ right: 0 }}
                                    onDrag={(e) => draggingStatus(true)}
                                    onStop={(e) => setTimeout(() => { draggingStatus(false)}, 100)}
                                    // handle=".handle"
                                // axis="x"
                                // handle=".handle"
                                // defaultPosition={{ x: 0, y: 0 }}
                                // position={null}
                                // grid={[25, 25]}
                                // scale={1}
                                onStart={(e) => {
                                    setSlidePosition(0)
                                }}
                                // onDrag={this.handleDrag}
                                // onStop={(e) => {
                                //     console.log(e)
                                // }}
                                > */}
                                    <ul style={{minWidth:users[id].photos ? users[id].photos.length*128 : 0}} className={classnames(styles.photos, sliding ? styles.sliding : "", styles.sliderContent)}>
                                        {userProfile ?
                                            users[id].photos.map((post, index) => {
                                                return (<li key={index}><div className={styles.overlay} onClick={(e) => !dragging && modal_ImageStatus(post)}>
                                                </div><img src={post} alt="photos" />
                                                    {/* <i className={classnames(styles.trash, "fi flaticon-trash-1")} onClick={(e) => !dragging && dispatch(deletePhoto(index))}></i> */}
                                                </li>)
                                            })
                                            : ""}
                                        {!userProfile ? users[id].photos.map((post, index) => {
                                            if (friends.includes(id)) {
                                                return (<li key={index} onClick={(e) => !dragging && modal_ImageStatus(post)}><div className={styles.overlay}>
                                                </div><img style={{ maxHeight: "none" }} src={post} alt="photos" /></li>)
                                            } else {
                                                return (<li key={index}><div className={styles.buyBtn}><img style={{ maxHeight: "none" }} src={users[id].pBlur[index]} alt="photos" /><div className={styles.buyInfo}><img src={LockWhiteIcon} style={{width:32, height:32}} alt="" /><p><FormattedMessage id="Profile.sadeceArkadaslar" /></p></div></div></li>)
                                            }
                                            // if (index > 2) {
                                            //     let buy = false
                                            //     if (userData.buy) {
                                            //         userData.buy.forEach(doc => {
                                            //             if (doc === userId_2_S(id) + "_" + index) {
                                            //                 buy = true
                                            //             }
                                            //         })
                                            //     }
                                            //     if (buy) {
                                            //         return (<li key={index} onClick={(e) => !dragging && modal_ImageStatus(post)}><div className={styles.overlay}>
                                            //         </div><img style={{ maxHeight: "none" }} src={post} alt="photos" /></li>)
                                            //     } else {
                                            //         return (<li key={index}><div className={styles.buyBtn} onClick={(e) => { !dragging && modal_1Status(userId_2_S(id) + "_" + index) }}><p>Freischalten</p> <b style={{ opacity: "0.6" }}>({coins.profilePhotoCoin} Coin)</b></div><img style={{maxHeight:"none"}} src={users[id].pBlur[index]} alt="" /></li>)
                                            //     }
                                            // } else {
                                            //     //  onClick={(e) => !dragging && modal_ImageStatus(post)}
                                            //     return (<li key={index} onClick={(e) => !dragging && modal_ImageStatus(post)}><div className={classnames(styles.overlay, "")}>
                                            //     </div><img style={{ maxHeight: "none" }} src={post} alt="photos" /></li>)
                                            // }
                                        }) : ""}
                                        {/* {userProfile ? <li className={styles.imgContent}>
                                            <input className={styles.absolute} type="file" onChange={(e) => dispatch(photoUpdate2(e.target))} />
                                            <b className={styles.imgContentIcon}>+</b>
                                            <b> Foto hinzufügen </b>
                                        </li> : ""} */}
                                    </ul>

                                {/* </Draggable> */}
                                </div>
                            </div>
                        </div> : ""}
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles.h2}>
                            {users[id].badge ? users[id].badge === "Gold" ? <img src={Gold} alt="" style={{marginRight:6, width:30, height:30}} /> : users[id].badge === "Bronze" ? <img src={Bronze} alt="" style={{marginRight:6, width:30, height:30}} /> : <img src={Silver} alt="" style={{marginRight:6, width:30, height:30}} /> : <span></span>} {users[id].nickname}
                        </h2>
                        <div className={classnames(styles.p, styles.status, users[id].online ? styles.online : styles.offline)}>
                            {users[id].online ? "Online" : "Offline"}
                            <div className={classnames("intro-banner-vdo-play-btn", "ml-2", users[id].online ? "online" : "offline")}>
                                <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
                                <span className={classnames("ripple", users[id].online ? "online" : "offline")}></span>
                                <span className={classnames("ripple", users[id].online ? "online" : "offline")}></span>
                                <span className={classnames("ripple", users[id].online ? "online" : "offline")}></span>
                            </div>
                        </div>
                        <p className={styles.p}><b>{users[id].age}</b> Jahre, {users[id].gender === 0 ? "Männlich" : "Weiblich"} </p>
                        <p className={styles.p}>Kommt aus <b style={{ textTransform: "capitalize" }}>{users[id].city && users[id].city.charAt(0).toUpperCase() + users[id].city.slice(1)}</b></p>
                        {users[id].info ? <div className={styles.info}>
                            <div className={styles.icon}>
                                <img src={TirnakIcon} style={{width:15, height:15}} alt="" />
                            </div>
                            {users[id].info}
                        </div> : "" }
                        {!userProfile ? 
                        <div>
                            <ButtonDanger style={{textTransform:"none"}} classnamess={styles.messageButton} onClick={(e) => dispatch(openMessageCheck(userId_2_S(id)))} text="Nachricht Senden" />
                            {favs.includes(userId_2_S(id)) ? <ButtonDark classnamess={styles.buttons} style={{  flex: "none", marginBottom:0 }} onClick={(e) => dispatch(favRemove(userId_2_S(id)))} text="Favorit entfernen" /> :
                            <ButtonGold classnamess={styles.buttons} style={{  flex: "none", marginBottom:0 }} onClick={(e) => dispatch(favAdd(userId_2_S(id)))} text="Zu Favoriten hinzufügen" />}
                        </div> : ""} 
                        {friends.includes(userId_2_S(id)) ? <ButtonPrimary onClick={(e)=> dispatch(removeFriend(userId_2_S(id)))} 
                        text={<FormattedMessage id="General.arkadasCikar" />}  classnamess={styles.buttons} /> : friendsWaiting.includes(userId_2_S(id)) ? <ButtonDark  text={<FormattedMessage id="Profile.arkadaslikIstegiBekleniyor" />}  classnamess={styles.buttons} /> : <ButtonBlue onClick={(e)=> dispatch(addFriend(userId_2_S(id)))} text={<FormattedMessage id="General.arkadasEkle" />}  classnamess={styles.buttons} />}

                        {/* <h4><FormattedMessage id="Profile.hediyeler" /> </h4> */}
                        <div className={styles.hediye} onClick={(e)=>userData.docId !== id ? modal_2Status(true) : ""}>
                            <img src={Gift2Icon} style={{width:60, height:60}} alt="" />
                            <p><span>{users[id].nickname}</span> <FormattedMessage id="Profile.hediyeYazi" /> </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsMobil}>
                <button   onClick={(e) => userData.docId !== id ? dispatch(openMessageCheck(userId_2_S(id))) : ""}>
                    <img src={Chat2Icon} style={{width:30, height:30}} alt="" />
                </button>
                
                {favs.includes(userId_2_S(id)) ? <button style={{backgroundColor:"#fe646f"}} onClick={(e) => userData.docId !== id ? dispatch(favRemove(userId_2_S(id))) : ""} >
                    <img src={Fire2WhiteIcon} style={{width:30, height:30}} alt="" />
                </button> :
                <button  onClick={(e) => userData.docId !== id ? dispatch(favAdd(userId_2_S(id))) : ""} >
                    <img src={Fire2Icon} style={{width:30, height:30}} alt="" />
                </button>}
                
            </div>
            <div className={styles.content}>
                <div className={classnames("container")}>
                    <div className={styles.row}>
                        <div>
                            <h4>Steckbrief</h4>
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
                        </div>
                    </div>
                </div>
                <div className={classnames("container", "mt-4")}>
                    <div>
                        <div className={styles.list_2}>
                            <h4>Hobbies</h4>

                            {users[id].hobs ? users[id].hobs.map((doc, index) => {
                                if (!defaultHobs[doc]) { return null }
                                return (
                                    <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                        <img style={{ height: 18, marginRight: 10 }} src={hobsIncon[doc]} alt="" />
                                        {defaultHobs[doc]}
                                    </div>
                                )
                            }) : "-"}
                            {/* {users[id].hobs && users[id].hobs.map((doc, index) => {
                                if (!hobs[doc]) { return null }
                                return (
                                    <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                        <img style={{ height: 18, marginRight: 10 }} src={hobsIncon[doc]} alt="" />
                                        {hobs[doc]}
                                    </div>
                                )
                            })} */}
                        </div>
                    </div>
                    <div>
                        <div className={styles.list_2}>
                            <h4><FormattedMessage id="Profile.filmler" /></h4>
                            {users[id].character && users[id].character.filme ? users[id].character.filme.map((doc, index) =>{
                                return(
                                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                    {defaultFilm[doc]}
                                </div>
                                )
                            }) : "-"}
                        </div>
                    </div>
                    <div>
                        <div className={styles.list_2}>
                            <h4><FormattedMessage id="Profile.muzikler" /></h4>
                            {users[id].character && users[id].character.musik ? users[id].character.musik.map((doc, index) =>{
                                return(
                                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                    {defaultMusic[doc]}
                                </div>
                                )
                            }) : "-"}
                        </div>
                    </div>
                    <div>
                        <div className={styles.list_2}>
                            <h4><FormattedMessage id="Profile.spor" /></h4>
                            {users[id].character && users[id].character.sport ? users[id].character.sport.map((doc, index) =>{
                                return(
                                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                    {defaultSport[doc]}
                                </div>
                                )
                            }) : "-"}
                        </div>
                    </div>
                    <div>
                        <div className={styles.list_2}>
                            <h4><FormattedMessage id="Profile.diller" /></h4>

                            {users[id].character && users[id].character.sprachen  ? users[id].character.sprachen.map((doc, index) =>{
                                return(
                                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                    {defaultLanguages[doc]}
                                </div>
                                )
                            }) : "-"}
                            {/* {users[id].character && users[id].character.sprachen && users[id].character.sprachen.map((doc, index) =>{
                                return(
                                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                    {doc}
                                </div>
                                )
                            })} */}
                        </div>
                    </div>
                    <div>
                        <div className={styles.list_2}>
                            <h4><FormattedMessage id="Profile.eglence" /></h4>
                            {users[id].character && users[id].character.unterhaltung ? users[id].character.unterhaltung.map((doc, index) =>{
                                return(
                                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12, color: "#666" }}>
                                    {defaultActivite[doc]}
                                </div>
                                )
                            }) : "-"}
                        </div>
                    </div>
                </div>
                {!userProfile ? <div className={classnames("container", "mt-5")}>
                    <h4>Weitere interessante Leute</h4>
                    <UserList data={searchUsers} />
                </div> : ""}
            </div>
            
             {modal_2 ? <Modal title={<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{width:44, height:44, borderRadius:44, marginRight:10,flex:"none",backgroundImage:"url("+users[id].avatar+")"}}></div>{users[id].nickname} <FormattedMessage id="General.seninHediyeleriniBekliyor" /></div>} content={<GiftsList fakeId={id} close={modal_2Status} />} status={modal_2} width={700} close={(e) => modal_2Status("")} type="buyGift" /> : ""}


             {deleteProfileModal ? <Modal title={<FormattedMessage id="General.bilgi" /> } content={<FormattedMessage id="Profile.profilSilUyari" /> } buttons={<div><ButtonDark onClick={(e) => deleteProfileStatus("")} style={{ flex: 1, borderRadius:10, height:50 }} text={<FormattedMessage id="General.hayir" />} /><ButtonDanger onClick={(e) => { deleteProfileStatus(""); dispatch(deleteProfile()) }} style={{ flex: 1, borderRadius:10, height:50 }} text={<FormattedMessage id="General.evet" />} /></div>} status={deleteProfileModal} width={500} close={(e) => deleteProfileStatus("")} /> : ""}

             {modal_1 ?<Modal title={<FormattedMessage id="General.bilgi" /> } content={<FormattedMessage id="Profile.kilitAcUyari" />} buttons={<div><ButtonDark onClick={(e) => modal_1Status("")} style={{ flex: 1, borderRadius:10, height:50 }} text={<FormattedMessage id="General.hayir" />} /><ButtonDanger onClick={(e) => { modal_1Status(""); dispatch(buyImage(modal_1)) }} style={{ flex: 1, borderRadius:10, height:50 }} text={coins.profilePhotoCoin+" Coin)"} /></div>} status={modal_1} width={500} close={(e) => modal_1Status("")} /> : ""}
             {modal_Image ? <Modal title="Photo" content={<img style={{pointerEvents: 'none'}} src={modal_Image} alt="" />} status={modal_Image} width={700} close={(e) => modal_ImageStatus("")} /> : ""}
        </section>
    )
}

export default Profile;
