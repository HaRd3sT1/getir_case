import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import Gold from "../../../assets/img/gold.js";
// import Bronze from "../../../assets/img/bronze.js";
// import Silver from "../../../assets/img/silver.js";
import { mainData} from "../../../state/actions/dashboard"
import Styles from "./Search.module.scss"
// import { ButtonMessage} from "../../../components/Items/buttons"
import UserList from "../../../components/Layout/UserList_3/Index"
// import { openMessageCheck } from "../../../state/actions/messages"

const Search = () => {
  const { searchUsers } = useSelector(
    (state) => ({
      searchUsers: state.search && state.search.list ? state.search.list : [],
    }), shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(mainData(24, true))
  // eslint-disable-next-line
  }, [dispatch]);
  return(
    <section className={Styles.container}>
      <UserList data={searchUsers} />
    </section>
  )
}

export default Search;
