import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import Gold from "../../../assets/img/gold.js";
// import Bronze from "../../../assets/img/bronze.js";
// import Silver from "../../../assets/img/silver.js";
// import {mainData} from "../../../state/actions/dashboard"
// import { lastUsersData} from "../../../state/actions/lastUsers"
import { searchData} from "../../../state/actions/search"
// import { onlineUsersData} from "../../../state/actions/onlineUsers"
import Styles from "./Dashboard.module.scss"
import { checkUsers} from "../../../state/actions/users"
import { ButtonBlue} from "../../../components/Items/buttons"
import classnames from "classnames"
import Input from "../../../components/Items/input"
import Select from "../../../components/Items/select"
import UserList from "../../../components/Layout/UserList_2/Index"
import {onChange} from "../../../state/actions/form"
import ReloadIcon from "../../../assets/img/icons/reload.svg"
import {FormattedMessage} from 'react-intl';
// import { openMessageCheck } from "../../../state/actions/messages"

const Search = (props) => {
  const { searchUsers, form, userData} = useSelector(
    (state) => ({
      userData: state.auth.userData,
      form: state.form,
      searchUsers: state.search && state.search.list ? state.search.list : [],
      // onlineUsers: state.dashboard.onlineUsers ? state.dashboard.onlineUsers : [],
      // lastUsers: state.dashboard.lastUsers ? state.dashboard.lastUsers : [],
    }), shallowEqual
  );
  const [refresh, refreshSet] = useState(false);
  // const [tabs, tabsStatus] = useState(0);
  // const [searchLength, searchLengthStatus] = useState(12);
 
  const dispatch = useDispatch();
  useEffect(() => {
    if(form.searchGender !== "0" && form.searchGender !== "1"){
      dispatch(onChange("searchGender",userData.meta.gender.toString() === "1" ? "0" : "1"))
      dispatch(searchData(24, true, "", "dashboard", "home"))
    }
    if(window.location.pathname === "/step3"){
        var __url_string = window.location.href;
        var __url = new URL(__url_string);
        if (__url.searchParams.get("function")) {
            var __function = __url.searchParams.get("function");
            if (__function === "billing") {
            }
        } else {
            dispatch(onChange("paymentError", true))
        }
        // dispatch(onChange("paymentError", true))
    }
    window.scrollTo(0, 0);
    // dispatch(mainData(24, true))

    if(searchUsers.length < 20 || (window.innerWidth < 991)){
      if(form.searchGender === "0" || form.searchGender === "1"){
        dispatch(searchData(24, true, "", "dashboard", "home"))
      }
    }else{
      dispatch(checkUsers(searchUsers))
    }
    // dispatch(searchData(24, true, "", "dashboard"))
    
    
    
  // eslint-disable-next-line
  }, [dispatch]);
  const reload = (e) => {
    dispatch(onChange("searchNickname",""))
    dispatch(onChange("searchCountry",""))
    dispatch(onChange("searchCity",""))
    dispatch(onChange("searchRange",""))
    dispatch(onChange("searchGender",""))
    dispatch(searchData(24, true, "", "dashboard", "home"))
  }
  return(
    <section className={Styles.dashboard}>
      <ul className={Styles.tabs}>
        <NavLink to="/dashboard" className={Styles.active}>
                {<FormattedMessage id="Dashboard.tab1" />}
        </NavLink>
      {/* </li> */}
        <NavLink to="/last-users">
            {<FormattedMessage id="Dashboard.tab2" />}
        </NavLink>
        <NavLink to="/online-users">
            {<FormattedMessage id="Dashboard.tab3" />}
            <div className="intro-banner-vdo-play-btn online ml-2">
            <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
            <span className="ripple online"></span>
            <span className="ripple online"></span>
            <span className="ripple online"></span>
            </div>
        </NavLink>
        {/* <li className={tabs === 0 ? Styles.active : ""} onClick={(e) => tabsStatus(0)}>
          Interessante {window.innerWidth > 991 && "Profile" }
        </li>
        <li className={tabs === 1 ? Styles.active : ""} onClick={(e) => {dispatch(lastUsersData(24)); tabsStatus(1)}}>
          Neue {window.innerWidth > 991 && "Profile" }
        </li>
        <li className={tabs === 2 ? Styles.active : ""} onClick={(e) => {dispatch(onlineUsersData(24)); tabsStatus(2)}}>
          Online
          <div className="intro-banner-vdo-play-btn online ml-2">
            <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
            <span className="ripple online"></span>
            <span className="ripple online"></span>
            <span className="ripple online"></span>
          </div>
        </li> */}
      </ul>
      <div className={classnames(Styles.inputs, Styles.active)}>
        <Input style={{marginBottom:0, boxShadow:"0 0 0"}} styletype="type_3" name="searchNickname" type="text" label="Nutzername" bar="false"/>
        <Select style={{marginBottom:0}} styletype="type_3" name="searchCountry" label="Land" items={[{ label: "Österreich", value: "at" }, { label: "Deutschland", value: "de" }, { label: "Schweiz", value: "ch" }]} bar="false"/>
        <Select style={{marginBottom:0}} styletype="type_3" name="searchCity" label="Bundesland" items={form.searchCitys ? form.searchCitys : []} bar="false"/>
        <Select style={{marginBottom:0}} styletype="type_3" name="searchGender" label="Geschlecht" items={[{ label: "Männlich", value: "0" }, { label: "Weiblich", value: "1" }]} bar="false"/>
        <Select style={{marginBottom:0}} styletype="type_3" name="searchRange" label="Im Alter Von" items={[{ label: "18 - 25", value: "0" }, { label: "25 - 35", value: "1" }, { label: "35 - 45", value: "2" }, { label: "55 - 65", value: "3" }]} bar="false"/>
         <ButtonBlue style={{ borderRadius:0,borderTopRightRadius: 3,borderBottomRightRadius: 3, height: 52, width: 100, marginLeft:0, textTransform:"capitalize",flex: "none", marginBottom:0 }} onClick={(e) => {dispatch(searchData(24, true, "", "dashboard", "home")); refreshSet(true)}}   text={refresh ? <span style={{display:"flex", alignItems:"center"}}><img src={ReloadIcon} style={{width:14, height:14, marginRight:8}} alt="" />Neue</span>:"Suchen"} />
      </div>
      <UserList data={searchUsers} />
      <div className={Styles.reload} onClick={(e) => reload()}>
          <img src={ReloadIcon} alt="" />
      </div>
      {/* <UserList data={tabs === 0 ? searchUsers : tabs === 1 ? lastUsers : tabs === 2 ? onlineUsers : []} /> */}
    </section>
  )
}

export default Search;
