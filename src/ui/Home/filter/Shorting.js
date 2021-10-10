import React, {useState} from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styles from './Style.module.scss';
import {onChange} from "../../../state/actions/form"
import Check from "../../../assets/img/icons/check.svg"
import {filterSorting} from "../../../Settings"
const Shorting = () => {
  const {form} = useSelector(
    (state) => ({ 
      form: state.form,
    }), shallowEqual
  );
  const dispatch = useDispatch();
  return (
    <div className={styles.shorting}>
        <div className={styles.title}>
            Shorting
        </div>
        <div className={styles.filterBox}>
            <ul>
                {filterSorting.map((doc, index) => <li key={index}>
                    <input id={"shorting_"+index} type="radio" name="shorting" 
                    value={doc.value} 
                    className={styles.radioCustom}
                    checked={form.shorting === doc.value} 
                    onChange={(e) => dispatch(onChange("shorting", e.target.value))} />
                    <label htmlFor={"shorting_"+index} className={styles.radioCustomLabel}>
                        <div className={styles.icon}><img src={Check} /></div>
                        <span>{doc.name}</span>
                    </label>
                </li>)}
            </ul>
        </div>
    </div>
  );
};

export default Shorting;
