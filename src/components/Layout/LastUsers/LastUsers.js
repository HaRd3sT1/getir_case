import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { lastUsersData } from "../../../state/actions/lastUsers"
import {userId_S} from "../../../Settings"
import Draggable from 'react-draggable';
import styles from './LastUsers.module.scss';

const LastUsers = (props) => {
    const dispatch = useDispatch();
    const [sliderStep, sliderStepStatus] = useState(0);
    const { lastUsers} = useSelector(
        (state) => ({
            lastUsers: state.dashboard.lastUsers ? state.dashboard.lastUsers : [],
            prize: state.generalDataReducer.prize,
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
        dispatch(lastUsersData())
    }, [dispatch]);
    return (<div className={styles.lastUsers}>
        <b className={styles.title}>Neue Mitglieder
          {lastUsers.length ? <div><div className={classnames(styles.slider_arrow, styles.left)} onClick={prev}><i className="fi flaticon-left-arrow-angle-big-gross-symbol"></i></div><div className={classnames(styles.slider_arrow, styles.right)} onClick={next}><i className="fi flaticon-right-arrow"></i></div></div> : ""}
        </b>
        <div className={styles.list}>
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
                <ul id="neuUL">
                    {lastUsers.map((post, index) => {
                        if (!post || !post.userId){
                            return null
                        }
                        let avatar = post.avatar === "noavatar.jpg" ? "/noavatar.jpg" : post.avatar
                        return (<li key={index}><NavLink key={index} to={{ pathname: "/users/" + userId_S(post.userId) }}>
                            <div className={styles.avatar} style={{ backgroundImage: "url(" + avatar + ")" }}></div>
                            <b>{post.nickname}</b>
                        </NavLink></li>)
                    })}
                </ul>
            </Draggable>
        </div>

    </div>)
}
export default LastUsers;
