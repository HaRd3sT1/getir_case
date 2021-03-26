import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Styles from "../Search/Search.module.scss"
// import classnames from "classnames"
// import { openMessageCheck } from "../../../state/actions/messages"
import { favsUsers } from "../../../state/actions/favs"
import UserList from "../../../components/Layout/UserList/Index"

let start = 0
let end = 12
const Search = () => {
    const { users, loading } = useSelector(
        (state) => ({
            loading: state.dashboard.loading,
            users: state.favs.users ? state.favs.users : [],
        }), shallowEqual
    );
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        const ScrollEvent = (event) => {
            if (!loading) {
                if (window.innerHeight + window.scrollY > document.body.clientHeight - 200) {
                    start = start + 13
                    end = end + 12
                    dispatch(favsUsers(start, end))
                }
            }
        }
        // if (!users.length){
            dispatch(favsUsers(start, end))
        // }
        window.addEventListener('scroll', ScrollEvent);

        // cleanup this component
        return () => {
            window.removeEventListener('scroll', ScrollEvent);
        };
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <section className={Styles.container} style={{marginTop:30}}>
            <UserList data={users} hidden="true" />
        </section>
    )
}

export default Search;
