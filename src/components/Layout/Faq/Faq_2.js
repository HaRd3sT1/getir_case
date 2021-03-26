import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import classnames from 'classnames';
import {FormattedMessage} from 'react-intl';

const Faq = (props) => {
    const { faq } = useSelector(
        (state) => ({
            faq: state.generalDataReducer.faq,
            // general: state.generalDataReducer.general
        }), shallowEqual
    );
    const [toggle, settoggle] = useState(0);
    const toggleFaq = (e) => {
        settoggle(e)
    }
    return (
        <div className={styles.faq_2}>
            <div className={styles.header}><h2><FormattedMessage id="General.SSS" /></h2></div>
            <div id="faq_1" className={classnames(styles.item, toggle === 0 && styles.active)} onClick={(e) => toggleFaq(0)}>
                <p>{faq.faqTitle1}</p>
                <small>{faq.faq1}</small>
            </div>
            <div id="faq_2" className={classnames(styles.item, toggle === 1 && styles.active)} onClick={(e) => toggleFaq(1)}>
                <p>{faq.faqTitle2}</p>
                <small>{faq.faq2}</small>
            </div>
            <div id="faq_3" className={classnames(styles.item, toggle === 2 && styles.active)} onClick={(e) => toggleFaq(2)}>
                <p>{faq.faqTitle3}</p>
                <small>{faq.faq3}</small>
            </div>
            <div id="faq_4" className={classnames(styles.item, toggle === 3 && styles.active)} onClick={(e) => toggleFaq(3)}>
                <p>{faq.faqTitle4}</p>
                <small>{faq.faq4}</small>
            </div>
        </div>)
}
export default Faq;


