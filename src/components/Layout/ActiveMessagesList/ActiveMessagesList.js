import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './ActiveMessagesList.module.scss'
import { openMessage, closeMessageSidebar} from "../../../state/actions/messages"

const MessagesList = () => {
    const dispatch = useDispatch();
    const { messagesList } = useSelector(
        (state) => ({
            messagesList: state.messages.list ? state.messages.list : [],
            // matchs: state.dashboard.matchs,
        }), shallowEqual
    );
    return (
        <div className={styles.messageList}>
            <ul>
                {messagesList.map((post, index) => {
                    if (post.type === "automessage" || post.type === undefined || !post.active) {
                        return null
                    }
                    return (<li key={index}>
                        <div className={styles.messageAvatar}>
                            <div className={styles.close} onClick={(e) => dispatch(closeMessageSidebar(post.id))}><i className="fi flaticon-close"></i></div>
                            {post.newMessages ? <span>{post.newMessages}</span> : ""}
                            <div className={styles.avatarImg} onClick={(e) => dispatch(openMessage(post))} style={{ backgroundImage: "url(" + post.avatar + ")" }}></div>
                        </div>
                    </li>)
                })}
            </ul>
        </div>)
}
export default MessagesList;
