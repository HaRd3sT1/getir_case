import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { logout} from '../../../state/actions/auth'
import { searchData} from "../../../state/actions/search"
import classNames from 'classnames';
import styles from './Header_mobile_3.module.scss';
import path from "../../../Router/paths"
import Modals from '../Modals/Index';
import ModalMessage from '../Modals/Messages';
import {defaultLogo} from "../../../Settings"
import {  NavLink, useLocation } from "react-router-dom";
import { ButtonBlue} from "../../../components/Items/buttons"
import Input from "../../../components/Items/input"
import Select from "../../../components/Items/select"
import {FormattedMessage, useIntl} from 'react-intl';
import Filter2Icon from "../../../assets/img/icons/filter2.svg"
import ReloadIcon from "../../../assets/img/icons/reload.svg"
import Left2Icon from "../../../assets/img/icons/left2.svg"
import MenuIcon from "../../../assets/img/icons/menu.svg"

const Header_3 = (props) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const [openSearch, openSearchSet] = useState(false);
    const [refresh, refreshSet] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    // const [openMenu, setOpenMenu] = useState(false);
    // const [hideMenu, setHideMenu] = useState(false);
    let location = useLocation();


    const { form, auth} = useSelector(
        (state) => ({
            auth: state.auth,
            form: state.form ? state.form : []
        }), shallowEqual
    );
    useEffect(() => {
        // setOpenMenu(false)
        setDropdown(false)
        // eslint-disable-next-line
    }, [location]);
    

    return (
        <div className={classNames(styles.headerBarMobile)}>
            {openSearch ?<div className={styles.search}>
                <div className={styles.title} onClick={(e) => openSearchSet(false)}>
                    {/* <Left2Icon style={{width:24, height:24}} fill="#444" />  */}

                    <img src={Left2Icon} style={{width:24, height:24}} alt="" />
                    <FormattedMessage id="Dashboard.ayarlar" />
                </div>
                <div className={styles.sub}>
                    <FormattedMessage id="Dashboard.aramaYap" />
                </div>
                <ul>
                    <li>
                    <Input styletype="type_5" name="searchNickname" type="text" label={intl.formatMessage({id:"Dashboard.nickname"})} bar="false"/>
                    </li>
                    <li>
                    <Select styletype="type_5" name="searchCountry" label={intl.formatMessage({id:"Register.ulke"})} items={[{ label: "Österreich", value: "at" }, { label: "Deutschland", value: "de" }, { label: "Schweiz", value: "ch" }]} bar="false"/>
                    </li>
                    <li>
                    <Select styletype="type_5" name="searchCity" label={intl.formatMessage({id:"Register.sehir"})} items={form.searchCitys} bar="false"/>
                    </li>
                    <li>
                    <Select styletype="type_5" name="searchGender" label={intl.formatMessage({id:"Register.cinsiyet"})} items={[{ label: intl.formatMessage({id:"General.erkek"}), value: "0" }, { label: intl.formatMessage({id:"General.kadin"}), value: "1" }]} bar="false"/>
                    </li>
                    <li>
                    <Select styletype="type_5" name="searchRange" label={intl.formatMessage({id:"Dashboard.yasAraligi"})} items={[{ label: "18 - 25", value: "0" }, { label: "25 - 35", value: "1" }, { label: "35 - 45", value: "2" }, { label: "55 - 65", value: "3" }]} bar="false"/>
                    </li>
                    <li>
                    <ButtonBlue style={{ borderRadius: 5, height: 44, width: "100%", textTransform:"capitalize",flex: "none", marginBottom:0 }} onClick={(e) => {dispatch(searchData(24, true, "", "dashboard", "home")); refreshSet(true); openSearchSet(false)}}   text={refresh ? <span style={{display:"flex", alignItems:"center"}}>
                        {/* <ReloadIcon style={{width:14, height:14, marginRight:8}} fill="#fff" /> */}
                        <img src={ReloadIcon} style={{width:14, height:14, marginRight:8}} alt="" />
                        <FormattedMessage id="Dashboard.yenile" /></span>:<FormattedMessage id="Dashboard.aramaYap" />} />
                    </li>
                </ul>
            </div> : ""}
            {/* <Filter2Icon onClick={(e) => openSearchSet(true)} style={{width:36, height:36}} fill="#4d4d4d" /> */}
            {location.pathname === "/search" ? <img src={Filter2Icon} onClick={(e) => openSearchSet(true)} style={{width:36, height:36}} alt="" /> : ""}
            <div className={classNames(styles.headerLogo, "d-flex")}>
                <NavLink to="/dashboard" className={styles.logo} >
                    {defaultLogo}
                </NavLink>
                
            </div>
            <div className={styles.a}>
                <div className={classNames("dropdown", dropdown ? "active" : "")}>
                    <div className={styles.avatar} onClick={(e) => setDropdown(!dropdown)}>
                        {/* <MenuIcon style={{width:32, height:32}} fill="#333" /> */}
                        <img src={MenuIcon} style={{width:32, height:32}} alt="" />
                        {form.newWiews ?<div className={styles.newMessage}>{form.newWiews}</div> : ""}
                    </div>
                    <div className={"dropdown-menu"} style={{top:40}}>
                        <ul>

                            <li onClick={(e) => setDropdown(false)}>
                                <NavLink className="a"  to={"/friends"}>
                                    <span><FormattedMessage id="Dashboard.arkadaslar" /></span>
                                </NavLink>
                            </li>
                            <li onClick={(e) => setDropdown(false)}>
                                <NavLink className="a"  to={"/views"}>
                                    <span><FormattedMessage id="Dashboard.profilineBakanlar" /></span>
                                    {form.newWiews ?<div className={styles.newMessage}>{form.newWiews}</div> : ""}
                                </NavLink>
                            </li>
                            <li onClick={(e) => setDropdown(false)}>
                                <NavLink className="a"  to={"/users/" + auth.userData.docId}>
                                    <span><FormattedMessage id="Profile.profilOnizleme" /></span>
                                </NavLink>
                            </li>
                            <li onClick={(e) => setDropdown(false)}>
                                <NavLink className="a" to={path.PROFILE_EDIT_1}>
                                    <span><FormattedMessage id="Profile.hakkimda" /></span>
                                </NavLink>
                            </li>
                            <li onClick={(e) => setDropdown(false)}>
                                <NavLink className="a"  to={path.PROFILE_EDIT_2}>
                                    <span><FormattedMessage id="Dashboard.gorunumVeIlgiAlanlari" /></span>
                                </NavLink>
                            </li>
                            <li onClick={(e) => setDropdown(false)}>
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

            <Modals />
            <ModalMessage />
        </div>)
}
export default Header_3;
