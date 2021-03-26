import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Style.module.scss';
import { handle, nope, like } from "../../../state/actions/slider"
import { getRandomFake } from "../../../state/actions/users"
import { favRemove, favAdd } from "../../../state/actions/favs"
import { NavLink } from "react-router-dom"
import classnames from 'classnames'
import Hobs_1 from "../../../assets/img/hobs/1.svg"
import Hobs_2 from "../../../assets/img/hobs/2.svg"
import Hobs_3 from "../../../assets/img/hobs/3.svg"
import Hobs_4 from "../../../assets/img/hobs/4.svg"
import Hobs_5 from "../../../assets/img/hobs/5.svg"
import Hobs_6 from "../../../assets/img/hobs/6.svg"
import Hobs_7 from "../../../assets/img/hobs/7.svg"
import Hobs_8 from "../../../assets/img/hobs/8.svg"
import Hobs_9 from "../../../assets/img/hobs/9.svg"
import Hobs_10 from "../../../assets/img/hobs/10.svg"
import Hobs_11 from "../../../assets/img/hobs/11.svg"
import Hobs_12 from "../../../assets/img/hobs/12.svg"
import Hobs_13 from "../../../assets/img/hobs/13.svg"
import Hobs_14 from "../../../assets/img/hobs/14.svg"
import Hobs_15 from "../../../assets/img/hobs/15.svg"
import Hobs_16 from "../../../assets/img/hobs/16.svg"
import Hobs_17 from "../../../assets/img/hobs/17.svg"
import Hobs_18 from "../../../assets/img/hobs/18.svg"
import Hobs_19 from "../../../assets/img/hobs/19.svg"
import Hobs_20 from "../../../assets/img/hobs/20.svg"
import Hobs_21 from "../../../assets/img/hobs/21.svg"
import Hobs_22 from "../../../assets/img/hobs/22.svg"
import {userId_S, userId_2_S} from "../../../Settings"

const Match = (props) => {
    const dispatch = useDispatch();
    const { userData, match, favs } = useSelector(
        (state) => ({
            active: state.messages.active,
            userData: state.auth.userData,
            match: state.users.match ? state.users.match : [],
            favs: state.favs.list ? state.favs.list : []
        }), shallowEqual
    );
    const hobs = ["Lesen", "Reisen", "Musik hören", "Kochen", "Schwimmen", "Joggen", "Fitnessstudio", "Reiten", "Kino", "Wandern", "Extermsport", "Fernsehen", "Computerspiele", "Sport", "Fotografie", "Gesellschaftspiele", "Backen", "Sammeln", "Angeln", "Camping", "Karaoke", "Frag mich", "Frag mich"];
    const hobsIncon = [Hobs_1, Hobs_2, Hobs_3, Hobs_4, Hobs_5, Hobs_6, Hobs_7, Hobs_8, Hobs_9, Hobs_10, Hobs_11, Hobs_12, Hobs_13, Hobs_14, Hobs_15, Hobs_16, Hobs_17, Hobs_18, Hobs_19, Hobs_20, Hobs_21, Hobs_22, Hobs_22];
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!Array.isArray(match)){
            dispatch(getRandomFake(20))
        }else if (match && match.length < 20){
            dispatch(getRandomFake(20))
        }else{
            dispatch(handle())
        }
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: "center", alignItems:"center" }}>
            <div className={styles.match}>
                {userData.prize.slide >= 20 ? <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", color: "#75777b", fontSize: 15, marginTop: 10, position: "absolute", zIndex: 101, background: "#f0f2f5", left: 0, right: 0, bottom: 0, top: 0, justifyContent: "center" }}>
                    <b>:(</b>
                    <p>Das tägliche Matchlimit ist abgelaufen. Du kannst morgen wieder kommen.</p>
                </div> : ""}
                 {/* className={classnames(styles.sliderContent)} */}
                <div id="sliderContent" className={classnames(styles.sliderContent)}>
                    {match.length ? match.map((data, index) => {
                        let textLength = 0
                        let HobsLength = 0
                        return (
                            // { styles.sliderItem }
                            <div key={index} id={userId_S(data.userId)} className={styles.sliderItem} style={{ zIndex: (100 - index) }}>
                                <div className={styles.imgContent} style={{ backgroundImage: "url(" + data.avatarLarge + ")" }}>
                                    <div className={styles.like}>
                                        LIKE
                                    </div>
                                    <div className={styles.nope}>
                                        NOPE
                                    </div>
                                </div>
                                <div className={styles.text}>
                                    <div className={styles.left}>
                                        <NavLink to={{ pathname: "/users/" + userId_S(data.userId) }}>
                                            <h2 className={styles.nickname}>
                                                {data.nickname}
                                            </h2>
                                        </NavLink>
                                        <small>{data.age}  Jahre</small>
                                        <p className={styles.city}>
                                            <i className={classnames("fi flaticon-maps-and-flags")}></i>
                                            {data.city}
                                        </p>
                                    </div>
                                    <NavLink className={styles.right} to={{ pathname: "/users/" + userId_S(data.userId) }}>
                                        <i className="fi flaticon-down-arrow"></i>
                                        See More
                                    </NavLink>
                                </div>
                                <hr />
                                <div className={styles.hobs}>
                                    {data.hobs.map((doc, index) => {
                                        if (doc){
                                            textLength = textLength + hobs[doc].length
                                            if (textLength < 30) {
                                                HobsLength++
                                                return (
                                                    <div key={index}>
                                                        <img src={hobsIncon[doc]} alt="" />
                                                        {hobs[doc]}
                                                    </div>
                                                )
                                            }
                                        }
                                        return null
                                    })}
                                    {data.hobs.length - HobsLength > 0 ? <div className={styles.total}> +{data.hobs.length - HobsLength} </div> : ""}

                                </div>
                            </div>
                        )
                    }) : ""}
                </div>
                <div className={styles.slide}>
                    <p>Tägliches Spiellimit</p>
                    <b>{userData.prize.slide ? userData.prize.slide : 0} / 20</b>
                </div>
                <div className={styles.buttons}>
                    <button onClick={(e) => dispatch(nope())}>
                        {/* <Times width={24} height={24} color="#fff" /> */}
                        <i className="fi flaticon-close-1"></i>
                    </button>
                     {/* onClick={this.fav} className={topId ? this.state.favs.includes(topId) ? "active" : "" : ""} */}
                    {match[0] ? favs.includes(userId_2_S(match[0].id)) ? <button className={styles.active} onClick={(e) => dispatch(favRemove(userId_2_S(match[0].id)))}>
                        <i className="fi flaticon-favourites-filled-star-symbol"></i>
                    </button> : <button onClick={(e) => dispatch(favAdd(userId_2_S(match[0].id)))}>
                        <i className="fi flaticon-favourites-filled-star-symbol"></i>
                    </button> : ""}
                    <button onClick={(e) => dispatch(like())}>
                        <i className="fi flaticon-heart"></i>
                        {/* <Heart width={34} height={34} fill="#fff" /> */}
                    </button>
                </div>
            </div>
        </div>)
}
export default Match;
