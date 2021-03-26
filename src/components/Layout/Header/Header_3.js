import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { logout } from '../../../state/actions/auth'
import classNames from 'classnames';
import styles from './Header_3.module.scss';
import { setMessageOpen } from "../../../state/actions/messages"
import path from "../../../Router/paths"
import {defaultLogo} from "../../../Settings"
import {  NavLink, useLocation } from "react-router-dom";
import {FormattedMessage} from 'react-intl';
import Modals from '../Modals/Index';
import ModalMessage from '../Modals/Messages';
// import SearchIcon from "../../../assets/img/icons/search.svg"
import Down2Icon from "../../../assets/img/icons/down2.svg"
// import BarsIcon from "../../../assets/img/icons/bars.svg"
import DiamondIcon from "../../../assets/img/icons/diamond.svg"
import HomeIcon from "../../../assets/img/icons/home.svg"
import Search2Icon from "../../../assets/img/icons/search2.svg"
import ChatIcon from "../../../assets/img/icons/chat.svg"
import FireIcon from "../../../assets/img/icons/fire.svg"
import LookIcon from "../../../assets/img/icons/look.svg"
import FriendsIcon from "../../../assets/img/icons/friends.svg"

const Header_3 = () => {
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    // const { addToast } = useToasts()
    // const [openMenu, setOpenMenu] = useState(false);
    // const [hideMenu, setHideMenu] = useState(false);
    let location = useLocation();

    const { auth, newMessages, form } = useSelector(
        (state) => ({
            auth: state.auth,
            form: state.form,
            newMessages: state.messagesList.totalNewMessages
        }), shallowEqual
    );
    useEffect(() => {
        // setOpenMenu(false)
        setDropdown(false)
        // eslint-disable-next-line
    }, [location]);
    // useEffect(() => {
        // const windowScroll = (event) => {
        //     if(window.scrollY > 20 && !hideMenu){
        //         setHideMenu(true)
        //     }else if(window.scrollY < 20 && hideMenu){
        //         setHideMenu(false)
        //     }
        // }

        // window.addEventListener('scroll', windowScroll);

        // // cleanup this component
        // return () => {
        // window.removeEventListener('scroll', windowScroll);
        // };
        // eslint-disable-next-line
    // }, [hideMenu]);
    return (<div id="dashboard_header">
        {/* , hideMenu ? styles.hideMenu : "" */}
        <div className={classNames(styles.headerBar)}>
            <div className={ classNames(styles.container)}>
                <div className={classNames(styles.left)}>
                    <div className={classNames(styles.headerLogo, "d-flex")}>
                        <NavLink to="/dashboard" className={styles.logo} >
                            {defaultLogo}
                        </NavLink>
                    </div>
                    <div className={styles.headerProfile}>
                        <div className={classNames("dropdown", dropdown ? "active" : "")}>
                            <div className={styles.profile} onClick={(e) => setDropdown(!dropdown)}>
                                <div className={styles.profileAvatar}>
                                    <div className={styles.img}>
                                        <img style={{ maxHeight: "none" }} src={auth.userData.meta.avatarThumb === "noavatar.jpg" ? "/noavatar.jpg" : auth.userData.meta.avatarThumb} alt="" />
                                    </div>
                                    <div className={styles.name}>
                                        <p className={styles.profileP}>{auth.userData.meta.nickname} 
                                        <img src={Down2Icon} style={{width:12, height:12, marginLeft:3, opacity:.5}} alt="" />
                                        {/* <Down2Icon fill={defaultColors.primary} style={{width:12, height:12, marginLeft:3}} /> */}
                                        </p>
                                        <div className={styles.dFlex}>
                                            {/* <NavLink to="/premium" className={styles.coins}>
                                                <Coins2Icon width={26} height={26} />
                                                <b>{userData.coin} Coin</b>
                                            </NavLink> */}
                                            <NavLink to="/premium?type=vip" className={classNames(styles.vip, auth.userData.badge ? styles.active : "")}>

                                                <img src={DiamondIcon} style={{width:26, height:26}} alt="" />
                                                {/* <DiamondIcon width={26} height={26} /> */}
                                                <b>{auth.userData.badge ? auth.userData.badge : "VIP"}</b>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"dropdown-menu"} style={{top:40}}>
                                <ul>

                                    <li>
                                        <NavLink className="a"  to={"/users/" + auth.userData.docId}>
                                            <span><FormattedMessage id="Profile.profilOnizleme" /></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="a" to={path.PROFILE_EDIT_1}>
                                            <span><FormattedMessage id="Profile.hakkimda" /></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="a"  to={path.PROFILE_EDIT_2}>
                                            <span><FormattedMessage id="Dashboard.gorunumVeIlgiAlanlari" /></span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="a"  to={path.PROFILE_EDIT_3}>
                                            <span><FormattedMessage id="Dashboard.fotograflar" /></span>
                                        </NavLink>
                                    </li>
                                    <li onClick={(e) => setDropdown(false)}>
                                        <NavLink to="/settings" className="a">
                                            <FormattedMessage id="Dashboard.ayarlar" />
                                        </NavLink>
                                    </li>
                                    <li onClick={(e) => setDropdown(false)}>
                                        <NavLink to="/premium" className="a">
                                            <FormattedMessage id="General.coinYukle" /> ({auth.userData.coin} Coin)
                                        </NavLink>
                                    </li>
                                    <li onClick={e => {setDropdown(false); dispatch(logout())}}>
                                        <span className="a">
                                            <FormattedMessage id="Dashboard.cikisYap" />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="dropdown-bg" onClick={(e) => setDropdown(false)}></div>
                        </div>

                    </div>
                    <div className={classNames(styles.menu, "d-flex")}>
                        <ul className={styles.main}>
                            <li>
                                <NavLink className={styles.a} activeClassName={styles.active} to="/dashboard" exact>
                                    <img src={HomeIcon} style={{width:28, height:28}} alt="" />
                                    {/* <HomeIcon style={{width:28, height:28}} /> */}
                                    <span><FormattedMessage id="Dashboard.anasayfa" /></span>
                                </NavLink>
                            </li>
                            <li className={styles.hover2}>
                                <NavLink className={styles.a} activeClassName={styles.active} to="/search">
                                    <img src={Search2Icon} style={{width:28, height:28}} alt="" />
                                    {/* <Search2Icon style={{width:28, height:28}} /> */}
                                    <span><FormattedMessage id="Dashboard.arama" /></span>
                                </NavLink>
                            </li>
                            <li>
                                {newMessages ?<div id="newMessage" className={styles.newMessage}>{newMessages}</div> : ""}
                                <div onClick={(e) => {dispatch(setMessageOpen(true))}} className={styles.a}>
                                    <img src={ChatIcon} style={{width:28, height:28}} alt="" />
                                    {/* <ChatIcon style={{width:28, height:28}} /> */}

                                    <span><FormattedMessage id="Dashboard.mesajlar" /></span>
                                </div>
                            </li>
                            <li>
                                <NavLink className={styles.a} activeClassName={styles.active} to="/favs">
                                    <img src={FireIcon} style={{width:28, height:28}} alt="" />
                                    {/* <FireIcon style={{width:28, height:28}} /> */}
                                    <span><FormattedMessage id="Dashboard.favoriler" /></span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={styles.a} activeClassName={styles.active} to="/friends">
                                    <img src={FriendsIcon} style={{width:28, height:28}} alt="" />
                                    {/* <FriendsIcon style={{width:28, height:28}} /> */}
                                    <span><FormattedMessage id="Dashboard.arkadaslar" /></span>
                                </NavLink>
                            </li>
                            <li>
                                {form.newWiews ?<div className={styles.newMessage}>{form.newWiews}</div> : ""}
                                <NavLink className={styles.a} activeClassName={styles.active} to="/views">
                                    <img src={LookIcon} style={{width:28, height:28}} alt="" />
                                    <span><FormattedMessage id="Dashboard.profilineBakanlar" /></span>
                                </NavLink>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
        
        <Modals />
        <ModalMessage />
    </div>)
}
export default Header_3;
