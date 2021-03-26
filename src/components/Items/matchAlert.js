import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ButtonMessage } from "../../components/Items/buttons"
import matchLogo from "../../assets/img/match.png"
import { NavLink } from 'react-router-dom';
import styles from './Main.module.scss';
import { openMessageCheck } from "../../state/actions/messages"
import {userId_S} from "../../Settings"
const MatchAlert = (props) => {
    const dispatch = useDispatch();
    const { userData, matchPopup } = useSelector(
        (state) => ({
            userData: state.auth.userData,
            matchPopup: state.dashboard.matchPopup
        }), shallowEqual
    );
    if (!props.close) {
        return null
    }
    if (!matchPopup){
        return null
    }
    return (
        <div className={styles.match_alert}>
            <img style={{ height: 60, marginBottom: 15 }} src={matchLogo} alt="match" />
            <p style={{ fontSize: 18, color: "#afafaf", margin: 0, display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                Sie und <NavLink to={{ pathname: "/users/" + userId_S(matchPopup.userId) }} style={{ fontSize: 18, color: "#ff684e", marginLeft: 5, marginRight: 5, fontWeight: "bold" }}>{matchPopup.userName}</NavLink> haben sich gemocht!</p>
            <div className={styles.avatars}>
                <div>
                    <div className={styles.avatar} style={{ backgroundImage: "url(" + userData.meta.avatarLarge + ")" }}></div>
                </div>
                <div>
                    <NavLink className={styles.avatar} to={{ pathname: "/users/" + userId_S(matchPopup.userId) }} style={{ backgroundImage: "url(" + matchPopup.avatar + ")" }}>
                    </NavLink>
                </div>
            </div>
             {/* onClick={(e) => this.openMessage()} */}

            <ButtonMessage userid={matchPopup.userId} text="Nachricht Senden" onClick={(e) => { dispatch(openMessageCheck(matchPopup.userId)); props.close()}} />
        </div>
    );
};

export default MatchAlert;