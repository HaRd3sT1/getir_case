import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Styles.module.scss';
import classnames from 'classnames'

const Step2 = (props) => {
    const dispatch = useDispatch();
    const [payMessage, setpayMessage] = useState("")
    const [payclass, setpayclass] = useState("")
    useEffect(() => {
        var __url_string = window.location.href;
        var __url = new URL(__url_string);
        if (__url.searchParams.get("function")) {
            var __function = __url.searchParams.get("function");
            if (__function === "billing") {
                setpayMessage("Bezahlung erfolgreich. bitte warte eine Weile.")
                setpayclass("success")
            } else {
                setpayMessage(__function)
                setpayclass("danger")
            }
        } else {
            setpayMessage("Error")
            setpayclass("danger")
        }
    }, [dispatch]);


    return (
        <div id="premium" className={classnames(styles.container, styles.step3)}>
            <div className={styles.list}>
                <div className={styles.active}>
                    1
                </div>
                <div className={styles.active}>
                    2
                </div>
                <div className={styles.active}>
                    3
                </div>
            </div>
 {/* className={"alert alert-" + this.state.payclass} */}
            {payMessage && <div className={"alert alert-" + payclass} >{payMessage}</div>}
        </div>)
}
export default Step2;
