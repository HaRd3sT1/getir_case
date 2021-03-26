import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './Profile.module.scss';
import { NavLink} from "react-router-dom";
import path from "../../../Router/paths"
import {FormattedMessage} from 'react-intl';

const Sidebar = (props) => {
    // const dispatch = useDispatch();
    const { userData } = useSelector(
        (state) => ({
            userData: state.auth.userData
        }), shallowEqual
    );
    if(window.innerWidth < 991){
        return null
    }
    return (<div className={styles.sidebar}>
        {/* <h1 style={{fontSize:22, marginTop:0, fontWeight:"400"}}>Mein Profil</h1> */}
            <ul>
                <li>
                    <NavLink activeClassName={styles.active} to={"/users/" + userData.docId}>
                        <span><FormattedMessage id="Profile.profilOnizleme" /></span>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} to={path.PROFILE_EDIT_1}>
                        <span><FormattedMessage id="Profile.hakkimda" /></span>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} to={path.PROFILE_EDIT_2}>
                        <span><FormattedMessage id="Profile.gorunumIlgiAlanlari" /></span>
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink activeClassName={styles.active} to="/search">
                        <span>Mein Idealer Partner</span>
                    </NavLink>
                </li> */}
                <li>
                    <NavLink activeClassName={styles.active}  to={path.PROFILE_EDIT_3}>
                        <span><FormattedMessage id="Profile.fotograflarim" /></span>
                    </NavLink>
                </li>
            </ul>
    </div>)
}
export default Sidebar;
