import React from 'react';
import { onChange } from '../../state/actions/form';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Form.module.scss';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

const Gender = (props) => {
    const dispatch = useDispatch();
    const { form } = useSelector(
        (state) => ({
            form: state.form
        }), shallowEqual
    );
    let _type = props.styletype === "type_2" ? styles.type_2 : props.styletype === "type_3" ? styles.type_3 :  props.styletype === "type_4" ? styles.type_4 : ""
    return(<div  className={classNames(styles.formGroup, styles.active, styles.type_radio, _type)} {...props}>    
        <div>
            {form[props.name] === "1" || form[props.name] === 1 ? 
            <input type="radio" id="gender_1" name={props.name} required onChange={(e) => dispatch(onChange(props.name, e.target.value))} value={1} checked {...props} />  :
            <input type="radio" id="gender_1" name={props.name} required onChange={(e) => dispatch(onChange(props.name, e.target.value))} value={1} {...props} />  
            }
            <label htmlFor="gender_1"><FormattedMessage id="General.kadin" /></label>
        </div>
        <div>
            {form[props.name] === "1" || form[props.name] === 1 ? 
            <input type="radio" id="gender_2" name={props.name} required onChange={(e) => dispatch(onChange(props.name, e.target.value))} value={0} {...props} />  :
            <input type="radio" id="gender_2" name={props.name} required onChange={(e) => dispatch(onChange(props.name, e.target.value))} value={0} {...props} checked />  
            }
            <label htmlFor="gender_2"><FormattedMessage id="General.erkek" /></label>
        </div>
        <span className={classNames(form[props.name] === "1" || form[props.name] === 1 ? styles.activeBg : "", styles.bg)}></span>
        {/* {props.icon}   */}
        {/* <label className={styles.label}>{props.label}</label> */}
    </div> )
}
export default Gender;