import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './MessageBox.module.scss';
import classnames from 'classnames';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import FileUploader from 'react-firebase-file-uploader';
import TimeAgo from 'javascript-time-ago'
import { NavLink } from 'react-router-dom';
import en from 'javascript-time-ago/locale/en'
import MessageInput from "../../Items/messageInput"
import { onChangeAdd} from "../../../state/actions/form"
import { closeMessage, deleteMessage, imageUploadStart, imageUploadEnd, deleteImg, buyMessageImageFree, buyMessageImage, sendMessage} from "../../../state/actions/messages"
import Modal from "../../Items/modal"
import { ButtonDark, ButtonPrimary } from "../../Items/buttons"
import firebase from '../../../firebase';
// import ScrollToBottom from 'react-scroll-to-bottom';
import {userId_S} from "../../../Settings"

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const MessageBox = (props) => {
    const dispatch = useDispatch();
    const { messagesList, messagesData, userData, message, coins, messages } = useSelector(
        (state) => ({
            userData: state.auth.userData,
            coins: state.generalDataReducer.coins,
            messagesList: state.messages && state.messages.active && state.messages.active.list ? state.messages.active.list : [],
            messagesData: state.messages && state.messages.active ? state.messages.active.data : "",
            messages: state.messages,
            message: state.form.message,
        }), shallowEqual
    );

    const [modal_Image, modal_ImageStatus] = useState("");
    const [modal_1, modal_1Status] = useState("");
    const [modal_2, modal_2Status] = useState("");
    const sendPhotoMessage = ""
    // const [sendPhotoMessage, sendPhotoMessageStatus] = useState("");
    const [emoji, emojiStatus] = useState("");

    useEffect(() => {
        const clickEvent = (evt) => {
            const flyoutElement = document.getElementById("emoji");
            let targetElement = evt.target;
            do {
                if (targetElement === flyoutElement || targetElement === document.getElementById("emojiBtn")) {
                    return;
                }
                targetElement = targetElement.parentNode;
            } while (targetElement);
            emojiStatus("")
        }
        window.addEventListener('click', clickEvent);

        // cleanup this component
        return () => {
            window.removeEventListener('click', clickEvent);
        };

        // eslint-disable-next-line
    }, [dispatch]);

    if (!messagesData) {
        return null
    }
    let secondUserId = messagesData.to[0]
    if (secondUserId === userData.docId) {
        secondUserId = messagesData.to[1]
    }
    return (
        <div id="messageBox" className={classnames(styles.messageBox, props.id ? styles.messagesPage : "")}>
            <header className={classnames(styles.header, messagesData.newMessages > 0 && "active")}>
                <NavLink to={{ pathname: "/users/" + userId_S(secondUserId) }} className={styles.avatar} style={{ backgroundImage: "url(" + messagesData.avatar + ")" }}>
                    <div className={styles.overlay}><i className="fi flaticon-magnifying-search-lenses-tool"></i></div>
                </NavLink>
                <b className={styles.nickname}>
                    <NavLink to={{ pathname: "/users/" + userId_S(secondUserId) }}>
                        {messagesData.nickname}
                    </NavLink> 
                </b>
                <div className={styles.delete} onClick={(e) => modal_1Status("active")}>
                    <i className="fi flaticon-trash-1"></i>
                </div>
                <div className={styles.close} onClick={(e) => dispatch(closeMessage())}>
                    <i className="fi flaticon-close"></i>
                </div>
            </header>
            <div className={styles.messageContent} id="message">
                {messagesList.length === 50 ? <div style={{ width: "100%", textAlign: "center" }}>
                    <button style={{ border: 0, background: "rgb(243, 168, 86)", margin: "auto", color: "#fff", fontWeight: 600, padding: "8px 12px", borderRadius: 50, fontSize: 12, marginBottom: 20 }}>Weitere Nachrichten</button>
                </div> : ""}
                <ul>
                    {messagesList.map((post, index) => {
                        if (post.image) {
                            return <li key={index} style={{ marginBottom: "10px" }}>
                                <div className={post.post === userData.docId ? styles.messageRight : styles.messageLeft}>
                                    {post.post !== userData.docId && <NavLink to={{ pathname: "/users/" + userId_S(secondUserId) }} className={styles.avatar} style={{ backgroundImage: "url(" + messagesData.avatar + ")" }}>
                                        <div className={styles.overlay}><i className="fi flaticon-magnifying-search-lenses-tool"></i></div>
                                    </NavLink>}
                                    <p className={post.post === userData.docId ? styles.post : styles.get}>
                                        {post.buy !== true && post.post !== userData.docId ? 
                                        <span className={styles.blur}>
                                             <button className={styles.buyBtnActive} onClick={(e) => modal_2Status(post.i)}>Buy Image ({coins.messagePhotoCoin} Coin)</button>
                                            {/* {userData.vip_free_image ? <button className={styles.buyBtnActive} onClick={(e) => dispatch(buyMessageImageFree(post.i))}>kostenlos für VIP</button>
                                                : 
                                            <button className={styles.buyBtnActive} onClick={(e) => modal_2Status(post.i)}>Buy Image ({coins.messagePhotoCoin} Coin)</button>} */}
                                        </span>
                                            : 
                                        <img src={post.image} onClick={(e) => modal_ImageStatus(post.image)}style={{ minWidth: "150px", maxHeight: "350px", cursor: "pointer" }} alt="" />}
                                        <br />
                                        {post.message}
                                        <small className={styles.time}>{post.time ? timeAgo.format(new Date(post.time.seconds * 1000), 'twitter') : ""}</small>
                                    </p>
                                </div>
                            </li>
                        }
                        return <li key={index} style={{ marginBottom: "10px" }}>
                            <div className={post.post === userData.docId ? styles.messageRight : styles.messageLeft}>
                                {post.post !== userData.docId && <NavLink to={{ pathname: "/users/" + userId_S(secondUserId) }} className={styles.avatar} style={{ backgroundImage: "url(" + messagesData.avatar + ")" }}>
                                    <div className={styles.overlay}><i className="fi flaticon-magnifying-search-lenses-tool"></i></div>
                                </NavLink>}
                                <p className={post.post === userData.docId ? styles.post : styles.get}>
                                    {post.message}
                                    <small className={styles.time}>{post.time ? timeAgo.format(new Date(post.time.seconds * 1000), 'twitter') : ""}</small>
                                </p>

                            </div>
                        </li>
                    })}
                </ul>
            </div>
            <footer className={styles.footer}>
                {messages && messages.sendImage ? <div className={styles.sendingImageGeneral}>
                    <img src={messages.sendImage} alt="" />
                    <div className={styles.deleteMsg} onClick={(e) => dispatch(deleteImg())} >
                        <i className="fi flaticon-close"></i>
                    </div>
                </div> : ""}
                
                {message || (messages && messages.sendImage) ? <div style={{ justifyContent: "space-between", width: "100%" }}>
                    <div className={styles.coin}><span id="coin">{messages.sendImage ? coins.messagePhotoCoin : message.length > 300 ? coins.messageCoin * 2 : coins.messageCoin }</span> coins</div>
                </div> : ""}
                
                <div className={styles.messageGeneral}>
                    <div className={styles.icons}>
                        <div className={styles.icon}>
                            <FileUploader
                                name="photoMessage"
                                className="fileUploadInput"
                                accept="image/*"
                                randomizeFilename
                                storageRef={firebase.storage().ref("images/" + userData.docId + "/send")}
                                onUploadStart={(e) => dispatch(imageUploadStart(e.size))}
                                onUploadSuccess={(e) => dispatch(imageUploadEnd(e))}
                            />
                            <i className="fi flaticon-image"></i>
                        </div>
                    </div>
                    <div className={styles.inputContent}>
                        <i className="fi flaticon-smile cursor-pointer" id="emojiBtn" onClick={(e) => emojiStatus("true")}></i>
                        <MessageInput id="messageInput" name="message" styletype="type_2" type="text" label="" placeholder={sendPhotoMessage} />
                    </div>
                    <button className={styles.button} onClick={(e) => dispatch(sendMessage())}>
                        <i className="fi flaticon-send-1"></i>
                    </button>
                </div>
            </footer>
            {emoji && <div id="emoji">
                <Picker set='facebook' onSelect={(e) => dispatch(onChangeAdd("message", e.native))} />
            </div>}
            <Modal title="Photo" content={<img src={modal_Image} alt="" />} status={modal_Image} width={700} close={(e) => modal_ImageStatus("")} />
            <Modal title="Hinweis!" content="Möchten Sie die Nachricht wirklich löschen?" buttons={<div><ButtonDark onClick={(e) => modal_1Status("")} style={{ flex: 1 }} text="Nein" /><ButtonPrimary onClick={(e) => { modal_1Status(""); dispatch(deleteMessage()) }} style={{ flex: 1 }} text="Ja" /></div>} status={modal_1} width={500} close={(e) => modal_1Status("")} />
            <Modal title="Hinweis!" content="Du verfügst nicht über genügend Coins." buttons={<div><ButtonDark onClick={(e) => modal_2Status("")} style={{ flex: 1 }} text="Nein" /><ButtonPrimary onClick={(e) => { dispatch(buyMessageImage(modal_2)); modal_2Status("") }} style={{ flex: 1 }} text={"Buy (" + coins.messagePhotoCoin+" Coin)"} /></div>} status={modal_2} width={500} close={(e) => modal_2Status("")} />
        </div>)
    }
export default MessageBox;
