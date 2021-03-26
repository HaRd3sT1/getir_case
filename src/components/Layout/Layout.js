import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Index.module.scss';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import Header from './Header/Header';
import PrizeBox from './PrizeBox/PrizeBox';
import LastUsers from './LastUsers/LastUsers';
import Notices from './Notices/Notices';
import Footer from './Footer/Footer';
import Match from './Match/Match';
import Faq from './Faq/Index';
import MessagesList from './MessagesList/MessagesList';
import ActiveMessagesList from './ActiveMessagesList/ActiveMessagesList';
import MessageBox from './MessageBox/MessageBox';
import { cleanError, openMessage, messagesListData } from "../../state/actions/messages"
import { cleanErrorDash, matchPopupData, matchPopupReset } from "../../state/actions/dashboard"
import { favsData, favsDataReset } from "../../state/actions/favs"
// import { logsUpdate } from "../../state/actions/logs"
import { ButtonDark, ButtonPrimary } from "../Items/buttons"
import Modal from "../Items/modal"
import MatchAlert from "../Items/matchAlert"
import classNames from 'classnames';

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    let location = useLocation();
    const { userData, messageActive, error, error2, favUsers, matchPopup } = useSelector(
        (state) => ({
            userData: state.auth.userData,
            error: state.messages.error,
            error2: state.dashboard.error,
            messageActive: state.messages.active ? state.messages.active : "",
            favUsers: state.favs.users ? state.favs.users : "",
            matchPopup: state.dashboard.matchPopup,
        }), shallowEqual
    );
    const [asideMobileActive, setAsideMobileActive] = useState(false);


    const closeMatch = () => {
        dispatch(matchPopupReset())
    }
    const handleMobileToggle = () => {
        document.documentElement.classList.toggle('has-aside-mobile-expanded');
        setAsideMobileActive(!asideMobileActive);
    };
    const history = useHistory();

    const routeChange = () => {
        let path = `/premium`;
        history.push(path);
    }
    // openMessage
    useEffect(() => {
        dispatch(messagesListData(300))
        dispatch(favsData(300))
        if (messageActive.data){
            dispatch(openMessage(messageActive.data))
        }
        if (favUsers && favUsers.length > 120) {
            dispatch(favsDataReset(12))
        }

        dispatch(matchPopupData())
        // dispatch(logsUpdate())
        // dispatch(searchDataReset())
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <div style={{ backgroundColor:"#f0f2f5", minHeight:"100vh"}}>
            <Header
                handleMobileToggle={handleMobileToggle}
                asideMobileActive={asideMobileActive}
            />
            <div className={classNames(styles.general, location.pathname === "/premium" || location.pathname === "/step2" ? styles.type_2 : "")}>
                {location.pathname === "/premium" || location.pathname === "/step2" ? <div className={classNames(styles.left)}>
                    <Faq />    
                </div> : ""}
                <div className={styles.left}>
                    {location.pathname === "/dashboard" && window.innerWidth > 991 ? <PrizeBox /> : ""}
                    {location.pathname === "/dashboard" && window.innerWidth > 991 ? <div className={styles.padding}>
                        <div className={styles.hr}></div>
                    </div> : ""}
                    {location.pathname === "/dashboard" && userData.notices && userData.notices.length ? <Notices /> : ""}
                    {location.pathname === "/dashboard" && userData.notices && userData.notices.length ? <div className={styles.padding}>
                        <div className={styles.hr}></div>
                    </div> : ""}

                    {location.pathname === "/dashboard" && window.innerWidth < 991 ? <Match /> : ""}
                    {/* {location.pathname === "/dashboard" && window.innerWidth < 991 ? <div className={styles.padding}>
                        <div className={styles.hr}></div>
                    </div> : ""} */}
                    {location.pathname === "/dashboard" && window.innerWidth > 991 ? <LastUsers /> :""}
                    {location.pathname === "/dashboard" && window.innerWidth > 991 ? <Footer /> : ""}
                </div>
                <div className={location.pathname === "/dashboard" ? styles.content : styles.content100}>{children}</div>
                {location.pathname === "/dashboard" && <div className={styles.right}>
                    {window.innerWidth > 991 ? <Match /> : ""}
                    {window.innerWidth > 991 ? <MessagesList /> : ""}
                </div>}
            </div>
            {location.pathname !== "/messages" && <ActiveMessagesList />}
            {location.pathname !== "/messages" && <MessageBox />}
            <Modal 
            title="Error" 
            content={error} 
            status={error} 
            width={400} 
                buttons={error === "Du hast nicht genügend Coins" && <div><ButtonDark onClick={(e) => dispatch(cleanError())} style={{ flex: 1 }} text="schließen" /><ButtonPrimary onClick={(e) => { dispatch(cleanError()); routeChange() }} 
                    style={{ flex: 1 }} text="Premium" /></div>}  
            close={(e) => dispatch(cleanError())} />
            <Modal 
            title="Error" 
            content={error2} 
            status={error2} 
            width={400}   
            close={(e) => dispatch(cleanErrorDash())} />
            <Modal title="MATCH" content={<MatchAlert close={(e) => closeMatch()} />} status={matchPopup && matchPopup.matchId ? "true" : ""} width={500} close={(e) => closeMatch()} />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
