import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory, useLocation} from "react-router-dom";
import styles from './Styles.module.scss';
import paypal from '../../../assets/img/paypal.png';
import visa from '../../../assets/img/visa.png';
import sofort from '../../../assets/img/sofort.png';
import paysafecard from '../../../assets/img/paysafecard.png';
import vorkasse from '../../../assets/img/vorkasse.png';
import classnames from 'classnames'
import { ButtonPrimary} from "../../../components/Items/buttons"
import { paymentSubmit} from "../../../state/actions/payment"

const Step2 = (props) => {
    const dispatch = useDispatch();
    const [payText, setpayText] = useState("")
    const [payTitle, setpayTitle] = useState("")
    const [payTitle2, setpayTitle2] = useState("")
    const [pay, setpay] = useState("")
    const [payType, setpayType] = useState("paypal")
    const [payType2, setpayType2] = useState("paypal")
    const [reloadPayment, setreloadPayment] = useState(false)
    const payList = [
        { title: "Paypal", img: paypal, value: "paypal" },
        { title: "Kreditkarte", img: visa, value: "creditcard" },
        { title: "Sofort-Überweisung", img: sofort, value: "directbanking" },
        { title: "Paysafecard", img: paysafecard, value: "paysafecard" },
        { title: "Vorkasse", img: vorkasse, value: "prepayment" },
    ]
    const history = useHistory();
    let location = useLocation();
    useEffect(() => {
        if (location && location.state && location.state.payText) {
            setpayText(location.state.payText)
            setpayTitle(location.state.payTitle)
            setpayTitle2(location.state.payTitle2)
            setpay(location.state.pay)
        }else{
            history.push("/premium");
        }
        // eslint-disable-next-line
    }, [dispatch]);

    const handleChange = (e) => {
        if (e === "directbanking") {
            setpayType2("sofort")
        } else if (e === "prepayment") {
            setpayType2("prepay")
        } else {
            setpayType2(e)
        }
        setpayType(e)
    }

    return (
        <div id="premium" className={classnames(styles.container, styles.step2)}>
            <div className={styles.list}>
                <div className={styles.active}>
                    1
                </div>
                <div className={styles.active}>
                    2
                </div>
                <div>
                    3
                </div>
            </div>

            {reloadPayment && <div id="reloadPayment" className={styles.reloadPayment}>
                <b>Umleiten... bitte warten.</b>
            </div>}
            {!reloadPayment && payList.map((doc, index) => {
                return (
                    <div key={index} className={classnames(styles.box, payType === doc.value && styles.active)} onClick={(e) => handleChange(doc.value)}>
                        <div className={styles.boxCoinP}>
                            <div className={styles.checkbox}>
                                <i className="flaticon-done-tick fi"></i>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <h4>{doc.title}</h4>
                            <b className={styles.boxPayB}>
                                <img style={{ height: 26 }} src={doc.img} alt="" />
                            </b>
                        </div>
                    </div>)
            })}
            {!reloadPayment && <p>Mit "Bezahlung Abschließen" gelten unsere Nutzungsbedinungen und Datenschutzbestimmung. Hiermit teilen wir mit, dass kein Abo abgeschlossen wird!</p>}
            {!reloadPayment && <ButtonPrimary text="BEZAHLUNG ABSCHLIEBEN" onClick={(e) => dispatch(paymentSubmit(payType, payTitle, pay, payText, payType2, payTitle2, setreloadPayment))} style={{ borderRadius: 10 }} />}
            <br />
            {!reloadPayment && <small>%100 sicher durch SSL-Verschlüsselung</small>}
        </div>)
}
export default Step2;
