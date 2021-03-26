import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Logo from "../../../assets/img/logo.js"
import { logout } from '../../../state/actions/auth'
import classNames from 'classnames';
import styles from './Header.module.scss';
import Gold from "../../../assets/img/icons/gold.svg"
import Bronze from "../../../assets/img/icons/bronze.svg"
import Silver from "../../../assets/img/icons/silver.svg"
import Home from "../../../assets/img/home.js";
import Chat from "../../../assets/img/chat.js";
import Match from "../../../assets/img/match.js";
import Star from "../../../assets/img/star.js";
import PremiumIcon from "../../../assets/img/premium.js";
import VipIcon from "../../../assets/img/vip.js";
import Input from "../../Items/input"
import { searchData } from "../../../state/actions/dashboard"
import { useHistory, NavLink } from "react-router-dom";

const Header = (props) => {
    const dispatch = useDispatch();
    const { userData } = useSelector(
        (state) => ({
            userData: state.auth.userData
        }), shallowEqual
    );
    const history = useHistory();
    const onChange = (e) => {
        if (history.location.pathname !== "/dashboard"){
            history.push("/dashboard");
        }
        dispatch(searchData(12, true))
    }
    return (<div id="dashboard_header">
        <div className={styles.headerBar}>
            <div className={classNames(styles.headerLogo, "d-flex")}>
                <NavLink to="/dashboard" className={styles.logo} >
                    <Logo color="#5f666f" width="94px" height="42px" />
                </NavLink>
                <div className={styles.search}>
                    <Input name="searchNickname" styletype="type_2" type="text" label="" placeholder="Suche..." icon={<i className="fi flaticon-magnifying-search-lenses-tool"></i>} formchange={onChange} />
                </div>
            </div>
            <ul className={classNames(styles.menu, "d-flex")}>
                <li>
                    <NavLink className={styles.a} activeClassName={styles.active} to="/dashboard" exact>
                        <Home width="26px" height="26px" fill="none" color="#65676b" />
                        <Home width="26px" height="26px" fill="#ada4ff" color="#ada4ff" />
                        <span>Startseite</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={styles.a} activeClassName={styles.active} to="/messages">
                        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Chat width="26px" height="26px" fill="none" color="#65676b" color2="#65676b" />
                            <Chat width="26px" height="26px" fill="#ada4ff" color="#ada4ff" color2="#fff" />
                            <div id="newMessage" className={styles.newMessage}></div>
                        </div>

                        <span>Postfach</span>
                    </NavLink>
                </li>
                <li className={styles.hover2}>
                    <NavLink className={styles.a} activeClassName={styles.active} to="/match">
                        <Match width="26px" height="26px" fill="none" fill2="#fff" color="#65676b" />
                        <Match width="26px" height="26px" fill="#ada4ff" color="#ada4ff" />
                        <Match width="26px" height="26px" fill="none" fill2="#eee" color="#65676b" />
                        <span>Match</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={styles.a} activeClassName={styles.active} to="/favs">
                        <Star width="26px" height="26px" fill="none" color="#65676b" />
                        <Star width="26px" height="26px" fill="#ada4ff" color="#ada4ff" />
                        <span>Favories</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={styles.a} activeClassName={styles.active} to="/premium">
                        <PremiumIcon width="26px" height="26px" fill="none" color="#65676b" />
                        <PremiumIcon width="26px" height="26px" fill="#ada4ff" color="#ada4ff" />
                        <span>Premium</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={classNames(styles.a, styles.vip)} activeClassName={styles.active} to="/vip">
                        <VipIcon width="32px" height="32px" fill="#ada4ff" color="#ada4ff" />
                        <VipIcon width="32px" height="32px" fill="none" color="#65676b" />
                        <span>Vip</span>
                    </NavLink>
                </li>
            </ul>
            <div className={styles.headerProfile}>
                <NavLink to={"/users/" + userData.docId}>
                    <div className={styles.profile}>
                        <div className={styles.profileAvatar}>
                            <div className={styles.img}>
                                <img style={{ maxHeight: "none" }} src={userData.meta.avatarThumb === "noavatar.jpg" ? "/noavatar.jpg" : userData.meta.avatarThumb} alt="" />
                            </div>
                            {userData.badge ? userData.badge === "Gold" ? <img src={Gold} alt="" style={{ position: "absolute", top: -3, left: -3, width:20, height:20 }} /> : userData.badge === "Bronze" ? <img src={Bronze} alt="" style={{ position: "absolute", top: -3, left: -3, width:20, height:20 }} /> : <img src={Silver} alt="" style={{ position: "absolute", top: -3, left: -3, width:20, height:20 }} /> : <span></span>}
                        </div>
                        <p className={styles.profileP}>{userData.meta.nickname}</p>
                    </div>
                </NavLink>
                <NavLink to="/premium">
                    <div className={styles.coinH}>
                        <b className={styles.coinB}>{userData.coin} Coin</b>
                    </div>
                </NavLink>
                <div className={styles.logout} onClick={(e) => dispatch(logout())}>
                    <i className="fi flaticon-power-button"></i>
                </div>
            </div>
        </div>
    </div>)
}
export default Header;
