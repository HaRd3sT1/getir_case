import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {mobileListData} from "../../../state/actions/dashboard"
// import {mainData} from "../../../state/actions/dashboard"
import Styles from "./Mobile.module.scss"
// import { ButtonBlue} from "../../../components/Items/buttons"
// import classnames from "classnames"
// import Input from "../../../components/Items/input"
// import Select from "../../../components/Items/select"
import UserList from "../../../components/Layout/UserListMobile_1/Index"
import {onChange} from "../../../state/actions/form"
// import { openMessageCheck } from "../../../state/actions/messages"

const Search = (props) => {
  const { searchUsers, form} = useSelector(
    (state) => ({
      // loading: state.dashboard.loading,
      form: state.form,
      // userData: state.auth.userData,
      searchUsers: state.dashboard && state.dashboard.mobileList ? state.dashboard.mobileList : [],
      // onlineUsers: state.dashboard.onlineUsers ? state.dashboard.onlineUsers : [],
      // lastUsers: state.dashboard.lastUsers ? state.dashboard.lastUsers : [],
      // twoUsers: state.users.twoUsers ? state.users.twoUsers : [],
      // searchCitys: state.form.searchCitys ? state.form.searchCitys : []
    }), shallowEqual
  );
  // const [refresh, refreshSet] = useState(false);
  // const [tabs, tabsStatus] = useState(0);
  // const [filtre, filtreSet] = useState(false);
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
    window.scrollTo(0, 0);
    // dispatch(mainData(1))
    dispatch(mobileListData())
    
    
  // eslint-disable-next-line
  }, [dispatch]);
  useEffect(() => {
    // refreshSet(false)
  // eslint-disable-next-line
  }, [form]);
  return(
    <section className={Styles.DashboardMobile}>
      {/* <UserList data={tabs === 0 ? searchUsers : tabs === 1 ? lastUsers : tabs === 2 ? onlineUsers : []} /> */}
      <UserList data={searchUsers} />
    </section>
  )
}

export default Search;
