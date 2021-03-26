import React from 'react';
import { onChange, onChangeCountry, onChangeCity } from '../../state/actions/form';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Form.module.scss';
import classNames from 'classnames';
import {defaultCountry} from "../../Settings"
import {useFormatMessage} from "../../Hooks"

const Select = (props) => {
    const dispatch = useDispatch();
    const { form } = useSelector(
        (state) => ({
            form: state.form
        }), shallowEqual
    );
    let _bar = props.bar ? styles.nobar : ""
    let _class = !props.icon ? styles.noIcon : ""
    let _type = props.styletype === "type_2" ? styles.type_2 : props.styletype === "type_3" ? styles.type_3 :  props.styletype === "type_4" ? styles.type_4 :  props.styletype === "type_5" ? styles.type_5 : ""
    return (<div className={classNames(styles.formGroup, styles.active, _type, _class, _bar)} style={props.style}>    
        <select 
        onChange={
            defaultCountry === "tr" && props.name === "city" ? (e) => { 
                dispatch(onChangeCity(props.name, e.target.value)); props.formchange && props.formchange() 
            }:
            props.name === "country" || props.name === "searchCountry" || props.name === "formCountry" || props.name === "filterCountry" ? (e) => { 
                dispatch(onChangeCountry(props.name, e.target.value)); props.formchange && props.formchange() 
            } :
            (e) => { 
                dispatch(onChange(props.name, e.target.value)); props.formchange && props.formchange()}
            } 
        value={form[props.name]} 
         
        required={true}  {...props}>
            <option value="">{useFormatMessage('General.seciniz')}</option>
            {props.items ? props.items.map((doc,index)=>{
                return(
                    <option key={index} value={doc.value}>{doc.label}</option>
                )
            }) : ""}
        </select>
        {/* {formatMessage({ id: 'General.seciniz'})} */}
        {/* {props.icon} */}
        {props.label && <label className={styles.label}>{props.label}</label>}
    </div> )
}
export default Select;