// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styles from './Layout_2.module.scss';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { useHistory, useLocation } from "react-router-dom";
// import Header from './Header/Header_2';
// import PrizeBox from './PrizeBox/PrizeBox_2';
// // import LastUsers from './LastUsers/LastUsers';
// import Notices from './Notices/Notices';
// import Footer from './Footer/Footer_2';
// import SearchBar from './SearchBar/SearchBar';
// import MessagesList from './MessagesList/MessagesList_2';
// import MessageBox from './MessageBox/MessageBox_2';
// import { cleanError, openMessage, setMessageOpen, setMessageTab } from "../../state/actions/messages"
// import {  messagesListData } from "../../state/actions/messagesList"
// import { cleanErrorDash, matchPopupData, matchPopupReset } from "../../state/actions/dashboard"
// import { favsDataReset } from "../../state/actions/favs"
// import { onChange} from "../../state/actions/form"
// // import { logsUpdate } from "../../state/actions/logs"
// import { ButtonDark, ButtonSuccess } from "../Items/buttons"
// import Modal from "../Items/modal"
// import MatchAlert from "../Items/matchAlert"
// import classNames from 'classnames';
// import Coins from "../Items/coins"
// import {defaultTitle} from "../../Settings"
// import {useToasts } from 'react-toast-notifications'
// import UsersIcon from "../../assets/img/icons/users.svg"
// import MessagesIcon from "../../assets/img/icons/messages.svg"

// const Layout = ({ children }) => {
//     const dispatch = useDispatch();
//     const { addToast } = useToasts()
//     let location = useLocation();
//     const { userData, messageActive, error, error2, favUsers, matchPopup, messages } = useSelector(
//         (state) => ({
//             userData: state.auth.userData,
//             error: state.messages.error,
//             error2: state.dashboard.error,
//             messageActive: state.messages.active ? state.messages.active : "",
//             favUsers: state.favs.users ? state.favs.users : "",
//             matchPopup: state.dashboard.matchPopup,
//             messages: state.messages,
//         }), shallowEqual
//     );
//     const [asideMobileActive, setAsideMobileActive] = useState(false);
//     // const [messageTab, setMessageTab] = useState(0);

//     const closeMatch = () => {
//         dispatch(matchPopupReset())
//     }
//     const handleMobileToggle = () => {
//         document.documentElement.classList.toggle('has-aside-mobile-expanded');
//         setAsideMobileActive(!asideMobileActive);
//     };
//     const history = useHistory();

//     const routeChange = () => {
//         let path = `/premium`;
//         history.push(path);
//     }
//     // useEffect(() => {
//     //     setMessageTab(0)
//     //     // eslint-disable-next-line
//     // }, [messages.status]);
//     // openMessage
//     useEffect(() => {
//         dispatch(messagesListData(20))
//         dispatch(setMessageTab(0))
//         dispatch(onChange("searchNickname", ""))
//         // dispatch(favsData(20))
//         if (messageActive.data) {
//             if(window.innerWidth > 991){
//                 dispatch(openMessage(messageActive.data))
//             }
//             // setMessageTab(1)
//         }
//         if (favUsers && favUsers.length > 120) {
//            dispatch(favsDataReset(12))
//         }

