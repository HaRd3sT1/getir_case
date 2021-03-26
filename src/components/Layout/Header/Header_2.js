import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { logout } from '../../../state/actions/auth'
import classNames from 'classnames';
import Modals from '../Modals/Index';
import ModalMessage from '../Modals/Messages';
import styles from './Header_2.module.scss';
import Gold from "../../../assets/img/icons/gold.svg"
import Bronze from "../../../assets/img/icons/bronze.svg"
import Silver from "../../../assets/img/icons/silver.svg"
import Home from "../../../assets/img/icons/home.svg";
import Chat from "../../../assets/img/icons/chat.svg";
import Star from "../../../assets/img/icons/fire.svg";
import { setMessageOpen } from "../../../state/actions/messages"
import path from "../../../Router/paths"
import {defaultLogo} from "../../../Settings"
import {  NavLink, useLocation } from "react-router-dom";
import CoinsIcon from "../../../assets/img/icons/coins.svg"
import SearchIcon from "../../../assets/img/icons/search2.svg"
import Down2Icon from "../../../assets/img/icons/down2.svg"
import LookIcon from "../../../assets/img/icons/look.svg"
import FriendsIcon from "../../../assets/img/icons/friends.svg"
import {FormattedMessage} from 'react-intl';

const Header_2 = (props) => {
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const [hideMenu, setHideMenu] = useState(false);
    let location = useLocation();
   
    const { auth, newMessages, form } = useSelector(
        (state) => ({
            auth: state.auth,
            form: state.form,
            newMessages: state.messagesList.totalNewMessages
        }), shallowEqual
    );
    useEffect(() => {
        setDropdown(false)
        // eslint-disable-next-line
    }, [location]);
    useEffect(() => {
        const windowScroll = (event) => {
            if(window.scrollY > 20 && !hideMenu){
                setHideMenu(true)
            }else if(window.scrollY < 20 && hideMenu){
                setHideMenu(false)
            }
        }

        window.addEventListener('scroll', windowScroll);

        // cleanup this component
        return () => {
        window.removeEventListener('scroll', windowScroll);
        };
        // eslint-disable-next-line
    }, [hideMenu]);
    let ifHome = location.pathname === "/dashboard" || location.pathname === "/step3" || location.pathname === "/online-users" || location.pathname === "/last-users"
    if(!auth.userData.meta){
        return null
    }
    return (<div id="dashboard_header">
        <div className={classNames(styles.headerBar, hideMenu ? styles.hideMenu : "")}>
            <div className={ classNames(styles.container)}>
                <div className={classNames(styles.left)}>
                    <div className={classNames(styles.headerLogo, "d-flex")}>
                        <NavLink to="/dashboard" className={styles.logo} >
                            {defaultLogo}
                        </NavLink>
                    </div>
                    <div className={classNames(styles.menu, "d-flex")}>
                        <ul className={styles.main}>
                            <li>
                                <NavLink className={styles.a} activeClassName={styles.active} to="/dashboard" exact>
                                    <img src={Home} style={{width:18, height:18}} />
                                    <span>Startseite</span>
                                </NavLink>
                            </li>
                            <li className={styles.hover2}>
                                <NavLink className={styles.a} activeClassName={styles.active} to="/search">
                                    <img src={SearchIcon} style={{width:18, height:18}} alt="" />
                                    {/* <SearchIcon width="18px" height="18px" fill="#737373" /> */}
                                    <span>Suchen</span>
                                </NavLink>
                            </li>
                            <li>
                                <div onClick={(e) => {dispatch(setMessageOpen(true))}} className={styles.a}>
                                    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <img src={Chat} style={{width:18, height:18}} />
                                    </div>
                                    {newMessages ?<div id="newMessage" className={styles.newMessage}>{newMessages}</div> : ""}

                                    <span>Postfach</span>
                                </div>
                            </li>
                            <li>
                                <NavLink className={styles.a} activeClassName={styles.active} to="/favs">
                                    <img src={Star} style={{width:18, height:18}} />
                                    <span>Favoriten</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={styles.a} activeClassName={styles.active} to="/friends">
                                    <img src={FriendsIcon} style={{width:18, height:18}} alt="" />
                                    <span><FormattedMessage id="Dashboard.arkadaslar" /></span>
                                </NavLink>
                            </li>
                            <li>
                                {form.newWiews ?<div className={styles.newMessage}>{form.newWiews}</div> : ""}
                                <NavLink className={styles.a} activeClassName={styles.active} to="/views">
                                    <img src={LookIcon} style={{width:18, height:18}} alt="" />
                                    <span><FormattedMessage id="Dashboard.profilineBakanlar" /></span>
                                </NavLink>
                            </li>
                        </ul>
                        {ifHome || location.pathname.includes("/users") ?
                        <div className={styles.subMenu}>
                            <ul>
                                <li>
                                    <NavLink className={styles.a} activeClassName={styles.active}  to={"/users/" + auth.userData.docId}>
                                        <span>Profilvorschau</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={styles.a} activeClassName={styles.active} to={path.PROFILE_EDIT_1}>
                                        <span>Über mich</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={styles.a} activeClassName={styles.active}  to={path.PROFILE_EDIT_2}>
                                        <span>Aussehen und Interresse</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={styles.a} activeClassName={styles.active}  to={path.PROFILE_EDIT_3}>
                                        <span>Meine Fotos</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div> : ""}
                        
                    </div>
                </div>
                <div className={styles.headerProfile}>
                    <NavLink to="/premium" className={styles.coins}>
                        <img src={CoinsIcon} style={{width:20, height:20}} alt="" />
                        <b>{auth.userData.coin} Coin</b>
                    </NavLink>
                    {auth.userData.badge && <NavLink to="/premium" className={styles.vip}>
                        <b>{auth.userData.badge}</b>
                    </NavLink>}

                    <div className={classNames("dropdown", dropdown ? "active" : "")}>
                        <div className={styles.profile} onClick={(e) => setDropdown(!dropdown)}>
                            <p className={styles.profileP}> 
                            <img src={Down2Icon} style={{width:12, height:12, marginRight:5, opacity:.4}} alt="" />
                            {/* <Down2Icon fill="#3498db" style={{width:12, height:12, marginRight:5}} /> */}
                            {auth.userData.meta.nickname}</p>
                            <div className={styles.profileAvatar}>
                                <div className={styles.img}>
                                    <img style={{ maxHeight: "none" }} src={auth.userData.meta.avatarThumb === "noavatar.jpg" ? "/noavatar.jpg" : auth.userData.meta.avatarThumb} alt="" />
                                </div>
                                {auth.userData.badge ? auth.userData.badge === "Gold" ? <img src={Gold} alt="" style={{ position: "absolute", top: -3, left: -3, width:20, height:20 }} /> : auth.userData.badge === "Bronze" ? <img src={Bronze} alt="" style={{ position: "absolute", top: -3, left: -3, width:20, height:20 }} /> : <img src={Silver} alt="" style={{ position: "absolute", top: -3, left: -3, width:20, height:20 }} /> : <span></span>}
                            </div>
                        </div>
                        <div className={"dropdown-menu"} style={{top:40}}>
                            <ul>

                                <li>
                                    <NavLink className="a"  to={"/users/" + auth.userData.docId}>
                                        <span>Profilvorschau</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="a" to={path.PROFILE_EDIT_1}>
                                        <span>Über mich</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="a"  to={path.PROFILE_EDIT_2}>
                                        <span>Aussehen und Interessen</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="a"  to={path.PROFILE_EDIT_3}>
                                        <span>Meine Fotos</span>
                                    </NavLink>
                                </li>
                                <li onClick={(e) => setDropdown(false)}>
                                    <NavLink to="/settings" className="a">
                                        Einstellungen
                                    </NavLink>
                                </li>
                                <li onClick={e => {setDropdown(false); dispatch(logout())}}>
                                    <span className="a">
                                        Abmelden
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="dropdown-bg" onClick={(e) => setDropdown(false)}></div>
                    </div>

                </div>
            </div>
        </div>

        <ModalMessage />
        <Modals />
{/*     
            {location.pathname !== "/premium" ? <div className={styles.messageButton} onClick={(e) => {dispatch(setMessageOpen(true))}}>
            Postfach {newMessages ? <span id="newMessage2" className={styles.newMessage}>{newMessages}</span> : ""} 
            </div> : ""} */}
        
    </div>)
}
export default Header_2;
