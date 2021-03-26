import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import Gold from "../../../assets/img/gold.js";
// import Bronze from "../../../assets/img/bronze.js";
// import Silver from "../../../assets/img/silver.js";
// import {mainData} from "../../../state/actions/dashboard"
import { lastUsersData} from "../../../state/actions/lastUsers"
// import { searchData} from "../../../state/actions/search"
// import { onlineUsersData} from "../../../state/actions/onlineUsers"
import Styles from "./Dashboard.module.scss"
import UserList from "../../../components/Layout/UserList_2/Index"
import {FormattedMessage} from 'react-intl';
// import { openMessageCheck } from "../../../state/actions/messages"

const Search = (props) => {
  const { lastUsers} = useSelector(
    (state) => ({
      lastUsers: state.lastUsers && state.lastUsers.list ? state.lastUsers.list : [],
    }), shallowEqual
  );
 
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(lastUsersData(24, true, "", "dashboard"))
    
    
    
  // eslint-disable-next-line
  }, [dispatch]);
  return(
    <section className={Styles.dashboard}>
      <ul className={Styles.tabs}>
        <NavLink to="/dashboard">
                {<FormattedMessage id="Dashboard.tab1" />}
        </NavLink>
      {/* </li> */}
        <NavLink to="/last-users" className={Styles.active}>
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
      <UserList data={lastUsers} />
      {/* <UserList data={tabs === 0 ? searchUsers : tabs === 1 ? lastUsers : tabs === 2 ? onlineUsers : []} /> */}
    </section>
  )
}

export default Search;