//         dispatch(matchPopupData())
//         // dispatch(logsUpdate())
//         // dispatch(searchDataReset())
//         // eslint-disable-next-line
//     }, [dispatch]);
//     useEffect(() => {
//         if(error2 && error2.error){
//             if(error2.error !== "Du hast nicht genügend Coins"){
//                 addToast(error2.error, { appearance: error2.type, autoDismiss:error2.autoDismiss, autoDismissTimeout:8000 })
//                 setTimeout(() => {
//                     dispatch(cleanErrorDash())
//                 }, 100);
//             }
//         }
//         // eslint-disable-next-line
//     }, [error2]);
//     // openMessage
//     return (
//         <div style={{ backgroundColor: "#fff", minHeight: "100%" }}>
//             <Header
//                 handleMobileToggle={handleMobileToggle}
//                 asideMobileActive={asideMobileActive}
//             />
//             <div className={classNames(styles.general, location.pathname === "/dashboard" || location.pathname === "/step3" ? styles.general2 : "", location.pathname.includes("/users") ? styles.full : "", location.pathname === "/premium" || location.pathname === "/step2" ? styles.type_2 : "")}>
//                 {/* {location.pathname === "/premium" || location.pathname === "/step2" ? <div className={classNames(styles.left)}>
//                     <Faq />
//                 </div> : ""} */}
//                 <div className={styles.left}>
//                     {ifHome && window.innerWidth > 991 ? <PrizeBox /> : ""}
//                     {ifHome && userData.notices && userData.notices.length ? <Notices /> : ""}
//                     {/* {ifHome && window.innerWidth < 991 ? <Match /> : ""} */}
//                     {/* {ifHome && window.innerWidth < 991 ? <div className={styles.padding}>
//                         <div className={styles.hr}></div>
//                     </div> : ""} */}
//                     {ifHome && window.innerWidth > 991 ? 
//                     <div className="alert alert-success2" style={{flexDirection:"column", alignItems:"flex-start", maxWidth:320, marginTop:0}}>
//                         <b style={{marginBottom:10}}>Wichtige Informationen  zu COVID-19</b>
//                         <p style={{opacity:.7}}>{defaultTitle} unterstützt alle Empfehlungen der Bundesregierung im Kampf gegen die Pandemie mit dem neuartigen Coronavirus. Seien Sie weiterhin verantwortungsbewusst, auch beim Dating. Kontakte auf ein Minimum zu beschränken und nötigen Abstand zu halten sind nach wie vor wichtig im Kampf gegen den Erreger. {defaultTitle} bietet allen Mitgliedern eine sichere Plattform, um sich kennen zu lernen. #zusammengegencorona</p>
//                     </div>
//                     : ""}
//                     {location.pathname === "/search" ? <SearchBar /> : ""}
//                 </div>
//                 <div className={location.pathname === "/dashboard" || location.pathname === "/step3" ?  styles.content : styles.content100}>{children}</div>
                
//             </div>
//             <Footer />
//             <Modal
//                 title=""
//                 type="messageModal"
//                 content={<div style={{height:"100%", display: "flex", flexDirection: "column"}}>
//                     <div style={{ backgroundColor: "#dc3545", borderTopLeftRadius:10, color: "#fff", padding:12, paddingLeft:16, fontSize:16, fontWeight:"bold"}}>
//                         Posteingang
//                     </div>
//                     {window.innerWidth < 991 && messages.tab >= 0 ? <div className={styles.messagesHeader}>
//                         <div className={messages.tab === 0 ? styles.active : ""} onClick={(e) => dispatch(setMessageTab(0))}>
//                         <img src={UsersIcon} alt=""  style={{width:20, height:20}}/> Chats
//                         </div>
//                         <div className={messages.tab === 1 ? styles.active : ""} onClick={(e) => dispatch(setMessageTab(1))}>
//                          <img src={MessagesIcon} alt=""  style={{width:20, height:20}}/>  Nachrichten
//                         </div>
//                     </div> : ""}
//                     <div className={classNames(messages.tab === 1 ? styles.active : "", styles.messagesContent)} style={{ display: "flex" }}>
//                         <MessagesList />
//                         <MessageBox id="messages" />
//                     </div>
//                 </div>}
//                 status={messages.status}
//                 width={800}
//                 padding={0}
//                 closeColor="#dc3545"
//                 close={(e) => dispatch(setMessageOpen(false))} />
//             <Modal
//                 title={"Fehlgeschlagen"}
//                 content={error}
//                 status={error}
//                 width={400}
//                 buttons={error === "Du hast nicht genügend Coins" && <div><ButtonDark onClick={(e) => dispatch(cleanError())} style={{ flex: 1, borderRadius:10, height:50 }} text="schließen" /><ButtonSuccess onClick={(e) => { dispatch(cleanError()); routeChange() }}
//                     style={{ borderRadius:10, height:50, flex: 1, marginTop:0 }} text="Premium" /></div>}
//                 close={(e) => dispatch(cleanError())} />
//             <Modal
//                 title={"Fehlgeschlagen"}
//                 content={error2 ? error2.error : ""}
//                 status={error2 ? error2.error === "Du hast nicht genügend Coins" ? true : false : false}
//                 width={400}
//                 buttons={<div><ButtonDark onClick={(e) => dispatch(cleanErrorDash())} style={{ flex: 1, borderRadius:10, height:50 }} text="schließen" /><ButtonSuccess onClick={(e) => { dispatch(cleanErrorDash()); routeChange() }}
//                     style={{ borderRadius:10, height:50, flex: 1, marginTop:0 }} text="Premium" /></div>}
//                 close={(e) => dispatch(cleanErrorDash())} />
//             <Modal title="MATCH" content={<MatchAlert close={(e) => closeMatch()} />} status={matchPopup && matchPopup.matchId ? "true" : ""} width={500} close={(e) => closeMatch()} />

