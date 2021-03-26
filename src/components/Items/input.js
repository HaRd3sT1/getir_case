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
    let _class = !props.icon ? styles.noIcon: ""
    let _active = props.active ? styles.active: ""
    let _type = props.styletype === "type_2" ? styles.type_2 : props.styletype === "type_3" ? styles.type_3 :  props.styletype === "type_4" ? styles.type_4 :  props.styletype === "type_5" ? styles.type_5 : ""
    return (<div className={classNames(styles.formGroup, _active, _class, _type)} style={props.style}>    
        <input type={props.type} placeholder={props.placeholder} required onChange={props.formchange ? (e) => { dispatch(onChange(props.name, e.target.value)); props.formchange && props.formchange()} : (e) => dispatch(onChange(props.name, e.target.value))} value={form[props.name]} {...props} /> 
        {props.label && <label className={styles.label}>{props.label}</label> }
        {/* {props.icon}   */}
        
        
    </div> )
}
export default Input;