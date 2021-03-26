import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Styles from "../Search/Search.module.scss"
import { favsData } from "../../../state/actions/favs"
import UserList from "../../../components/Layout/UserList_4/Index"

import SadHeartIcon from "../../../assets/img/icons/sadHeart.svg"
import {FormattedMessage} from 'react-intl';
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
        return () => {
            window.removeEventListener('scroll', windowScroll);
        };

        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <section className={Styles.container} style={{marginTop:0, paddingTop:90}}>
            <div className={Styles.header} style={{paddingBottom:16}}>
                <div className={Styles.title}>
                    <FormattedMessage id="General.favoriler" />
                </div>
            </div>
            {users.length ?
            <UserList data={users} hidden="true" />
            : <div className={Styles.notFound}><img src={SadHeartIcon} style={{width:120, height:120}} alt="" /><p>
                <FormattedMessage id="General.favoriYok" /></p></div> }
        </section>
    )
}

export default Search;
