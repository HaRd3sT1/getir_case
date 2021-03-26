import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Styles from "../Search/Search.module.scss"
import { NavLink } from 'react-router-dom';
import { getViews } from "../../../state/actions/views"
import { onChange } from "../../../state/actions/form"
import UserList from "../../../components/Layout/UserList_3/Index"

import {FormattedMessage} from 'react-intl';
import SadHeartIcon from "../../../assets/img/icons/sadHeart.svg"
const Views = () => {
    const { users, userData } = useSelector(
        (state) => ({
            // loading: state.favs.loading,
            userData: state.auth.userData,
            users: state.views.list ? state.views.list : [],
        }), shallowEqual
    );
    const dispatch = useDispatch();
    useEffect(() => {

        window.scrollTo(0, 0);
        dispatch(getViews())
        dispatch(onChange("newWiews", 0))
        
        // dispatch(favsData(true))
        // const windowScroll = (event) => {
        //     if (!loading) {
        //         if (window.innerHeight + window.scrollY > document.body.clientHeight - 200) {
        //             dispatch(favsData())
        //         }
        //     }
        // }
        // window.addEventListener('scroll', windowScroll);
        // return () => {
        //     window.removeEventListener('scroll', windowScroll);
        // };

    }, [dispatch]);
    return (
        <section className={Styles.container} style={{marginTop:0}}>
            {userData.badge ? "" : <div className={Styles.info}>
                {<FormattedMessage id="Dashboard.vipOlmalisin" />}
                
                <NavLink to="/premium?type=vip">{<FormattedMessage id="Dashboard.vipOl" />}</NavLink>
            </div>}
            {users.length ?
            <UserList data={users} hideContent={userData.badge ? false : true} hidden="true" />
            : <div className={Styles.notFound}><img src={SadHeartIcon} style={{width:120, height:120}} alt="" /><p>
                <FormattedMessage id="General.favoriYok" /></p></div> }
        </section>
    )
}

export default Views;
