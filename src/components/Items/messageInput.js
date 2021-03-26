import React from 'react';
// import { onChange } from '../../state/actions/form';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import styles from './Main.module.scss';
import { sendMessage } from "../../state/actions/messages"

const Input = (props) => {
    const dispatch = useDispatch();
    const { form } = useSelector(
        (state) => ({
            form: state.form
        }), shallowEqual
    );
    const auto_grow = (element) => {
        element.target.style.height = "5px";
        element.target.style.height = (element.target.scrollHeight) + "px";
    }
    const enter = (e) => {
        if (e.keyCode === 13 && form.sendOnEnter) {
            e.preventDefault()
            dispatch(sendMessage());
        }
    }
    let _class = !props.icon ? styles.noIcon : ""
    let _active = props.active ? styles.active : ""
    let _type = props.styletype === "type_2" ? styles.type_2 : props.styletype === "type_3" ? styles.type_3 : ""
    //  onChange={(e) => dispatch(onChange(props.name, e.target.value))}
    //  value={form[props.name]}
    return (<div className={classNames(styles.messageInput, _active, _class, _type)} {...props}>
        <textarea id="messageTexarea" onKeyDown={(e) => enter(e)} onInput={auto_grow} style={{height:20}} />
        {props.icon}
        <span className={styles.highlight}></span>
        <span className={styles.bar}></span>
        <label className={styles.label}>{props.label}</label>
    </div>)
}
export default Input;