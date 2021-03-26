import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import { NavLink } from 'react-router-dom';
import Modal from "../../../components/Items/modal"
// import { mainData} from "../../../state/actions/dashboard"
import { mobileListData} from "../../../state/actions/dashboard"
import {favAdd } from "../../../state/actions/favs"
import GiftsList from "../../../components/Layout/GiftList/GiftList"
import classnames from "classnames"
import {userId_S, userId_2_S} from "../../../Settings"
import {FormattedMessage} from 'react-intl';

import PhotosIcon from "../../../assets/img/icons/photo.svg"
import PinIcon from "../../../assets/img/icons/pin.svg"
import SecurityIcon from "../../../assets/img/icons/security.svg"
import GiftIcon from "../../../assets/img/icons/gift.svg"
import CloseIcon from "../../../assets/img/icons/close.svg"
import HeartIcon from "../../../assets/img/icons/heart.svg"
import Gold from "../../../assets/img/icons/gold.svg"
import Bronze from "../../../assets/img/icons/bronze.svg"
import Silver from "../../../assets/img/icons/silver.svg"


let xDown = null;                                                        
let slider = 0;                                                             

const UserList = (props) => {
    const dispatch = useDispatch();
    const [modal_2, modal_2Status] = useState("");
    const [translateX, translateXSet] = useState(0);
    const [rotate, rotateSet] = useState(0);
    const [sliderDelay, sliderDelaySet] = useState(0);
    const [sliderOpacity, sliderOpacitySet] = useState(1);
    const { favs, users } = useSelector(
        (state) => ({
            favs: state.favs.list ? state.favs.list : [],
            users: state.users ? state.users : []
        }), shallowEqual
    );



    const getTouches = (evt) => {
    return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }                                                     

    const handleTouchStart = (evt) => {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
    };                                                

    const handleTouchMove = (evt) => {
        if ( ! xDown) {
            return;
        }
        let xUp = evt.touches[0].clientX;                                    
        let xDiff = xDown - xUp;
        if(slider + 3 < xDiff){
            slider = xDiff
            translateXSet(xDiff * -1)
            rotateSet((xDiff/10) * -1)
        }else if(slider - 3 > xDiff){
            slider = xDiff
            translateXSet(xDiff * -1)
            rotateSet((xDiff/10) * -1)
        }                     
    };
    const handleTouchEnd = (e) =>{
        if(Math.abs(slider) > 100){
            if(slider > 0){
                Nope()
            }else{
                Like()
            }
        }else{
            xDown = null;
            sliderDelaySet(.5);
            slider = 0;
            translateXSet(0)
            rotateSet(0)
            setTimeout(() => {
                sliderDelaySet(0);
            }, 500);
        }


    }
    const Nope = (e) => {
        xDown = null;
        sliderDelaySet(.5);
        sliderOpacitySet(0)
        translateXSet(-400)
        rotateSet(-40)
        setTimeout(() => {
            dispatch(mobileListData())
            translateXSet(0)
            rotateSet(0)
            sliderDelaySet(0);
            setTimeout(() => {
                sliderDelaySet(.5);
            }, 100)
            setTimeout(() => {
                sliderOpacitySet(1)
                sliderDelaySet(0);
            }, 200);
        }, 500);
        slider = 0;
    }
    const Like = (e) => {
        dispatch(favAdd(userId_2_S(props.data[0])))
        xDown = null;
        sliderDelaySet(.5);
        sliderOpacitySet(0)
        translateXSet(400)
        rotateSet(40)
        setTimeout(() => {
            dispatch(mobileListData())
            translateXSet(0)
            rotateSet(0)
            sliderDelaySet(0);
            setTimeout(() => {
                sliderDelaySet(.5);
            }, 100)
            setTimeout(() => {
                sliderOpacitySet(1)
                sliderDelaySet(0);
            }, 200);
        }, 500);
    }
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        if(document.getElementById("slider")){
            document.getElementById("slider").addEventListener('touchstart', handleTouchStart, false);        
            document.getElementById("slider").addEventListener('touchmove', handleTouchMove, false);
            document.getElementById("slider").addEventListener('touchend', handleTouchEnd, false);
        }
    // eslint-disable-next-line
    }, []);
    return (
        <div className={styles.userListMobile_1}>
            {props.data[0] ? 
            <div className={styles.nope} onClick={(e) => Nope()}>
                {/* <CloseIcon style={{width:30, height:30}} fill="#c4c4c4" /> */}
                <img src={CloseIcon} style={{width:30, height:30}} alt="" />
            </div> : ""}
            {props.data[0] && !favs.includes(userId_2_S(props.data[0])) ? 
            <div className={styles.like} onClick={(e) => Like()}>
                {/* <HeartIcon style={{width:36, height:36}} fill="#ef5464" /> */}
                <img src={HeartIcon} style={{width:36, height:36}} alt="" />
            </div> : ""}

            {props.data && users[props.data[0]] ?
                    <div id="slider" style={{transform:"translateX("+translateX+"px) rotate("+rotate+"deg)", transition:sliderDelay+"s all", opacity:sliderOpacity}} className={styles.box}>
                        <div className={styles.content}>
                            <NavLink className={styles.bgContent} to={{ pathname: "/users/" + userId_S(props.data[0]) }}>
                                <div className={styles.bg} style={{ backgroundImage: "url(" + users[props.data[0]].avatarLarge + ")" }}></div>
                            </NavLink>
                            {users[props.data[0]].pl &&<div className={styles.photos}>
                                <img src={PhotosIcon} style={{width:14, height:14}} alt="" />
                                {/* <PhotosIcon fill="#fff" style={{width:14, height:14}} /> */}
                                {users[props.data[0]].pl}
                            </div>}
                            <div className={styles.bottom}>
                                <NavLink to={{ pathname: "/users/" + userId_S(props.data[0]) }}>
                                    <h2 className={styles.nickname}>
                                        {users[props.data[0]].badge ? users[props.data[0]].badge === "Gold" ? <img src={Gold} alt="" style={{marginRight:6, width:26, height:26}} /> : users[props.data[0]].badge === "Bronze" ? <img src={Bronze} alt="" style={{marginRight:6, width:26, height:26}} /> : <img src={Silver} alt="" style={{marginRight:6, width:26, height:26}} /> : <span></span>} <span>{users[props.data[0]].nickname}</span>, {users[props.data[0]].age} 
                                        
                                        <div style={{marginLeft:8, marginRight:6}} className={classnames("intro-banner-vdo-play-btn", users[props.data[0]].online ? "online" : "offline", styles.status)}>
                                            <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
                                            <span className={classnames("ripple", users[props.data[0]].online ? "online" : "offline")}></span>
                                            <span className={classnames("ripple", users[props.data[0]].online ? "online" : "offline")}></span>
                                            <span className={classnames("ripple", users[props.data[0]].online ? "online" : "offline")}></span>
                                        </div>
                                    </h2>
                                    <p>
                                        {/* <PinIcon style={{width:14, height:14, marginRight:3}} fill="#888" />  */}

                                        <img src={PinIcon} style={{width:14, height:14, marginRight:3}} alt="" />
                                        {users[props.data[0]].city && users[props.data[0]].city.charAt(0).toUpperCase() + users[props.data[0]].city.slice(1)}</p>
                                </NavLink>
                                <div className={styles.icons}>
                                    <div className={styles.item}  tooltip={<FormattedMessage id="Profil.onaylandi" />}>
                                        {/* <SecurityIcon style={{width:14, height:14}} fill="#fff" />  */}
                                        <img src={SecurityIcon} style={{width:14, height:14}} alt="" />
                                    </div>
                                    <div className={styles.item} tooltip={<FormattedMessage id="Profil.hediyeGonder" />} onClick={(e)=>modal_2Status(props.data[0])}>
                                        {/* <GiftIcon style={{width:14, height:14}} fill="#fff" />  */}

                                        <img src={GiftIcon} style={{width:14, height:14}} alt="" />
                                    </div>
                                    {/* {favs.includes(userId_2_S(props.data[0])) ? <div className={styles.item} style={{backgroundColor:"#fe646f"}} tooltip={<FormattedMessage id="Profil.favoriCikar" />} onClick={(e) => dispatch(favRemove(userId_2_S(props.data[0])))} >
                                        <Fire2Icon style={{width:14, height:14}} fill="#fff" />
                                    </div> :
                                    <div className={styles.item} tooltip={<FormattedMessage id="Profil.favoriEkle" />} onClick={(e) => dispatch(favAdd(userId_2_S(props.data[0])))}>
                                        <Fire2Icon style={{width:14, height:14}} fill="#fe646f" />
                                    </div>} */}
                                </div>
                            </div>
                            
                        </div>
                    </div> : ""
            }
            
            {modal_2 ? <Modal title={<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{width:44, height:44, borderRadius:44, marginRight:10,flex:"none",backgroundImage:"url("+users[modal_2].avatar+")"}}></div>{users[modal_2].nickname}  <FormattedMessage id="General.seninHediyeleriniBekliyor" /></div>} content={<GiftsList fakeId={modal_2} close={modal_2Status} />} status={modal_2} width={700} close={(e) => modal_2Status("")} type="buyGift" /> : ""}
        </div>)
}
export default UserList;
