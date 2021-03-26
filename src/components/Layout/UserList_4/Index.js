import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import { NavLink } from 'react-router-dom';
import Modal from "../../../components/Items/modal"
import { favRemove, favAdd } from "../../../state/actions/favs"
import GiftsList from "../../../components/Layout/GiftList/GiftList"
import classnames from "classnames"
import {userId_S, userId_2_S} from "../../../Settings"
import {FormattedMessage, useIntl} from 'react-intl';
import PhotosIcon from "../../../assets/img/icons/photo.svg"
import PinIcon from "../../../assets/img/icons/pin.svg"
import SecurityIcon from "../../../assets/img/icons/security.svg"
import Fire2Icon from "../../../assets/img/icons/fire2.svg"
import Fire2WhiteIcon from "../../../assets/img/icons/fire2White.svg"
import GiftIcon from "../../../assets/img/icons/gift.svg"
import Gold from "../../../assets/img/icons/gold.svg"
import Bronze from "../../../assets/img/icons/bronze.svg"
import Silver from "../../../assets/img/icons/silver.svg"
const UserList = (props) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const [modal_2, modal_2Status] = useState("");
    const { favs, users } = useSelector(
        (state) => ({
            favs: state.favs.list ? state.favs.list : [],
            users: state.users ? state.users : []
        }), shallowEqual
    );
    return (
        <div className={styles.userList_4}>
            {props.data && props.data.map((data, index) => {
                if (!data || !users[data]){
                    return null
                }
                return (
                    <div className={styles.box} key={index}>
                        <div className={styles.content}>
                            {props.hideContent ?  
                            <div className={styles.bgContent}>
                                <div className={styles.bg} style={{ backgroundImage: "url(" + users[data].ab + ")" }}></div>
                                {/* <div className={styles.bg2} style={{ backgroundImage: "url(" + users[data].pBlur[1] + ")" }}></div> */}
                            </div> :
                            <NavLink className={styles.bgContent} to={{ pathname: "/users/" + userId_S(data) }}>
                                <div className={styles.bg} style={{ backgroundImage: "url(" + users[data].avatarLarge + ")" }}></div>
                                {/* <div className={styles.bg2} style={{ backgroundImage: "url(" + users[data].pBlur[1] + ")" }}></div> */}
                            </NavLink>
                            }
                            
                            {users[data].pl ? <div className={styles.photos}>
                                {/* <PhotosIcon fill="#fff" style={{width:14, height:14}} /> */}
                                <img src={PhotosIcon} style={{width:14, height:14, fill:"#fff"}} alt="" />
                                {users[data].pl}
                            </div> : ""}
                            <div className={classnames("intro-banner-vdo-play-btn", users[data].online ? "online" : "offline", styles.status)}>
                                <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
                                <span className={classnames("ripple", users[data].online ? "online" : "offline")}></span>
                                <span className={classnames("ripple", users[data].online ? "online" : "offline")}></span>
                                <span className={classnames("ripple", users[data].online ? "online" : "offline")}></span>
                            </div>
                            {props.hideContent ? "" :<div className={styles.bottom}>
                                <div className={styles.item}  tooltip={intl.formatMessage({id:"Profile.onaylandi"})}>
                                    {/* <SecurityIcon style={{width:14, height:14}} fill="#fff" />  */}
                                    <img src={SecurityIcon} style={{width:14, height:14}} alt="" />
                                </div>
                                <div className={styles.item} tooltip={intl.formatMessage({id:"Profile.hediyeGonder"})} onClick={(e)=>modal_2Status(data)}>
                                    {/* <GiftIcon style={{width:14, height:14}} fill="#fff" />  */}
                                    <img src={GiftIcon} style={{width:14, height:14}} alt="" />
                                </div> 
                                {favs.includes(userId_2_S(data)) ? <div className={styles.item} style={{backgroundColor:"#fe646f"}} tooltip={intl.formatMessage({id:"Profile.favoriCikar"})} onClick={(e) => dispatch(favRemove(userId_2_S(data)))} >
                                    {/* <Fire2Icon style={{width:14, height:14}} fill="#fff" /> */}
                                    <img src={Fire2WhiteIcon} style={{width:14, height:14}} alt="" />
                                </div> :
                                <div className={styles.item} tooltip={intl.formatMessage({id:"Profile.favoriEkle"})} onClick={(e) => dispatch(favAdd(userId_2_S(data)))}>
                                    {/* <Fire2Icon style={{width:14, height:14}} fill="#fe646f" /> */}
                                    <img src={Fire2Icon} style={{width:14, height:14}} alt="" />
                                </div>}
                            </div>}
                        </div>
                        {props.hideContent ? <div>
                            <div>
                                <h2 className={classnames(styles.nickname, styles.blur)}>
                                    <span><FormattedMessage id="Profile.sadeceVIP" /></span>
                                </h2>
                            </div>
                        </div> :
                        <div>
                            <NavLink to={{ pathname: "/users/" + userId_S(data) }}>
                                <h2 className={styles.nickname}>
                                    {users[data].badge ? users[data].badge === "Gold" ?  <img src={Gold} alt="" style={{marginRight:6, width:26, height:26}} /> : users[data].badge === "Bronze" ? <img src={Bronze} alt="" style={{marginRight:6, width:26, height:26}} /> : <img src={Silver} alt="" style={{marginRight:6, width:26, height:26}} /> : <span></span>} <span>{users[data].nickname}</span>, {users[data].age} 
                                </h2>
                            </NavLink>
                            <p>
                                {/* <PinIcon style={{width:14, height:14, marginRight:3}} fill="#888" />  */}
                                <img src={PinIcon} style={{width:14, height:14, marginRight:3}} alt="" />
                                {users[data].city ? users[data].city.charAt(0).toUpperCase() + users[data].city.slice(1) : ""}</p>
                        </div>}
                    </div>
                )
            })}
            
            {modal_2 ? <Modal title={<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{width:44, height:44, borderRadius:44, marginRight:10,flex:"none",backgroundImage:"url("+users[modal_2].avatar+")"}}></div>{users[modal_2].nickname} <FormattedMessage id="General.seninHediyeleriniBekliyor" /></div>} content={<GiftsList fakeId={modal_2} close={modal_2Status} />} status={modal_2} width={700} close={(e) => modal_2Status("")} type="buyGift" /> : ""}
        </div>)
}
export default UserList;
