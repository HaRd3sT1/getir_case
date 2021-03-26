import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './MessagesList_2.module.scss';
import { openMessage, openMessageAdmin } from "../../../state/actions/messages"
import { messagesListData} from "../../../state/actions/messagesList"
import classnames from 'classnames';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {FormattedMessage} from 'react-intl';
import {defaultLogoIconLink} from "../../../Settings"
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')
const MessagesList = (props) => {
    const dispatch = useDispatch();
    const { messagesList, users, adminMessages } = useSelector(
        (state) => ({
            messagesList: state.messagesList.list ? state.messagesList.list : [],
            adminMessages: state.messagesList.adminMessages ? state.messagesList.adminMessages : [],
            users: state.messagesUsers ? state.messagesUsers : [],
        }), shallowEqual
    );
    return (<div className={classnames(styles.general, props.id ? styles.messagesPage : "")}>
        <div className={styles.messagesList}>
            <ul id="messageList">
                {messagesList.map((post, index) => {
                    if (post.type === "automessage" || post.type === undefined) {
                        return null
                    } else {
                        let avatar, nickname
                        if(users[post.userId]){
                            avatar = users[post.userId].avatar
                            nickname = users[post.userId].nickname
                        }else{
                            return null
                        }
                        return (<li id={post.id} key={index} className={post.activeBox ? styles.active : ''} onClick={(e) => dispatch(openMessage(post.id))}>
                            <div className={styles.avatarContent}>
                                {post.newMessages ? <span>{post.newMessages}</span> : ""}
                                <div className={styles.avatar} style={{ backgroundImage: "url(" + avatar+ ")" }}></div>
                            </div>
                            <div className={styles.text}>
                                <h3 className={styles.nickname}>{nickname}  <small>{post.time ? timeAgo.format(new Date(post.time.seconds * 1000), 'twitter') : ""}</small></h3>
                                <p className={styles.messageSmall}>{post.lastMessage.substring(0, 20)}...</p>
                            </div>
                        </li>)
                    }
                })}
                {adminMessages ? 
                <li onClick={(e) => dispatch(openMessageAdmin())}>
                    <div className={styles.avatarContent}>
                        <div className={styles.avatar} style={{ backgroundImage: "url(" + defaultLogoIconLink+ ")" }}></div>
                    </div>
                    <div className={styles.text}>
                        <h3 className={styles.nickname}>{adminMessages.title}  <small>{adminMessages.time ? timeAgo.format(new Date(adminMessages.time.seconds * 1000), 'twitter') : ""}</small></h3>
                        <p className={styles.messageSmall}>{adminMessages.lastMessage && adminMessages.lastMessage.substring(0, 20)}...</p>
                    </div>
                </li>
                 : ""}
                {messagesList.length === 20 ?  messagesList.length ? <li className={styles.loadMore} onClick={(e)=> dispatch(messagesListData(300))}><FormattedMessage id="General.dahaFazlaYukle" /></li> : "" : ""}
                
            </ul>
        </div>
    </div>)
}
export default MessagesList;
