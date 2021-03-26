import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './MessagesList.module.scss';
import { openMessage } from "../../../state/actions/messages"
// messagesListData, 
import classnames from 'classnames';
// import { mobileToggleFunc } from "../../../state/actions/dashboard"

const MessagesList = (props) => {
    const dispatch = useDispatch();
    const { messagesList, mobileToggle } = useSelector(
        (state) => ({
            messagesList: state.messages.list ? state.messages.list : [],
            mobileToggle: state.dashboard.mobileToggle,
        }), shallowEqual
    );

    useEffect(() => {
        // dispatch(messagesListData(300))
    }, [dispatch]);
    return (<div id="messageList" className={classnames(styles.general, props.id ? styles.messagesPage : "", mobileToggle ? styles.active : "")}>
        <b className={styles.title}>Postfach
        </b>
        <div className={styles.messagesList}>
            <ul>
                {messagesList.map((post, index) => {
                    if (post.type === "automessage" || post.type === undefined) {
                        return null
                    } else {
                        return (<li key={index} onClick={(e) => dispatch(openMessage(post))}>
                            <div className={styles.avatarContent}>
                                {post.newMessages ? <span>{post.newMessages}</span> : ""}
                                <div className={styles.avatar} style={{ backgroundImage: "url(" + post.avatar + ")" }}></div>
                            </div>
                            <div className={styles.text}>
                                <h3 className={styles.nickname}>{post.nickname}</h3>
                            </div>
                        </li>)
                    }
                })}
            </ul>
        </div>
    </div>)
}
export default MessagesList;
