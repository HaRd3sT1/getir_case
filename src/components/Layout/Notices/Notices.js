import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { deleteNotice } from "../../../state/actions/dashboard"
import styles from './Notices.module.scss';

const Notices = (props) => {
    const dispatch = useDispatch();
    const { userData } = useSelector(
        (state) => ({
            userData: state.auth.userData,
        }), shallowEqual
    );
    if(!userData.notices){
        return null
    }
    return (<div className={styles.notices}>
        <b className={styles.title}>Ankündigung</b>
        <ul>
            {userData.notices ? userData.notices.map((post, index) => {
                return (<li key={index}>
                    <span onClick={(e) => dispatch(deleteNotice(index))}>
                        <i className="fi flaticon-close"></i>
                    </span>
                    {post}
                </li>)
            }) : ""}
        </ul> 
    </div>)
}
export default Notices;
