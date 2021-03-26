import React from 'react';
import styles from './Main.module.scss';
import classNames from 'classnames';
import CloseIcon from "../../assets/img/icons/closeWhite.svg"
const Modal = (props) => {
    if(props){
        return (
            <div className={classNames(styles.modal, styles.active, props.type ? styles[props.type] : "")}>
                <div className={styles.content} style={{width:props.width}}>
                    {props.title ? <div className={styles.title}>
                        <h3>{props.title}</h3>
                    </div> : ""}
                    {props.close ? <div className={styles.close} style={props.closeColor && { backgroundColor: props.closeColor }}  onClick={(ee) => {props.close(); document.body.style.overflowY = "auto"}}>
                        <img src={CloseIcon} alt="" />
                    </div> : ""}
                    <div className={styles.padding} style={props.padding || props.padding === 0 ? {padding:props.padding, height:"100%"} : {padding:20}}>
                        {props.content}
                    </div>
                    <div className={styles.footer}>
                        {props.buttons}
                    </div>
                </div>
                {props.close ? <div className={styles.bg} onClick={(ee) => { props.close(); document.body.style.overflowY = "auto"}}></div>
                :
                <div className={styles.bg}></div>}
            </div>
        );
    }else{
        return null
    }
};

export default Modal;