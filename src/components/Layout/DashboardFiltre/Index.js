import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { searchData} from "../../../state/actions/search"
import Styles from "./Styles.module.scss"
import { ButtonBlue} from "../../../components/Items/buttons"
import Input from "../../../components/Items/input"
import Select from "../../../components/Items/select"
// import { getRandomFake } from '../../../state/actions/users';
import {onChange} from "../../../state/actions/form"
import {FormattedMessage, useIntl} from 'react-intl';
import ReloadIcon from "../../../assets/img/icons/reload.svg"

const Search = (props) => {
  const intl = useIntl();
  const { searchUsers,userData, searchCitys,  form} = useSelector(
    (state) => ({
      form: state.form,
      userData: state.auth.userData,
      searchUsers: state.dashboard.searchUsers ? state.dashboard.searchUsers : [],
      // twoUsers: state.users.twoUsers ? state.users.twoUsers : [],
      searchCitys: state.form.searchCitys ? state.form.searchCitys : []
    }), shallowEqual
  );
  const [refresh, refreshSet] = useState(false);
  // const [searchLength, searchLengthStatus] = useState(12);
 
  const dispatch = useDispatch();
  useEffect(() => {
    // await dispatch(onChange("country", "tr"));
    // dispatch(onChangeCity("searchCity", e.target.value));
    // dispatch(onChangeCountry("searchCountry", "tr"))
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
    if(!searchUsers.length){
      dispatch(onChange("searchCountry", userData.meta.country))
      dispatch(onChange("searchCity", userData.meta.city))
    }else{
      if(form.searchCountry || form.searchCity){
        dispatch(onChange("searchCountry", ""))
        dispatch(onChange("searchCity", ""))
      }
    }
    // if(!form.searchGender || form.searchGender !== "0"){
    //     dispatch(onChange("searchGender", userData.meta.gender))
    // }
    // if(!twoUsers.length){
    //   dispatch(getRandomFake());
    // }
    
    // eslint-disable-next-line
  }, [dispatch]);
  return(
    <div className={Styles.DashboardFiltre}>
        <ul>
        <li>
            <Input style={{marginBottom:0}} styletype="type_5" name="searchNickname" type="text" label={<FormattedMessage id="Dashboard.nickname" />} bar="false"/>
        </li>
        <li>
            <Select style={{marginBottom:0}} styletype="type_5" name="searchCountry" label={<FormattedMessage id="Register.ulke" />} items={[{ label: "Österreich", value: "at" }, { label: "Deutschland", value: "de" }, { label: "Schweiz", value: "ch" }]} bar="false" />
        </li>
        <li>
            <Select style={{marginBottom:0}} styletype="type_5" name="searchCity" label={<FormattedMessage id="Register.sehir" />} items={searchCitys} bar="false"/>
        </li>
        <li>
            <Select style={{marginBottom:0}} styletype="type_5" name="searchGender" label={<FormattedMessage id="Register.cinsiyet" />} items={[{ label: intl.formatMessage({id:"General.erkek"}), value: "0" }, { label: intl.formatMessage({id:"General.kadin"}), value: "1" }]} bar="false"/>
        </li>
        <li>
            <Select style={{marginBottom:0}} styletype="type_5" name="searchRange" label={<FormattedMessage id="Dashboard.yasAraligi" />} items={[{ label: "18 - 25", value: "0" }, { label: "25 - 35", value: "1" }, { label: "35 - 45", value: "2" }, { label: "55 - 65", value: "3" }]} bar="false"/>
        </li>
        <li>
            <ButtonBlue style={{ borderRadius: 5, height: 52, width: "100%", textTransform:"capitalize",flex: "none", marginBottom:0 }} onClick={(e) => {dispatch(searchData(24, true, "", "dashboard", "home")); refreshSet(true)}}   text={refresh ? <span style={{display:"flex", alignItems:"center"}}>
            {/* <ReloadIcon style={{width:14, height:14, marginRight:8}} fill="#fff" /> */}
            <img src={ReloadIcon} style={{width:14, height:14, marginRight:8}} alt="" />
            {<FormattedMessage id="Dashboard.yenile" />}</span> : <FormattedMessage id="Dashboard.aramaYap" />} />
        </li>
        </ul>
    </div>
  )
}

export default Search;
