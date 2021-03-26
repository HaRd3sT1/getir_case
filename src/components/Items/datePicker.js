import React, { useEffect } from 'react';
import { onChange } from '../../state/actions/form';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Form.module.scss';
import classNames from 'classnames';
import moment from 'moment';
let date = moment(new Date(new Date().setFullYear(new Date().getFullYear()-18))).format('YYYY-MM-DD')
let eighteenYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear()-18))
const Input = (props) => {
    const dispatch = useDispatch();
    const { form } = useSelector(
        (state) => ({
            form: state.form
        }), shallowEqual
    );
    useEffect(() => {
        if (!form.birthDate){
            dispatch(onChange(props.name, eighteenYearsAgo))
        }
        // eslint-disable-next-line
    }, [dispatch]);

    let _type = props.styletype === "type_2" ? styles.type_2 : props.styletype === "type_3" ? styles.type_3 :  props.styletype === "type_4" ? styles.type_4 :  props.styletype === "type_5" ? styles.type_5 : ""
    return(<div>    
        <div className={classNames(styles.formGroup, styles.active, _type)}> 
            <input type="date" id="start" name="trip-start" value={form.birthDate && moment(new Date(form.birthDate)).format('YYYY-MM-DD')}  max={date} required onChange={(e) => dispatch(onChange(props.name, e.target.value))}></input>
            <label className={styles.label}>{props.label}</label> 
        </div>
    </div> )
}
export default Input;