import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import Gold from "../../../assets/img/gold.js";
// import Bronze from "../../../assets/img/bronze.js";
// import Silver from "../../../assets/img/silver.js";
import Styles from "../Search/Search.module.scss"
// import classnames from "classnames"
// import { openMessageCheck } from "../../../state/actions/messages"
import { favsData } from "../../../state/actions/favs"
import UserList from "../../../components/Layout/UserList_3/Index"

import SadHeartIcon from "../../../assets/img/icons/sadHeart.svg"
const Search = () => {
    const { users, loading } = useSelector(
        (state) => ({
            loading: state.favs.loading,
            users: state.favs.list ? state.favs.list : [],
        }), shallowEqual
    );
    const dispatch = useDispatch();
    useEffect(() => {

        window.scrollTo(0, 0);
        dispatch(favsData(true))
        const windowScroll = (event) => {
            if (!loading) {
                if (window.innerHeight + window.scrollY > document.body.clientHeight - 200) {
                    dispatch(favsData())
                }
            }
        }
        window.addEventListener('scroll', windowScroll);

        // cleanup this component
        return () => {
            window.removeEventListener('scroll', windowScroll);
        };



        // // favsData(20)
        // const ScrollEvent = (event) => {
        //     if (!loading) {
        //         if (window.innerHeight + window.scrollY > document.body.clientHeight - 200) {
        //             start = start + 13
        //             end = end + 12
        //             console.log("gett fav")
        //             dispatch(favsUsers(start, end))
        //         }
        //     }
        // }
        // // if (!users.length){
        //     dispatch(favsUsers(start, end))
        // // }
        // window.addEventListener('scroll', ScrollEvent);

        // // cleanup this component
        // return () => {
        //     window.removeEventListener('scroll', ScrollEvent);
        // };
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <section className={Styles.container} style={{marginTop:0}}>
            {users.length ?
            <UserList data={users} hidden="true" />
            : <div className={Styles.notFound}><img src={SadHeartIcon} style={{width:120, height:120}}  alt="" /><p>Entschuldigung, Sie haben keinen bevorzugten Benutzer.</p></div> }
        </section>
    )
}

export default Search;
