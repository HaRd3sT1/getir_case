import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Layout_3.module.scss';
import { useDispatch } from 'react-redux';
import { useLocation} from "react-router-dom";
import Header from './Header/Header_3';
import HeaderMobile from './Header/Header_mobile_3';
import LastUsers from './LastUsers/LastUsers_3';
import MobilMenu from './MobilMenu/Index';
import Footer from './Footer/Footer_3';
import {  messagesListData } from "../../state/actions/messagesList"
import { vipUsers } from "../../state/actions/dashboard"
import { getFriends } from "../../state/actions/friends"
import { onChange} from "../../state/actions/form"
import classNames from 'classnames';
import Coins from "../Items/coins"
import {Faq, giftsData} from '../../state/actions/general';

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
        return (
            <div style={{ backgroundColor: "#f6f6f6", minHeight: "100%" }}>
                <div className={classNames("container", styles.general)}>
                    <div className={styles.left}>
                        <Header />
                        <LastUsers />
                    </div>
                    <div className={classNames(styles.content)}>
                        {children}
                    </div>
                </div>
                <Footer />
                <Coins />
            </div>
        );
    }
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
