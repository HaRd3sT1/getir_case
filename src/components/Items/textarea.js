import React from 'react';
import { onChange } from '../../state/actions/form';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import styles from './Form.module.scss';

const Input = (props) => {
    const dispatch = useDispatch();
    const { form } = useSelector(
        (state) => ({
            form: state.form
        }), shallowEqual
    );
    let _class = !props.icon ? styles.noIcon : ""
    let _active = props.active ? styles.active : ""
    let _dark = props.dark ? styles.dark : ""
    let _type = props.styletype === "type_2" ? styles.type_2 : props.styletype === "type_3" ? styles.type_3 :  props.styletype === "type_4" ? styles.type_4 : ""

    return (<div className={classNames(styles.formGroup,styles.textarea, _active, _type, _class, _dark)} {...props}>    
        <textarea required onChange={(e) => dispatch(onChange(props.name, e.target.value))} value={form[props.name]} maxLength={props.maxLength} /> 
        {/* {props.icon}   */}
        <label className={styles.label}>{props.label}</label> 
        {props.maxLength && form[props.name] ? <div className={styles.max}>{props.maxLength} / {props.maxLength - form[props.name].length}</div> : ""}
    </div> )
}
export default Input;