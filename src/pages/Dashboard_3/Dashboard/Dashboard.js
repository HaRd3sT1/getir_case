import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { onlineUsersData} from "../../../state/actions/onlineUsers"
import { searchData} from "../../../state/actions/search"
import { checkUsers} from "../../../state/actions/users"
import { onChange} from "../../../state/actions/form"
// import { lastUsersData} from "../../../state/actions/lastUsers"
import Styles from "./Dashboard.module.scss"
import classnames from "classnames"
import UserList from "../../../components/Layout/UserList_4/Index"
import DashboardFiltre from "../../../components/Layout/DashboardFiltre/Index"
// import { getRandomFake } from '../../../state/actions/users';
import {FormattedMessage} from 'react-intl';
import SupermanIcon from "../../../assets/img/icons/superman.svg"
import FilterIcon from "../../../assets/img/icons/filter.svg"
import CloseIcon from "../../../assets/img/icons/close.svg"
import ReloadIcon from "../../../assets/img/icons/reload.svg"
import User1 from "../../../assets/img/user1.jpg"
import User2 from "../../../assets/img/user2.jpg"

const Search = (props) => {
  const { searchUsers,userData} = useSelector(
    (state) => ({
      userData: state.auth.userData,
      searchUsers: state.search && state.search.list ? state.search.list : [],
      // onlineUsers: state.onlineUsers && state.onlineUsers.list ? state.onlineUsers.list : [],
      // lastUsers: state.lastUsers && state.lastUsers.list ? state.lastUsers.list : [],
    }), shallowEqual
  );
  // const [tabs, tabsStatus] = useState(0);
  const [filtre, filtreSet] = useState(false);
  // const [searchLength, searchLengthStatus] = useState(12);
 
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    if(searchUsers.length < 20 || (window.innerWidth < 991)){
      dispatch(searchData(24, true, "", "dashboard", "home", "home"))
    }else{
      dispatch(checkUsers(searchUsers))
    }
    
    // eslint-disable-next-line
  }, [dispatch]);
  const reload = (e) => {
    dispatch(onChange("searchNickname",""))
    dispatch(onChange("searchCountry",""))
    dispatch(onChange("searchCity",""))
    dispatch(onChange("searchGender",""))
    dispatch(onChange("searchRange",""))
    dispatch(searchData(24, true, "", "dashboard", "home", "home"))
  }
  return(
    <section className={Styles.Dashboard}>
      <div className={Styles.tabs}>
        <ul className={Styles.tab1}>
          {/* <li className={tabs === 0 ? Styles.active : ""}> */}
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
          {/* <FilterIcon style={{width:14, height:14, marginRight:4}} fill="#fff" /> */}
          {/* <CloseIcon style={{width:14, height:14, marginRight:4}} fill="#fff" /> */}
          <div className={Styles.filter} onClick={(e) => filtreSet(!filtre)}>
            {filtre ? <img src={CloseIcon} style={{width:14, height:14, marginRight:4}} alt="" /> :  
              <img src={FilterIcon} style={{width:14, height:14, marginRight:4}} alt="" />}
            {filtre ? <FormattedMessage id="Dashboard.aramayiKapat" /> :  <FormattedMessage id="Dashboard.aramayiFiltrele" />}
          </div>
        </ul>

        {filtre ? <DashboardFiltre /> : ""}
      </div>
      <div className={Styles.info}>
        <div className={Styles.shortUsers}>
          <div className={classnames(Styles.user, "fixed-bg")} style={{ backgroundImage: `url(${User1})`}}></div>
          <div className={classnames(Styles.user, "fixed-bg")} style={{ backgroundImage: `url(${User2})`}}></div>
          {/* {twoUsers.map((doc, index) =>{
            return (<div key={index} className={classnames(Styles.user, "fixed-bg")} style={{ backgroundImage: `url(${doc.avatarLarge})`}}></div>)
          })} */}
          <div className={classnames(Styles.user, "fixed-bg")} style={{ backgroundImage: `url(${userData.meta.avatarLarge})`}}>
            <div className={Styles.icon}> 
              <img src={SupermanIcon} style={{width:16, height:16}} alt="" />
              {/* <SupermanIcon style={{width:16, height:16}} /> */}
            </div>
          </div>
        </div>
        {<FormattedMessage id="Dashboard.premiumYazi" />}
        
        <NavLink to="/premium?type=vip">{<FormattedMessage id="Dashboard.premiumButon" />}</NavLink>
      </div>
      <UserList data={searchUsers} />
      <div className={Styles.reload} onClick={(e) => reload()}>
          <img src={ReloadIcon} alt="" />
      </div>
    </section>
  )
}

export default Search;
