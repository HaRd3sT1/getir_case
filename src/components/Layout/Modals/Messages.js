import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import styles from './Styles.module.scss';
import { ButtonDark, ButtonSuccess } from "../../Items/buttons"
import { setMessageOpen, cleanError } from "../../../state/actions/messages"
import Modal from "../../Items/modal"
import {useIntl} from 'react-intl';
import { useHistory } from "react-router-dom";
import MessagesList from '../MessagesList/MessagesList_2';
import MessageBox from '../MessageBox/MessageBox_2';
import UsersIcon from "../../../assets/img/icons/users.svg"
import MessagesIcon from "../../../assets/img/icons/messages.svg"

const Header_3 = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const history = useHistory();

    const { messages } = useSelector(
        (state) => ({
            messages: state.messages,
        }), shallowEqual
    );
    const routeChange2 = () => {
        let path = `/premium`;
        history.push(path);
    }
    useEffect(() => {
        if(messages.status){
            document.body.style.overflowY = "hidden";
        }else{
            document.body.style.overflowY = "auto";
        }
        // eslint-disable-next-line
    }, [messages.status]);
    return (<div className={styles.modalsMessage}>
        <div style={{position: "relative",zIndex: "1000"}}>
            {messages.error ? <Modal
                title={intl.formatMessage({id:"General.basarisizOldu"})}
                content={messages.error.message}
                status={messages.error.type}
                width={400}
                buttons={messages.error.type === "coin" && <div><ButtonDark onClick={(e) => dispatch(cleanError())} style={{ flex: 1, borderRadius:10, height:50 }} text="schließen" /><ButtonSuccess onClick={(e) => { dispatch(cleanError()); routeChange2() }} style={{ borderRadius:10, height:50, flex: 1, marginTop:0 }} text="CREDITS" /></div>}
                close={(e) => dispatch(cleanError())} /> : ""}
        </div>
        {messages.status ?
        <Modal
        title=""
        type="messageModal"
        status={messages.status}
        width={800}
        padding={0}
        closeColor="#dc3545"
        close={(e) => dispatch(setMessageOpen(false))} 
        content={<div style={{height:"100%", display: "flex", flexDirection: "column"}}>
            <div style={{ backgroundColor: "#dc3545", borderTopLeftRadius:3, color: "#fff", padding:12, paddingLeft:16, fontSize:16, fontWeight:"bold"}}>
                {intl.formatMessage({id:"General.mesajlar"})}
            </div>
            {(window.innerWidth < 991) && messages.status >= 0 ? <div className={styles.messagesHeader}>
                <div className={messages.status === 1 ? styles.active : ""} onClick={(e) => dispatch(setMessageOpen(1))}>
                    <img src={UsersIcon} style={{width:20, height:20}} alt="" />
                    Chat
                </div>
                <div className={messages.status === 2 ? styles.active : ""} onClick={(e) => dispatch(setMessageOpen(2))}>
                <img src={MessagesIcon} style={{width:20, height:20}} alt="" />
                {intl.formatMessage({id:"General.mesajlar"})}
                </div>
            </div> : ""}
            <div className={classNames(messages.status === 2 ? styles.active : "", styles.messagesContent)} style={{ display: "flex" }}>
                <MessagesList id="messages" />
                <MessageBox id="messages" />
            </div>
        </div>}/> : ""}
    </div>)
}
export default Header_3;
