import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { lastUsersData } from "../../../state/actions/lastUsers"
import {userId_S} from "../../../Settings"
import Draggable from 'react-draggable';
import styles from './LastUsers_2.module.scss';

const LastUsers = (props) => {
    const dispatch = useDispatch();
    const [sliderStep, sliderStepStatus] = useState(0);
    const { lastUsers, users, userData} = useSelector(
        (state) => ({
            lastUsers: state.dashboard.lastUsers ? state.dashboard.lastUsers : [],
            prize: state.generalDataReducer.prize,
            userData: state.auth.userData,
            users: state.users ? state.users : []
        }), shallowEqual
    );
    const next = async (e) => {
        if (sliderStep + 3 < lastUsers.length) {
            sliderStepStatus(Number(sliderStep) + 1)
            document.getElementById("neuUL").style.left = (sliderStep * -99) + "px"
        }
    }
    const prev = async (e) => {
        if (sliderStep > 0) {
            sliderStepStatus(Number(sliderStep) - 1)
            document.getElementById("neuUL").style.left = (sliderStep * -99) + "px"
        }
    }

    useEffect(() => {
        dispatch(lastUsersData(15))
    }, [dispatch]);
    return (<div className={styles.lastUsers}>
        <div className={styles.list}>
            <ul>
               <li><NavLink to={{ pathname: "/premium" }}>
                    <div className={styles.avatar} style={{ backgroundImage: "url(" + userData.meta.avatarThumb + ")" }}></div>
                    {/* <b>{users[post].nickname}</b> */}
                    <p>Beni Ekle</p>
                    </NavLink>
                </li>
                {lastUsers.map((post, index) => {
                    if (!users[post] || !users[post].id){
                        return null
                    }
                    let avatar = users[post].avatar === "noavatar.jpg" ? "/noavatar.jpg" : users[post].avatar
                    return (<li key={index}><NavLink key={index} to={{ pathname: "/users/" + userId_S(users[post].id) }}>
                        <div className={styles.avatar} style={{ backgroundImage: "url(" + avatar + ")" }}></div>
                        {/* <b>{users[post].nickname}</b> */}
                    </NavLink></li>)
                })}
            </ul>
        </div>

    </div>)
}
export default LastUsers;
