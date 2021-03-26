import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {prizeProfile} from "../../../state/actions/auth"
import styles from './PrizeBox.module.scss';
import Email from "../../../assets/img/email.svg"
import Heart from "../../../assets/img/heart.svg"
import User from "../../../assets/img/user.svg"
import Avatar from "../../../assets/img/avatar.svg"
const Coin = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" style={{ marginLeft: 3}} height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M264.4 95.01c-35.6-.06-80.2 11.19-124.2 34.09C96.27 152 61.45 182 41.01 211.3c-20.45 29.2-25.98 56.4-15.92 75.8 10.07 19.3 35.53 30.4 71.22 30.4 35.69.1 80.29-11.2 124.19-34 44-22.9 78.8-53 99.2-82.2 20.5-29.2 25.9-56.4 15.9-75.8-10.1-19.3-35.5-30.49-71.2-30.49zm91.9 70.29c-3.5 15.3-11.1 31-21.8 46.3-22.6 32.3-59.5 63.8-105.7 87.8-46.2 24.1-93.1 36.2-132.5 36.2-18.6 0-35.84-2.8-50.37-8.7l10.59 20.4c10.08 19.4 35.47 30.5 71.18 30.5 35.7 0 80.3-11.2 124.2-34.1 44-22.8 78.8-52.9 99.2-82.2 20.4-29.2 26-56.4 15.9-75.7zm28.8 16.8c11.2 26.7 2.2 59.2-19.2 89.7-18.9 27.1-47.8 53.4-83.6 75.4 11.1 1.2 22.7 1.8 34.5 1.8 49.5 0 94.3-10.6 125.9-27.1 31.7-16.5 49.1-38.1 49.1-59.9 0-21.8-17.4-43.4-49.1-59.9-16.1-8.4-35.7-15.3-57.6-20zm106.7 124.8c-10.2 11.9-24.2 22.4-40.7 31-35 18.2-82.2 29.1-134.3 29.1-21.2 0-41.6-1.8-60.7-5.2-23.2 11.7-46.5 20.4-68.9 26.1 1.2.7 2.4 1.3 3.7 2 31.6 16.5 76.4 27.1 125.9 27.1s94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9z"></path></svg>


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
    if (!userData || !userData.prize){
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
        <b className={styles.title}>Hallo {userData.meta.nickname}</b>
        {profile < 100 && !userData.profile && userData.prize.sendMessage < 100 && userData.prize.login < 50 && userData.prize.profilePhoto !== 1 ? <p style={{ justifyContent: "flex-start", marginBottom: 15 }}>deine Belohnungen</p> : ""}
        <ul className={styles.prizeBoxs}>
            {profile < 100 && !userData.profile ? <li className={styles.prizeBox}>
                <div className={styles.prizeBoxIcon}>
                    <img src={User} alt="user" />
                </div>
                <p>Profil ausgefüllt {profile}/100</p>
                <b>+{prize.profile}
                    {Coin}
                </b>
                <div className={styles.prizeGeneral}>
                    <div className={styles.prizeOverlay} style={{ width: profile + "%" }}>
                        <p>Profil ausgefüllt {profile}/100</p>
                        <b>+{prize.profile}
                            {Coin}
                        </b>
                    </div>
                </div>
            </li> : ""}
            {userData.prize.sendMessage < 100 ? <li className={styles.prizeBox}>
                <div className={styles.prizeBoxIcon}>
                    <img src={Email} alt="email" />
                </div>
                <p>Nachricht senden {userData.prize.sendMessage}/{num1}</p>
                <b>+{prize.sendMessageCoin}
                    {Coin}
                </b>
                <div className={styles.prizeGeneral}>
                    <div className={styles.prizeOverlay} style={{ width: msgData <= 100 ? msgData + "%" : "100%" }}>
                        <p>Nachricht senden {userData.prize.sendMessage}/{num1}</p>
                        <b>+{prize.sendMessageCoin}
                            {Coin}
                        </b>
                    </div>
                </div>
            </li> : ""}
            {userData.prize.login < 50 ? <li className={styles.prizeBox}>
                <div className={styles.prizeBoxIcon}>
                    <img src={Heart} alt="heart" />
                </div>
                <p>Eingeloggt {userData.prize.login}/{num2}</p>
                <b>+{prize.loginCoin}
                    {Coin}
                </b>
                <div className={styles.prizeGeneral}>
                    <div className={styles.prizeOverlay} style={{ width: loginData <= 50 ? loginData * 2 + "%" : "100%" }}>
                        <p>Eingeloggt {userData.prize.login}/{num2}</p>
                        <b>+{prize.loginCoin}
                            {Coin}
                        </b>
                    </div>
                </div>
            </li> : ""}
            {userData.prize.profilePhoto !== 1 ? <li className={styles.prizeBox}>
                <div className={styles.prizeBoxIcon}>
                    <img src={Avatar} alt="user" />
                </div>
                <p>Bild hochgeladen {userData.prize.profilePhoto}/1</p>
                <b>+{prize.profilePhotoCoin}
                    {Coin}
                </b>
                <div className={styles.prizeGeneral}>
                    <div className={styles.prizeOverlay} style={{ width: photoData + "%" }}>
                        <p>Bild hochgeladen {userData.prize.profilePhoto}/1</p>
                        <b>+{prize.profilePhotoCoin}
                            {Coin}
                        </b>
                    </div>
                </div>
            </li> : ""}

        </ul>
    </div>)
}
export default PrizeBox;
