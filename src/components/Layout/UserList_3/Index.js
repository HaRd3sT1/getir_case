import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import { NavLink } from 'react-router-dom';
import Gold from "../../../assets/img/icons/gold.svg"
import Bronze from "../../../assets/img/icons/bronze.svg"
import Silver from "../../../assets/img/icons/silver.svg"
import { openMessageCheck } from "../../../state/actions/messages"
import { ButtonDanger } from "../../../components/Items/buttons"
import classnames from "classnames"
import {userId_S} from "../../../Settings"
import PhotosIcon from "../../../assets/img/icons/photo.svg"
import {FormattedMessage} from 'react-intl';
const UserList = (props) => {
    const dispatch = useDispatch();
    const { favs, users } = useSelector(
        (state) => ({
            favs: state.favs.list ? state.favs.list : [],
            users: state.users ? state.users : []
        }), shallowEqual
    );
    return (
        <div className={styles.userList_3}>
            {props.data && props.data.map((data, index) => {
                if (!data || !users[data]){
                    return null
                }
                // if (props.hidden){
                //     return null
                // }
                return (
                    <div className={styles.box} key={index}>
                        {props.hideContent ?  <a className={styles.content}>
                            
                            <div className={styles.bg} style={{ backgroundImage: "url(" + users[data].ab + ")" }}>

                            </div>
                        </a> : <NavLink className={styles.content} to={{ pathname: "/users/" + userId_S(data) }}>
                            <div className={styles.bg} style={{ backgroundImage: "url(" + users[data].avatarLarge + ")" }}> </div>
                            {users[data].pl &&<div className={styles.bottom}>
                                <img src={PhotosIcon} style={{width:14, height:14}} alt="" />
                                {/* <PhotosIcon fill="#fff" style={{width:14, height:14}} /> */}
                                {users[data].pl}
                            </div>}
                        </NavLink>}
                        {/* <ButtonMessage userid={users[data]} text="Nachricht Senden" onClick={(e) => dispatch(openMessageCheck(users[data]))} /> */}
                        <div>
                            {props.hideContent ? <a>
                                <h2 className={classnames(styles.nickname, styles.blur)}>
                                    <span><FormattedMessage id="Profile.sadeceVIP" /></span>
                                </h2>
                            </a> :
                            <NavLink to={{ pathname: "/users/" + userId_S(data) }}>
                                <h2 className={styles.nickname}>
                                    {users[data].badge ? users[data].badge === "Gold" ? <img src={Gold} style={{ marginRight: 6, width:26, height:26 }}  alt="" /> : users[data].badge === "Bronze" ? <img src={Bronze} style={{ marginRight: 6, width:26, height:26 }}  alt="" /> : <img src={Silver} style={{ marginRight: 6, width:26, height:26 }}  alt="" /> : <span></span>} <span>{users[data].nickname}</span>, {users[data].age}     
                                    <div className={classnames("intro-banner-vdo-play-btn", "ml-2", users[data].online ? "online" : "offline")}>
                                        <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
                                        <span className={classnames("ripple", users[data].online ? "online" : "offline")}></span>
                                        <span className={classnames("ripple", users[data].online ? "online" : "offline")}></span>
                                        <span className={classnames("ripple", users[data].online ? "online" : "offline")}></span>
                                    </div>
                                    {/* <div style={{width:14, height:14, opacity:.7, marginLeft:5, backgroundColor: users[data].online ? "#2ecc71": "#c0392b", borderRadius:20}}></div> */}
                                </h2>
                            </NavLink>}
                            {/* <p>{users[data].gender === 0 ? "Männlich" : "Weiblich"}</p> */}
                            {props.hideContent ? "" :<p>{users[data].city && users[data].city.charAt(0).toUpperCase() + users[data].city.slice(1)}</p>}
                            {props.hideContent ? "" :<ButtonDanger userid={users[data]} text="Nachricht" style={{fontSize:15, borderRadius:5, padding:3, textTransform:"inherit", height:32, width:90}} onClick={(e) => dispatch(openMessageCheck(data))} />}
                        </div>
                    </div>
                )
            })}
        </div>)
}
export default UserList;
