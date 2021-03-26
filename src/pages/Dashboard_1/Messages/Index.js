import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import styles from './Footer.module.scss';
import MessagesList from '../../../components/Layout/MessagesList/MessagesList_2';
import MessageBox from '../../../components/Layout/MessageBox/MessageBox';
import { openMessage } from "../../../state/actions/messages"

const Messages = (props) => {
    const dispatch = useDispatch();
    const { messagesList, active } = useSelector(
        (state) => ({
            messagesList: state.messages.list ? state.messages.list : [],
            active: state.messages.active ? state.messages.active : [],
        }), shallowEqual
    );
    useEffect(() => {
        if (window.innerWidth > 991){
            if (messagesList[0] && !active.length) {
                dispatch(openMessage(messagesList[0]))
            }
        }
        // eslint-disable-next-line
    }, [dispatch]);

    return (
        <div style={{display: 'flex', width: '100%'}}>
            <MessagesList id="messages" />
            <MessageBox id="messages" />
        </div>)
}
export default Messages;
