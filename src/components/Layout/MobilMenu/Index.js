import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { logout } from '../../../state/actions/auth'
import classNames from 'classnames';
import styles from './Style.module.scss';
// import {defaultColors} from "../../../Settings"
import {  NavLink, useLocation } from "react-router-dom";
import {setMessageOpen } from "../../../state/actions/messages"
// import path from "../../../pages/Router/paths"
import WorldIcon from "../../../assets/img/icons/world.svg"
import WorldRedIcon from "../../../assets/img/icons/worldRed.svg"
import SearchThinIcon from "../../../assets/img/icons/searchThin.svg"
import SearchThinRedIcon from "../../../assets/img/icons/searchThinRed.svg"
import MatchIcon from "../../../assets/img/icons/match.svg"
import MatchRedIcon from "../../../assets/img/icons/matchRed.svg"
import MessageIcon from "../../../assets/img/icons/message.svg"
import HeartStrokeIcon from "../../../assets/img/icons/heartStroke.svg"
import HeartStrokeRedIcon from "../../../assets/img/icons/heartStrokeRed.svg"
import Diamond2Icon from "../../../assets/img/icons/diamond2.svg"
import Diamond2RedIcon from "../../../assets/img/icons/diamond2Red.svg"

const MobilMenu = () => {
    const dispatch = useDispatch();
    // const [dropdown, setDropdown] = useState(false);
    let location = useLocation();
    const { newMessages } = useSelector(
        (state) => ({

            newMessages: state.messagesList.totalNewMessages

        }), shallowEqual
    );
    useEffect(() => {
    }, []);
    return (
        <div className={classNames(styles.MobilMenu)}>
                <NavLink className={styles.a} activeClassName={styles.active} to="/discovery">
                    {location.pathname === "/discovery" ? <img src={WorldRedIcon} alt="" style={{width:30, height:30}}  /> : <img src={WorldIcon} alt="" style={{width:30, height:30}}  />}
                    
                    {/* <WorldIcon style={{width:30, height:30}} fill={location.pathname === "/discovery" ? defaultColors.primary : "#222"} /> */}
                </NavLink>
                <NavLink className={styles.a} activeClassName={styles.active} to="/search">
                    {location.pathname === "/search" ? <img src={SearchThinRedIcon} alt="" style={{width:30, height:30}}  /> : <img src={SearchThinIcon} alt="" style={{width:30, height:30}}  />}
                    {/* <img src={SearchThinIcon} alt="" style={{width:30, height:30}} fill={location.pathname === "/search" ? defaultColors.primary : "#222"}  /> */}
                    {/* <SearchThinIcon style={{width:30, height:30}} fill={location.pathname === "/search" ? defaultColors.primary : "#222"} /> */}
                </NavLink>
                <NavLink className={styles.a} activeClassName={styles.active} to="/dashboard">
                    {location.pathname === "/dashboard" ? <img src={MatchRedIcon} alt="" style={{width:30, height:30}}  /> : <img src={MatchIcon} alt="" style={{width:30, height:30}}  />}
                    {/* <img src={MatchIcon} alt="" style={{width:30, height:30}} fill={location.pathname === "/dashboard" ? defaultColors.primary : "#222"}  /> */}
                    {/* <MatchIcon style={{width:30, height:30}} fill={location.pathname === "/dashboard" ? defaultColors.primary : "#222"} /> */}
                </NavLink>
                <NavLink className={styles.a} activeClassName={styles.active} to="/premium?type=vip">
                    {location.pathname === "/premium?type=vip" ? <img src={Diamond2RedIcon} alt="" style={{width:30, height:30}}  /> : <img src={Diamond2Icon} alt="" style={{width:30, height:30}}  />}
                    {/* <img src={Diamond2Icon} alt="" style={{width:30, height:30}} fill={location.pathname === "/premium?type=vip" ? defaultColors.primary : "#222"}  /> */}
                    {/* <Diamond2Icon style={{width:30, height:30}} fill={location.pathname === "/premium?type=vip" ? defaultColors.primary : "#222"} /> */}
                </NavLink>
                <NavLink className={styles.a} activeClassName={styles.active} to="/favs">
                    {location.pathname === "/favs" ? <img src={HeartStrokeRedIcon} alt="" style={{width:30, height:30}}  /> : <img src={HeartStrokeIcon} alt="" style={{width:30, height:30}}  />}
                    {/* <img src={HeartStrokeIcon} alt="" style={{width:30, height:30}} fill={location.pathname === "/favs" ? defaultColors.primary : "#222"}  /> */}
                    {/* <HeartStrokeIcon style={{width:30, height:30}} fill={location.pathname === "/favs" ? defaultColors.primary : "#222"} /> */}
                </NavLink>
                <div className={styles.a} onClick={(e) => {dispatch(setMessageOpen(true))}} >
                    
                    {newMessages ?<div id="newMessage" className={styles.newMessage}>{newMessages}</div> : ""}
                    <img src={MessageIcon} alt="" style={{width:30, height:30}}  />
                    {/* <MessageIcon style={{width:30, height:30}} fill={"#222"} /> */}
                </div>
                {/*  */}
                        
        </div>)
}
export default MobilMenu;
