import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import { NavLink } from 'react-router-dom';
import Gold from "../../../assets/img/icons/gold.svg"
import Bronze from "../../../assets/img/icons/bronze.svg"
import Silver from "../../../assets/img/icons/silver.svg"
import classnames from "classnames"
import {userId_S} from "../../../Settings"

const UserList = (props) => {
    // const dispatch = useDispatch();
    const { favs, users } = useSelector(
        (state) => ({
            favs: state.favs.list ? state.favs.list : [],
            users: state.users ? state.users : []
        }), shallowEqual
    );
    return (
        <div className={styles.boxs}>
            {props.data && props.data.map((data, index) => {
                if (!data || !users[data]){
                    return(
                        <div className={classnames(styles.box, styles.loading)} key={index}></div>
                    )
                }
                if (props.hidden && !favs.includes(data.id)){
                    return null
                }
                return (
                    <div className={styles.box} key={index}>
                        <NavLink className={styles.content} to={{ pathname: "/users/" + userId_S(data) }}>
                            <div className={styles.bg} style={{ backgroundImage: "url(" + users[data].avatarLarge + ")" }}>
                            </div>
                            <div className={styles.badge}>
                                {users[data].badge ? users[data].badge === "Gold" ? <img src={Gold} style={{ marginRight: 6, width:26, height:26 }}  alt="" /> : users[data].badge === "Bronze" ? <img src={Bronze} style={{ marginRight: 6, width:26, height:26 }}  alt="" /> : <img src={Silver} style={{ marginRight: 6, width:26, height:26 }}  alt="" /> : <span></span>}
                            </div>
                            {/* <div className={styles.sliderOverlay}>
                                <NavLink className={styles.button2} to={{ pathname: "/users/" + userId_S(data) }}>
                                    Ansehen
                                </NavLink>
                            </div> */}
                            <div className={styles.bottom}>
                                <h2 className={styles.nickname}>

                                    <div className={classnames("intro-banner-vdo-play-btn", "mr-2", users[data].online ? "online" : "offline")}>
                                        <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
                                        <span className={classnames("ripple", users[data].online ? "online" : "offline")}></span>
                                        <span className={classnames("ripple", users[data].online ? "online" : "offline")}></span>
                                        <span className={classnames("ripple", users[data].online ? "online" : "offline")}></span>
                                    </div>
                                    {/* <div className={classnames(styles.status, users[data].online ? styles.online : styles.offline)}></div>  */}
                                    {users[data].nickname}, {users[data].age}
                                </h2>
                                <p>
                                    {/* <span>{users[data].gender === 0 ? "Männlich" : "Weiblich"}</span> */}
                                    <span>{users[data].city}</span>    
                                </p>
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>)
}
export default UserList;
