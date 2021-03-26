import React from 'react';
import { onChange } from '../../state/actions/form';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Coins.module.scss';
import {setCoin} from "../../state/actions/general"
import sadGif from "../../assets/img/sad.gif"
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import CloseIcon from "../../assets/img/icons/close.svg"

const Gender = (props) => {
    const dispatch = useDispatch();
    const { form, general, setCoinVal } = useSelector(
        (state) => ({
            form: state.form,
            general: state.generalDataReducer.general,
            setCoinVal: state.generalDataReducer.setCoin,
        }), shallowEqual
    );
    if(!setCoinVal && !form.paymentError){
        return null
    }

    return(<div {...props}>    
       <div className={classNames(styles.coin, form.paymentError ? styles.paymentError : "")} onClick={(e) => dispatch(setCoin(0))}>      
       <img src={CloseIcon} alt="" className={styles.close} style={{width:24, height:24}}  />
        {/* <CloseIcon className={styles.close} style={{width:24, height:24}} fill={"#eb4f42"} /> */}
        
                    
            {form.paymentError ? <div className={styles.bottomBadge}>
                {/* <b>Glückwunsch</b> */}
                <FormattedMessage id="General.odemeBasarisiz" />
            </div> :
            <div className={styles.bottomBadge}>
                {Number(setCoinVal) ? <div style={{display:"flex", flexDirection:"column"}}>
                    {Number(setCoinVal) > 30 ? <b><FormattedMessage id="General.tebrikler" /></b> : <b><FormattedMessage id="General.tebrikler" /></b>}
                    {Number(setCoinVal) > 30 ? <span><FormattedMessage id="General.iyiEglenceler" /></span> : <span><FormattedMessage id="General.bedavaCoinKazandin" /></span> }
                </div> : <div style={{display:"flex", flexDirection:"column"}}>
                    <b><FormattedMessage id="General.tebrikler" /></b>
                    <span><FormattedMessage id="General.VipIyiEglenceler" /></span>
                </div>}
            </div>  }   
            {form.paymentError ? <div className={styles.img}>
                <img src={sadGif} alt="" />
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>:        
            <div className={styles.front} id="coinJump">                                
                <div className={styles.star}></div>                                
                <span className={styles.creditsAmount}>{setCoinVal}</span>                                
                <div className={styles.shapes}>                                  
                    <div className={styles.shape_l}></div>                                  
                    <div className={styles.shape_r}></div>                                  
                    <span className={styles.top}>C</span>                                  
                    <span className={styles.bottom}>{general.title}</span>                                
                </div>                              
            </div>}                                                        
        </div>
        <div className={styles.coinBg} onClick={(e) => {dispatch(setCoin(0)); dispatch(onChange("paymentError", ""))}}>

        </div>
    </div> )
}
export default Gender;