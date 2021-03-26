import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './MessageBox_2.module.scss';
import classnames from 'classnames';
import axios from "axios";
import FileUploader from 'react-firebase-file-uploader';
import TimeAgo from 'javascript-time-ago'
import { NavLink } from 'react-router-dom';
import en from 'javascript-time-ago/locale/en'
import MessageInput from "../../Items/messageInput"
import Input from "../../Items/input"
import { onChange } from "../../../state/actions/form"
import {deleteMessage, imageUploadStart, imageUploadEnd, deleteImg, sendGif, sendMessage, openMessage, buyMessageImage } from "../../../state/actions/messages"
import Modal from "../../Items/modal"
import { ButtonDark, ButtonDanger, ButtonDanger2 } from "../../Items/buttons"
import firebase from '../../../firebase';
import Dots from "../../../assets/img/dot.png"
import {userId_S, defaultLogoIconLink, emojiList, TenorKey} from "../../../Settings"
import GiftsList from "../GiftList/GiftList"
import {FormattedMessage, useIntl} from 'react-intl';
import Gift3Icon from "../../../assets/img/icons/gift3.svg"
import GifIcon from "../../../assets/img/icons/gif.svg"
import PhotosDarkIcon from "../../../assets/img/icons/photoDark.svg"
import TrashIcon from "../../../assets/img/icons/trash.svg"
import SearchIcon from "../../../assets/img/icons/search.svg"
import SearchWhiteIcon from "../../../assets/img/icons/searchWhite.svg"
import CloseWhiteIcon from "../../../assets/img/icons/closeWhite.svg"
import TickIcon from "../../../assets/img/icons/tick.svg"
import SmileIcon from "../../../assets/img/icons/smile.svg"
import TickActiveIcon from "../../../assets/img/icons/tickActive.svg"
import CoinsIcon from "../../../assets/img/icons/coins.svg"

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const MessageBox = (props) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const { messageList,messagesList, userData, messages, form, users, gifts, messagesAdmin, coins } = useSelector(
        (state) => ({
            coins: state.generalDataReducer.coins ? state.generalDataReducer.coins : {},
            userData: state.auth.userData,
            messagesList: state.messagesList.list ? state.messagesList.list : [],
            messagesAdmin: state.messagesList.adminMessages ? state.messagesList.adminMessages : [],
            messageList: state.messages && state.messages.activeList ? state.messages.activeList : [],
            messages: state.messages,
            form: state.form,
            users: state.messagesUsers ? state.messagesUsers : [],
            gifts: state.generalDataReducer.gifts ? state.generalDataReducer.gifts : [],
        }), shallowEqual
    );

    const [activeMessagesList, activeMessagesListSet] = useState("");
    const [modal_Image, modal_ImageStatus] = useState("");
    const [gifModal, gifModalSet] = useState("");
    const [gifLimit, gifLimitSet] = useState(10);
    const [gifList, gifListSet] = useState([]);
    const [modal_1, modal_1Status] = useState("");
    const [giftModal, giftModalStatus] = useState("");
    // const [modal_2, modal_2Set] = useState("");
    // const [imageCoin, imageCoinSet] = useState(0);
    const sendPhotoMessage = ""

  
    const emojiSet = (emojiObject) => {
        let html = document.getElementById("messageTexarea").value
        document.getElementById("messageTexarea").value = html+emojiObject
    };


    // const modal_2Status = (status, coin) => {

    //     modal_2Set(status)
    //     imageCoinSet(coin)
    // };

    useEffect(() => {
        if(window.innerWidth > 991){
            if(messages.status === 1){
            }else{
                if(messagesList){
                    let index = messagesList.findIndex(x => x.id === form.activeMessage)
                    if(index !== -1){
                        dispatch(openMessage(messagesList[index].id))
                    }
                }
            }
        }
        // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {
        if(form.activeMessage === "admin"){
            if(messagesAdmin){
                var wrapper= document.createElement('div');
                wrapper.innerHTML= messagesAdmin.message;
                var div= wrapper;
                setTimeout(() => {
                    if(document.getElementById("messageText")){
                        document.getElementById("messageText").innerHTML = div.innerHTML
                    }
                }, 500);
                activeMessagesListSet({
                    userId: "Admin",
                    to:[userData.docId, "Admin"],
                    newMessages:0,
                    lastMessage:messagesAdmin.message,
                    admin:true,
                })
            }
        }else{

            if(messagesList){
                let index = messagesList.findIndex(x => x.id === form.activeMessage)
                if(index !== -1){
                    activeMessagesListSet(messagesList[index])
                }
                // console.log(div)
                // htmlObject.getElementById("myDiv").style.marginTop = something;
            }
        }
        // eslint-disable-next-line
    }, [form, messagesList]);

    useEffect(() => {
        if(document.getElementById("lastMessage")){
            let obj = document.getElementById("lastMessage")
            obj.scrollIntoView()
            setTimeout(() => {
                obj.scrollIntoView() 
            }, 500);
            setTimeout(() => {
                obj.scrollIntoView() 
            }, 1000);
        }
        // eslint-disable-next-line
    }, [messageList]);

    const getGif = (limit) => {
        let search = form.searchGif ? form.searchGif : ""
        if(gifLimit  !== limit){
            gifLimitSet(limit)
        }
        axios.get('https://g.tenor.com/v1/search?q='+search+'&key='+TenorKey+'&limit='+limit).then( (response) => {
            let arr = []
            response.data.results.forEach(doc=>{
                arr.push(doc.media[0].gif.url)
            })
            gifListSet(arr)
        }).catch( (error) => {
            console.log(error);
        })
    }
    const trendGif = (limit) => {
        if(gifList.length){
            return null
        }
        axios.get('https://g.tenor.com/v1/trending?key=P9JE6OTODLPU&limit='+limit).then( (response) => {
            let arr = []
            response.data.results.forEach(doc=>{
                arr.push(doc.media[0].gif.url)
            })
            gifListSet(arr)
        }).catch( (error) => {
            console.log(error);
        })
    }
    if (!activeMessagesList) {
        return null;

    }
    if(!users[activeMessagesList.userId] && form.activeMessage !== "admin"){
        return null
    }
    let secondUserId = activeMessagesList.to[0]
    if (secondUserId === userData.docId) {
        secondUserId = activeMessagesList.to[1]
    }
    let avatar = form.activeMessage === "admin" ? defaultLogoIconLink : users[activeMessagesList.userId].avatar
    let userLink = form.activeMessage === "admin" ? "/" : "/users/" + userId_S(secondUserId)
    const emojiStatus = (status) =>{
        if(status){
            document.getElementById("emoji").classList.add("open")
            document.getElementById("emojiBg").classList.add("open")
        }else{
            document.getElementById("emoji").classList.remove("open")
            document.getElementById("emojiBg").classList.remove("open")
        }
    }
    if(!coins.messageCoin && coins.messageCoin !== 0){
        return null
    }
    let sendingCoin = messages.sendImage ? coins.messagePhotoCoin : coins.messageCoin
    return (
        <div className={classnames(styles.messageBox_2, props.id ? styles.messagesPage : "")}>
            <header className={classnames(styles.header, activeMessagesList.newMessages > 0 && "active")} style={{ backgroundImage: "url(" + avatar + ")" }}>
                <div className={styles.content} style={{backgroundImage:"url("+Dots+")"}}>
                    <NavLink to={{ pathname: userLink }} className={styles.avatar} style={{ backgroundImage: "url(" + avatar + ")" }}>
                        <div className={styles.overlay}>
                            <img src={SearchWhiteIcon} style={{width:20}} alt="" />
                        </div>
                    </NavLink>
                    <div className={styles.text}>
                        <b className={styles.nickname}>
                            <NavLink to={{ pathname: userLink }}>
                                {form.activeMessage === "admin" ? activeMessagesList.userId : users[activeMessagesList.userId].nickname}
                            </NavLink>
                            {form.activeMessage !== "admin" ? <div className={classnames(styles.status, users[activeMessagesList.userId].online ? styles.online : styles.offline)}>
                                <div className={classnames("intro-banner-vdo-play-btn", "mr-1", users[activeMessagesList.userId].online ? "online" : "offline")}>
                                    <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
                                    <span className={classnames("ripple", users[activeMessagesList.userId].online ? "online" : "offline")}></span>
                                    <span className={classnames("ripple", users[activeMessagesList.userId].online ? "online" : "offline")}></span>
                                    <span className={classnames("ripple", users[activeMessagesList.userId].online ? "online" : "offline")}></span>
                                </div>
                                {users[activeMessagesList.userId].online ? "Online" : "Offline"}
                            </div> : ""}
                        </b>
                    </div>
                    {form.activeMessage !== "admin" ? <div className={styles.delete} onClick={(e) => giftModalStatus(true)}>
                        <img src={Gift3Icon} style={{width:22, height:22}} alt="" />
                    </div> : ""} 
                    {form.activeMessage !== "admin" ? <div className={styles.delete} onClick={(e) => modal_1Status("active")}>

                        <img src={TrashIcon} style={{width:22, height:22}} alt="" />
                    </div> : ""}
                </div>
            </header>
            <div className={styles.messageContent} id="message">
                {messageList.length === 50 ? <div style={{ width: "100%", textAlign: "center" }}>
                    <button style={{ border: 0, background: "rgb(243, 168, 86)", margin: "auto", color: "#fff", fontWeight: 600, padding: "8px 12px", borderRadius: 50, fontSize: 12, marginBottom: 20 }}><FormattedMessage id="General.digerMesajlar" /></button>
                </div> : ""}
                <ul id="messageListGeneral">
                    {messageList.map((post, index) => {
                        if (post.image) {
                            return <li id={messageList.length === (index+1) ? "lastMessage" : ""} key={index} className={post.post === userData.docId ? styles.messageRight : styles.messageLeft}>
                                {post.type === "gift" ? <div>
                                    <img src={gifts[gifts.findIndex(function(item, i){ return item.id === Number(post.image) })] ? gifts[gifts.findIndex(function(item, i){ return item.id === Number(post.image) })].img : ""} alt="gift" />
                                </div>: 
                                <div>
                                    <p className={post.post === userData.docId ? styles.post : styles.get}>
                                        {post.buy !== true && post.post !== userData.docId && post.coin ?
                                            <span className={styles.blur}>
                                                <button className={styles.buyBtnActive} onClick={(e) => dispatch(buyMessageImage(post.i, post.coin))}>Bild freischalten ({post.coin} Coin)</button>
                                            </span> :
                                            <img src={post.image} onClick={(e) => modal_ImageStatus(post.image)} style={{ minWidth: "150px", maxHeight: "350px", cursor: "pointer" }} alt="" />
                                        }
                                        <br />
                                        {post.message}
                                        <small className={styles.time}>{post.time ? timeAgo.format(new Date(post.time.seconds * 1000), 'twitter') : ""}</small>
                                    </p>
                                </div>}
                            </li>
                        }else if(post.type === "gif"){
                            return <li id={messageList.length ===  (index+1) ? "lastMessage" : ""} key={index} className={post.post === userData.docId ? styles.messageRight : styles.messageLeft}>
                                 <img src={post.message} alt="gif" />
                            </li>
                        }
                        return <li id={messageList.length ===  (index+1) ? "lastMessage" : ""} key={index} className={post.post === userData.docId ? styles.messageRight : styles.messageLeft}>
                            <div>
                                <p className={post.post === userData.docId ? styles.post : styles.get}>
                                    {form.activeMessage === "admin" ? <span id="messageText"></span> : post.message}
                                    <small className={styles.time}>
                                        {post.time ? timeAgo.format(new Date(post.time.seconds * 1000), 'twitter') : ""}
                                        {post.visible ?<img src={TickActiveIcon} alt="" /> : <img src={TickIcon} alt="" />}
                                    </small>
                                </p>

                            </div>
                        </li>
                    })}
                    {form.activeMessage === "admin" ? <li id="lastMessage" className={styles.messageLeft}>
                        <div>
                            <p className={styles.get}>
                                <span id="messageText"></span>
                            </p>

                        </div>
                    </li> : ""}
                </ul>
            </div>
            <footer className={styles.footer}>
                {activeMessagesList.cc ? <div className={styles.writing}>Schreiben<span></span></div> : ""}
                {messages && messages.sendImage ? <div className={styles.sendingImageGeneral}>
                    <img src={messages.sendImage} alt="" />
                    <div className={styles.deleteMsg} onClick={(e) => dispatch(deleteImg())} >
                        <img src={CloseWhiteIcon} style={{width:10}} alt="" />
                    </div>
                </div> : ""}
                {form.activeMessage !== "admin" ? <div className={styles.messageGeneral}>
                    <div>
                        <div className={styles.inputContent}>
                            <MessageInput id="messageInput" name="message" styletype="type_3" type="text" label="" placeholder={sendPhotoMessage} />
                        </div>
                        {sendingCoin ? <img src={CoinsIcon} style={{ width: 20, height: 20, marginLeft:10, marginRight:6 }} /> : ""}
                        {sendingCoin ? <div>
                            -{sendingCoin}
                        </div> : ""}
                    </div>
                    <div className={styles.icons}>
                        <ButtonDanger2 onClick={(e) => dispatch(sendMessage())} style={{height:34, width:80, borderRadius:5, textTransform:"none"}} text={intl.formatMessage({id:"General.gonder"})} />
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

                            <img src={PhotosDarkIcon} style={{width:16, height:16}} alt="" />
                        </div>
                        <div className={styles.icon}>
                            <img className="cursor-pointer" style={{width:18}} src={SmileIcon} onClick={(e) => emojiStatus("true")} alt="" />
                        </div>
                        <div className={styles.icon} onClick={(e) => {gifModalSet("true"); trendGif(10)}}>
                            <img src={GifIcon} alt="" />
                        </div>
                        <div className={styles.checkbox}>
                            <label>
                                <input type="checkbox" name="sendOnEnter" defaultChecked={form.sendOnEnter} onChange={(e) => { dispatch(onChange("sendOnEnter", e.target.checked))}}/>
                                <FormattedMessage id="General.enterTusuylaGonder" />
                            </label>
                        </div>
                        {gifModal ? <div className={styles.gifModal}>
                            <div className={styles.input}>
                                <Input style={{marginBottom:0}} name="searchGif" type="text" label="Suche gif..." />
                                <img src={SearchIcon} alt="" onClick={(e) => getGif(10)} />
                            </div>
                            <ul>
                                {gifList.map((doc, index)=>{
                                    return(<li key={index} onClick={(e) => dispatch(sendGif(doc, gifModalSet))}>
                                        <img src={doc} alt="" />
                                    </li>)
                                })}
                            </ul>
                            {gifList.length ? <span className={styles.load} onClick={(e) => getGif(gifLimit+10)}>Mehr laden</span> : ""}
                        </div> : ""}
                        {gifModal ? <div onClick={(e) => gifModalSet("")} className={styles.gifBg}></div> : ""}
                    </div>
                </div> : ""}
            </footer>


            {form.activeMessage !== "admin" && giftModal ? <Modal title={<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{width:44, height:44, borderRadius:44, marginRight:10, flex:"none",backgroundImage:"url("+users[activeMessagesList.userId].avatar+")"}}></div>{users[activeMessagesList.userId].nickname} <FormattedMessage id="General.seninHediyeleriniBekliyor" /></div>} content={<GiftsList fakeId={activeMessagesList.userId} close={giftModalStatus} />} status={giftModal} width={700} close={(e) => giftModalStatus("")} type="buyGift" /> : ""}


            <div id="emoji" className={styles.emoji}>
                <ul>
                    {emojiList.map((doc, index)=>{
                        return(<li key={index} onClick={(e) => emojiSet(doc)}>{doc}</li>)
                    })}
                </ul>
            </div>

            <div id="emojiBg" onClick={(e) => emojiStatus("")} className={styles.emojiBg}></div>
            {modal_Image ?<Modal title={<FormattedMessage id="General.fotograf" />} content={<img src={modal_Image} alt="" />} status={modal_Image} width={700} close={(e) => modal_ImageStatus("")} /> : ""}
            {modal_1 ? <Modal title={<FormattedMessage id="General.bilgi" />} content={<FormattedMessage id="General.mesajSilmeUyari" />} buttons={<div><ButtonDark onClick={(e) => modal_1Status("")} style={{ flex: 1, borderRadius:10, height:50 }} text={<FormattedMessage id="General.hayir" />} /><ButtonDanger onClick={(e) => { modal_1Status(""); dispatch(deleteMessage()) }} style={{ flex: 1, borderRadius:10, height:50 }} text={<FormattedMessage id="General.evet" />} /></div>} status={modal_1} width={500} close={(e) => modal_1Status("")} /> : ""}
            {/* {modal_2 ?<Modal title="Hinweis!" content="Möchtest du das Bild freischalten?" buttons={<div><ButtonDark onClick={(e) => modal_2Status("")}  style={{ flex: 1, borderRadius:10, height:50 }} text="NEIN" /><ButtonSuccess onClick={(e) => { dispatch(buyMessageImage(modal_2, imageCoin)); modal_2Status("") }} style={{ flex: 1, borderRadius:10, height:50, marginBottom:0, marginTop:0 }} text={"JA"} /></div>} status={modal_2} width={500} close={(e) => modal_2Status("")} /> : ""} */}
        </div>)
}
export default MessageBox;
