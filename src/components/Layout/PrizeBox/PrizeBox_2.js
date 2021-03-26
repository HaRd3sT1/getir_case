import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { prizeProfile } from "../../../state/actions/auth"
import styles from './PrizeBox_2.module.scss';


const PrizeBox = (props) => {
    const dispatch = useDispatch();
    const [profile, profileStatus] = useState(0);
    const { userData, prize } = useSelector(
        (state) => ({
            userData: state.auth.userData,
            prize: state.generalDataReducer.prize,
        }), shallowEqual
    );
    dispatch(prizeProfile(profile, profileStatus))
    if (!userData || !userData.prize) {
        return null;
    }
    let num1 = 10
    if (userData.prize.sendMessage < 10) {
        num1 = 10
    } else if (userData.prize.sendMessage < 20) {
        num1 = 20
    } else if (userData.prize.sendMessage < 30) {
        num1 = 30
    } else if (userData.prize.sendMessage < 40) {
        num1 = 40
    } else if (userData.prize.sendMessage < 50) {
        num1 = 50
    } else if (userData.prize.sendMessage < 60) {
        num1 = 60
    } else if (userData.prize.sendMessage < 70) {
        num1 = 70
    } else if (userData.prize.sendMessage < 80) {
        num1 = 80
    } else if (userData.prize.sendMessage < 90) {
        num1 = 90
    } else {
        num1 = 100
    }
    let num2 = 5
    if (userData.prize.login < 5) {
        num2 = 5
    } else if (userData.prize.login < 10) {
        num2 = 10
    } else if (userData.prize.login < 15) {
        num2 = 15
    } else if (userData.prize.login < 20) {
        num2 = 20
    } else if (userData.prize.login < 25) {
        num2 = 25
    } else if (userData.prize.login < 30) {
        num2 = 30
    } else if (userData.prize.login < 35) {
        num2 = 35
    } else if (userData.prize.login < 40) {
        num2 = 40
    } else if (userData.prize.login < 45) {
        num2 = 45
    } else {
        num2 = 50
    }
    let msgData = Math.floor(userData.prize.sendMessage * 100 / num1)
    let loginData = Math.floor(userData.prize.login * 50 / num2)
    let photoData = userData.prize.profilePhoto * 100 / 1
    return (<div className={styles.general}>
        <b className={styles.title}>Herzlich Willkommen {userData.meta.nickname}</b>
        {profile < 100 && !userData.profile && userData.prize.sendMessage < 100 && userData.prize.login < 50 && userData.prize.profilePhoto !== 1 ? <p style={{ justifyContent: "flex-start", marginBottom: 15 }}>deine Fortschritte</p> : ""}
        <ul className={styles.prizeBoxs}>
            {profile < 100 && !userData.profile ? <li className={styles.prizeBox}>
                <p>Profil ausgefüllt </p>
                <b>{profile}/100</b>
            </li> : ""}
            {userData.prize.sendMessage < 100 ? <li className={styles.prizeBox}>
                <p>Nachricht senden </p>
                <b>{userData.prize.sendMessage}/{num1}</b>
            </li> : ""}
            {userData.prize.login < 50 ? <li className={styles.prizeBox}>
                
                <p>Eingeloggt </p>
                <b>{userData.prize.login}/{num2}</b>
            </li> : ""}
            {userData.prize.profilePhoto !== 1 ? <li className={styles.prizeBox}>
               
                <p>Bild hochgeladen </p>
                <b>{userData.prize.profilePhoto}/1</b>
            </li> : ""}

        </ul>
    </div>)
}
export default PrizeBox;
