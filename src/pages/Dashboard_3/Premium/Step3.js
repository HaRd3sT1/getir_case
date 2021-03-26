import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Styles.module.scss';
import classnames from 'classnames'
import {onChange} from "../../../state/actions/form"
import {useIntl} from 'react-intl';

const Step2 = (props) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const [payMessage, setpayMessage] = useState("")
    const [payclass, setpayclass] = useState("")
    useEffect(() => {
        var __url_string = window.location.href;
        var __url = new URL(__url_string);
        console.log(__url.searchParams.get("function"))
        if (__url.searchParams.get("function")) {
            var __function = __url.searchParams.get("function");
            if (__function === "billing") {
                setpayMessage(intl.formatMessage({id:"Premium.odemeBasarili"}))
                setpayclass("success")
            } else {
                setpayMessage(__function)
                setpayclass("danger")
            }
        } else {
            dispatch(onChange("paymentError", true))
            setpayMessage("Error")
            setpayclass("danger")
        }
    }, [dispatch]);


    return (
        <div id="premium" className={classnames(styles.container, styles.step3)}>
 {/* className={"alert alert-" + this.state.payclass} */}
            {payMessage && <div className={"alert alert-" + payclass} >{payMessage}</div>}
        </div>)
}
export default Step2;
