import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
// import { lastUsersData } from "../../../state/actions/dashboard"
import {userId_S} from "../../../Settings"
// import Draggable from 'react-draggable';
import styles from './LastUsers_3.module.scss';
import {FormattedMessage} from 'react-intl';

const LastUsers = (props) => {
    const dispatch = useDispatch();
    // const [sliderStep, sliderStepStatus] = useState(0);
    const { lastUsers,userData} = useSelector(
        (state) => ({
            lastUsers: state.dashboard.vipUsers ? state.dashboard.vipUsers : [],
            // prize: state.generalDataReducer.prize,
            userData: state.auth.userData,
            // users: state.users ? state.users : []
        }), shallowEqual
    );
    // const next = async (e) => {
    //     if (sliderStep + 3 < lastUsers.length) {
    //         sliderStepStatus(Number(sliderStep) + 1)
    //         document.getElementById("neuUL").style.left = (sliderStep * -99) + "px"
    //     }
    // }
    // const prev = async (e) => {
    //     if (sliderStep > 0) {
    //         sliderStepStatus(Number(sliderStep) - 1)
    //         document.getElementById("neuUL").style.left = (sliderStep * -99) + "px"
    //     }
    // }

    useEffect(() => {
        // dispatch(lastUsersData(15))
    }, [dispatch]);
    return (<div className={styles.lastUsers}>
        <div className={styles.list}>
            <ul>
                {userData.badge ? <li><div className={styles.a}>
                    <div className={styles.avatar} style={{ backgroundImage: "url(" + userData.meta.avatarThumb + ")" }}></div>
                    </div>
                </li> :
                <li><NavLink className={styles.a} to={{ pathname: "/premium" }}>
                    <div className={styles.avatar} style={{ backgroundImage: "url(" + userData.meta.avatarThumb + ")" }}></div>
                    {/* <b>{users[post].nickname}</b> */}
                    <p><FormattedMessage id="Dashboard.beniEkle" /></p>
                    </NavLink>
                </li>}
               
                {lastUsers.map((post, index) => {
                    let avatar = post.avatar === "noavatar.jpg" ? "/noavatar.jpg" : post.avatar
                    return (<li key={index}><NavLink className={styles.a} key={index} to={{ pathname: "/users/" + userId_S(post.id) }}>
                        <div className={styles.avatar} style={{ backgroundImage: "url(" + avatar + ")" }}></div>
                        {/* <b>{users[post].nickname}</b> */}
                    </NavLink></li>)
                })}
            </ul>
        </div>

    </div>)
}
export default LastUsers;
