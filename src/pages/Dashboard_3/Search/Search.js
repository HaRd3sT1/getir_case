import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { mainData} from "../../../state/actions/dashboard"
import { searchData} from "../../../state/actions/search"
import Styles from "./Search.module.scss"
// import { ButtonMessage} from "../../../components/Items/buttons"
// import classnames from "classnames"
import { ButtonBlue} from "../../../components/Items/buttons"
import Input from "../../../components/Items/input"
import Select from "../../../components/Items/select"
// import SearchBar from "../../../components/Layout/SearchBar/SearchBar"
import UserList from "../../../components/Layout/UserList_4/Index"
import {FormattedMessage, useIntl} from 'react-intl';
// import { openMessageCheck } from "../../../state/actions/messages"
import ReloadIcon from "../../../assets/img/icons/reload.svg"

const Search = () => {
  const intl = useIntl();
  const { searchUsers, searchCitys } = useSelector(
    (state) => ({
      // loading: state.dashboard.loading,
      // form: state.form,
      searchCitys: state.form.searchCitys ? state.form.searchCitys : [],
      searchUsers: state.search && state.search.list ? state.search.list : [],
    }), shallowEqual
  );
  // const [mobileToggle, mobileToggleStatus] = useState(false);
  // const [tabs, tabsStatus] = useState(0);
  const [refresh, refreshSet] = useState(false);
  // const [searchLength, searchLengthStatus] = useState(12);
  // const onChange = (e) =>{
  //   dispatch(searchData(24, true))
  // }
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
      dispatch(searchData(24, true, "", "dashboard"))
  // eslint-disable-next-line
  }, [dispatch]);
  return(
    <section className={Styles.container}>
      {window.innerWidth > 991 ? <div className={Styles.header}>
      <div className={Styles.tab2}>
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
              <ButtonBlue style={{ borderRadius: 5, height: 52, width: "100%", textTransform:"capitalize",flex: "none", marginBottom:0 }} onClick={(e) => {dispatch(searchData(24, true, "", "dashboard")); refreshSet(true)}}   text={refresh ? <span style={{display:"flex", alignItems:"center"}}><img src={ReloadIcon} style={{width:14, height:14, marginRight:8}} alt="" />{<FormattedMessage id="Dashboard.yenile" />}</span> : <FormattedMessage id="Dashboard.aramaYap" />} />
            </li>
          </ul>
         </div>
        </div> : ""}
      <UserList data={searchUsers} />
    </section>
  )
}

export default Search;
