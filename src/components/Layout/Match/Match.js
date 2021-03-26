import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { matchData } from "../../../state/actions/dashboard"
import styles from './Match.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import Draggable from 'react-draggable';
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
        <b className={styles.title}>Letztes Spiel
          {matchs && matchs.length ? <div><div className={classnames(styles.slider_arrow, styles.left)} onClick={prev}><i className="fi flaticon-left-arrow-angle-big-gross-symbol"></i></div><div className={classnames(styles.slider_arrow, styles.right)} onClick={next}><i className="fi flaticon-right-arrow"></i></div></div> : ""}
        </b>

        <div className={styles.match_slider}>
            <Draggable
                axis="x"
                bounds={{ right: 0 }}
                handle=".handle"
            // defaultPosition={{x: 0, y: 0}}
            // position={null}
            // grid={[25, 25]}
            // scale={1}
            // onStart={this.handleStart}
            // onDrag={this.handleDrag}
            // onStop={this.handleStop}
            >
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
            </Draggable>
        </div>
    </div>)
}
export default Match;
