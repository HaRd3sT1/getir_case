import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { matchData } from "../../../state/actions/dashboard"
import styles from './Match_2.module.scss';
import { NavLink } from 'react-router-dom';
import {userId_S} from "../../../Settings"
// import Modal from "../../../components/Items/modal"
// import MatchAlert from "../../Items/matchAlert"

const Match = (props) => {
    const dispatch = useDispatch();
    let sliderStep =  0
    const { matchs} = useSelector(
        (state) => ({
            // matchPopup: state.dashboard.matchPopup,
            matchs: state.dashboard.matchs,
        }), shallowEqual
    );

    const next = (e) => {
        if (sliderStep + 3 < matchs.length) {
            sliderStep++
            document.getElementById("match_slider_content").style.left = (sliderStep * -99) + "px"
        }
    }
    const prev = (e) => {
        if (sliderStep > 0) {
            sliderStep--
            document.getElementById("match_slider_content").style.left = (sliderStep * -99) + "px"
        }
    }
    // const close = () =>{
    //     dispatch(matchPopupReset())
    // }
    useEffect(() => {
        dispatch(matchData())
    }, [dispatch]);
    return (<div className={styles.general}>
        <b className={styles.title}>Meine Matches
        </b>

        <div className={styles.match_slider}>
            <ul id="match_slider_content" className={styles.match_slider_content}>
                {matchs && matchs.length ?
                    matchs.map((post, index) => {
                        let avatar = post.avatar === "noavatar.jpg" ? "/noavatar.jpg" : post.avatar
                        return (<li key={index} className={styles.list}>
                            {/* degistir */}
                            <NavLink className={styles.avatar} style={{ backgroundImage: "url(" + avatar + ")" }} to={{ pathname: "/users/" + userId_S(post.userId) }}>
                                <h3>{post.nickname}</h3>
                            </NavLink>
                        </li>)
                    }) : <li className={styles.list}>
                        <NavLink className={styles.avatar} to={{ pathname: "/match" }}>
                            <b>+</b>
                            <b> Geh Match </b>
                        </NavLink>
                    </li>}
            </ul>
        </div>
    </div>)
}
export default Match;