//             <Coins />
//         </div>
//     );
// };

// Layout.propTypes = {
//     children: PropTypes.node.isRequired
// };

// export default Layout;



import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Layout_2.module.scss';
import { useDispatch } from 'react-redux';
import { useLocation} from "react-router-dom";
import Header from './Header/Header_2';
import HeaderMobile from './Header/Header_mobile_3';
// import LastUsers from './LastUsers/LastUsers_2';
import PrizeBox from './PrizeBox/PrizeBox_2';
import MobilMenu from './MobilMenu/Index';
import Footer from './Footer/Footer_2';
import Notices from './Notices/Notices';
import {  messagesListData } from "../../state/actions/messagesList"
import { vipUsers } from "../../state/actions/dashboard"
import { getFriends } from "../../state/actions/friends"
import { onChange} from "../../state/actions/form"
import classNames from 'classnames';
import Coins from "../Items/coins"
import {Faq, giftsData} from '../../state/actions/general';
import {defaultTitle} from "../../Settings"
import SearchBar from './SearchBar/SearchBar';

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    let location = useLocation();
    useEffect(() => {
        dispatch(messagesListData(20))
        dispatch(vipUsers(20))
        dispatch(getFriends())
        dispatch(Faq())
        dispatch(giftsData())
        dispatch(onChange("searchNickname", ""))
        // dispatch(matchPopupData())
        // eslint-disable-next-line
    }, [dispatch]);
    // openMessage
    if((window.innerWidth < 991)){
        if(document.body.style.overflowY === "hidden" && location.pathname !== "/dashboard"){
           document.body.style.overflowY = "" 
        }
        return(
        <div className={styles.mobileLayout}>
            <div className={classNames("container", styles.general)}>
                    <HeaderMobile />
            </div>
            <div className={classNames(styles.content)}>
                {children}
            </div>
            <MobilMenu />
            <Coins />
        </div>)
    }else{
        let ifHome = location.pathname === "/dashboard" || location.pathname === "/step3" || location.pathname === "/online-users" || location.pathname === "/last-users"
        return (
            <div style={{ backgroundColor: "#fff", minHeight: "100%" }}>
                <Header />
                <div className={classNames(styles.general, ifHome ? styles.general2 : "", location.pathname.includes("/users") ? styles.full : "", location.pathname === "/premium" || location.pathname === "/step2" ? styles.type_2 : "")}>

                 <div className={styles.left}>
                     {ifHome && window.innerWidth > 991 ? <PrizeBox /> : ""}
                     {ifHome ? <Notices /> : ""}
                     {ifHome && window.innerWidth > 991 ? 
                     <div className="alert alert-success2" style={{flexDirection:"column", alignItems:"flex-start", maxWidth:320, marginTop:0}}>
                         <b style={{marginBottom:10}}>Wichtige Informationen  zu COVID-19</b>
                         <p style={{opacity:.7}}>{defaultTitle} unterstützt alle Empfehlungen der Bundesregierung im Kampf gegen die Pandemie mit dem neuartigen Coronavirus. Seien Sie weiterhin verantwortungsbewusst, auch beim Dating. Kontakte auf ein Minimum zu beschränken und nötigen Abstand zu halten sind nach wie vor wichtig im Kampf gegen den Erreger. {defaultTitle} bietet allen Mitgliedern eine sichere Plattform, um sich kennen zu lernen. #zusammengegencorona</p>
                     </div>
                     : ""}
                     {location.pathname === "/search" ? <SearchBar /> : ""}
                 </div>
                 <div className={location.pathname === "/dashboard" || location.pathname === "/step3" ?  styles.content : styles.content100}>{children}</div>
                
                </div>
                <Footer />
                {/* <div className={classNames("container", styles.general)}>
                    <div className={styles.left}>
                        <LastUsers />
                    </div>
                    <div className={classNames(styles.content)}>
                        {children}
                    </div>
                </div>
                <Coins /> */}
            </div>
        );
    }
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
