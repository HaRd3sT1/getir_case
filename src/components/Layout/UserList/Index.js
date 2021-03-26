import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import { NavLink } from 'react-router-dom';
import Gold from "../../../assets/img/gold.js";
import Bronze from "../../../assets/img/bronze.js";
import Silver from "../../../assets/img/silver.js";
import { favRemove, favAdd } from "../../../state/actions/favs"
import { openMessageCheck } from "../../../state/actions/messages"
import { ButtonMessage } from "../../../components/Items/buttons"
import classnames from "classnames"
import {userId_S} from "../../../Settings"

const UserList = (props) => {
    const dispatch = useDispatch();
    const { favs } = useSelector(
        (state) => ({
            favs: state.favs.list ? state.favs.list : []
        }), shallowEqual
    );
    return (
        <div className={styles.boxs}>
            {props.data && props.data.map((data, index) => {
                if (!data || !data.id){
                    return null
                }
                if (props.hidden && !favs.includes(data.id)){
                    return null
                }
                return (
                    <div className={styles.box} key={index}>
                        {favs.includes(data.id) ? <i onClick={(e) => dispatch(favRemove(data.id))} className={classnames(styles.active, "fi flaticon-favourites-filled-star-symbol")}></i> :
                            <i onClick={(e) => dispatch(favAdd(data.id))} className={classnames("fi flaticon-star-of-favorites-outline")}></i>}
                        <NavLink className={styles.content} to={{ pathname: "/users/" + userId_S(data.id) }}>
                            <div className={styles.bg} style={{ backgroundImage: "url(" + data.avatarLarge + ")" }}>

                            </div>
                            <div className={styles.badge}>
                                {data.badge ? data.badge === "Gold" ? <Gold width="32" height="32" style={{ marginRight: 6 }} /> : data.badge === "Bronze" ? <Bronze style={{ marginRight: 6 }} width="32" height="32" /> : <Silver style={{ marginRight: 6 }} width="32" height="32" /> : <span></span>}
                            </div>
                            {/* <div className={styles.sliderOverlay}>
                                <NavLink className={styles.button2} to={{ pathname: "/users/" + userId_S(data.id) }}>
                                    Ansehen
                                </NavLink>
                            </div> */}
                            <div className={styles.bottom}>
                                <h2 className={styles.nickname}>
                                     {data.nickname}, {data.age}
                                </h2>
                                <p>
                                    <span>{data.gender === 0 ? "Männlich" : "Weiblich"}</span>
                                    <span>{data.city}</span>    
                                </p>
                            </div>
                        </NavLink>
                        <ButtonMessage userid={data.id} text="Nachricht Senden" onClick={(e) => dispatch(openMessageCheck(data.id))} />
                        {/* <div>
                            <NavLink to={{ pathname: "/users/" + userId_S(data.id) }}>
                                <h2 className={styles.nickname}>
                                    {data.badge ? data.badge === "Gold" ? <Gold width="26" height="26" style={{ marginRight: 6 }} /> : data.badge === "Bronze" ? <Bronze style={{ marginRight: 6 }} width="26" height="26" /> : <Silver style={{ marginRight: 6 }} width="26" height="26" /> : <span></span>} {data.nickname}
                                </h2>
                            </NavLink>
                            <p>{data.age} Jahre / {data.gender === 0 ? "Männlich" : "Weiblich"}</p>
                            <p>
                                <i className={classnames(styles.pin, "fi flaticon-maps-and-flags")}></i>
                                
                            </p>
                            <ButtonMessage userid={data.id} text="Nachricht Senden" onClick={(e) => dispatch(openMessageCheck(data.id))} />
                        </div> */}
                    </div>
                )
            })}
        </div>)
}
export default UserList;
