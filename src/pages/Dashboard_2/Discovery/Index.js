import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { mainData} from "../../../state/actions/dashboard"
import { searchData} from "../../../state/actions/search"
import Styles from "./Styles.module.scss"
// import { ButtonMessage} from "../../../components/Items/buttons"
import UserList from "../../../components/Layout/UserList_5/Index"
// import { openMessageCheck } from "../../../state/actions/messages"

const Search = () => {
  const { searchUsers, loading } = useSelector(
    (state) => ({
      loading: state.dashboard.loading,
      searchUsers: state.search && state.search.list ? state.search.list : [],
    }), shallowEqual
  );
  
  const dispatch = useDispatch();
  useEffect(() => {
    const windowScroll = (event) => {
      if (!loading) {
        if (window.innerHeight + window.scrollY > document.body.clientHeight - 200) {
        // dispatch(mainData(12, true))

      dispatch(searchData(24, false, "", "dashboard", "home"))
        }
      }
    }
    window.scrollTo(0, 0);
    // dispatch(mainData(24))

      dispatch(searchData(24, true, "", "dashboard", "home"))


    window.addEventListener('scroll', windowScroll);

    // cleanup this component
    return () => {
      window.removeEventListener('scroll', windowScroll);
    };
  // eslint-disable-next-line
  }, [dispatch]);
  return(
    <section className={Styles.container}>
      <UserList data={searchUsers} />
    </section>
  )
}

export default Search;
