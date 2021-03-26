import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { searchData, searchDataReset} from "../../../state/actions/dashboard"
import Styles from "./Search.module.scss"
// import { ButtonMessage} from "../../../components/Items/buttons"
import classnames from "classnames"
import Input from "../../../components/Items/input"
import Select from "../../../components/Items/select"
import UserList from "../../../components/Layout/UserList/Index"
// import { openMessageCheck } from "../../../state/actions/messages"

const Search = () => {
  const { searchUsers, searchCitys, loading, form } = useSelector(
    (state) => ({
      loading: state.dashboard.loading,
      form: state.form,
      searchUsers: state.dashboard.searchUsers ? state.dashboard.searchUsers : [],
      searchCitys: state.form.searchCitys ? state.form.searchCitys : []
    }), shallowEqual
  );
  const [mobileToggle, mobileToggleStatus] = useState(false);
  // const [searchLength, searchLengthStatus] = useState(12);
  const onChange = (e) =>{
    dispatch(searchData(12, true))
  }
  const dispatch = useDispatch();
  useEffect(() => {
    const windowScroll = (event) => {
      if (!loading) {
        if (window.innerHeight + window.scrollY > document.body.clientHeight - 200) {
          if (form.searchNickname) {
            // dispatch(searchData(searchLength * 2))
            // searchLengthStatus(searchLength * 2)
          } else {
            dispatch(searchData(12))
          }
        }
      }
    }
    window.scrollTo(0, 0);
    if (searchUsers && searchUsers.length > 80){

      dispatch(searchDataReset(12))
    }else{
      dispatch(searchData(12, false, true))
    }

    window.addEventListener('scroll', windowScroll);

    // cleanup this component
    return () => {
      window.removeEventListener('scroll', windowScroll);
    };
  // eslint-disable-next-line
  }, [dispatch]);
  return(
    <section className={Styles.container}>
      <div className={classnames(Styles.inputs, mobileToggle ? Styles.active : "")}>
        <div className={Styles.icon} onClick={(e) => mobileToggleStatus(!mobileToggle)}>
          {!mobileToggle ? <i className="fi flaticon-magnifying-search-lenses-tool"></i> : ""}
          {mobileToggle ? <i className="fi flaticon-close-1"></i> : ""}
        </div>
        <Input name="searchNickname" type="text" label="Nutzername" bar="false" formchange={onChange} />
        <Select name="searchCountry" label="Land" items={[{ label: "Österreich", value: "at" }, { label: "Deutschland", value: "de" }, { label: "Schweiz", value: "ch" }]} bar="false" formchange={onChange} />
        <Select name="searchCity" label="Bundesland" items={searchCitys} bar="false" formchange={onChange} />
        <Select name="searchGender" label="Geschlecht" items={[{ label: "Männlich", value: "0" }, { label: "Weiblich", value: "1" }]} bar="false" formchange={onChange} />
        <Select name="searchRange" label="Im Alter Von" items={[{ label: "18 - 25", value: "0" }, { label: "25 - 35", value: "1" }, { label: "35 - 45", value: "2" }, { label: "55 - 65", value: "3" }]} bar="false" formchange={onChange} />
      </div>
      <UserList data={searchUsers} />
    </section>
  )
}

export default Search;
