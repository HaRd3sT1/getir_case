import React, {useState} from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styles from './Style.module.scss';
import {onChange} from "../../../state/actions/form"
import Check from "../../../assets/img/icons/check_white.svg"
import { Scrollbars } from 'react-custom-scrollbars';
const Brands = ({tab}) => {
  const {form, brands} = useSelector(
    (state) => ({ 
      form: state.form,
      brands: state.product[tab+"_brands"] ? state.product[tab+"_brands"] : [],
    }), shallowEqual
  );
  const dispatch = useDispatch();
  return (
    <div className={styles.brands}>
        <div className={styles.title}>
            Brands
        </div>
        <div className={styles.filterBox}>
            <input type="text" name="search_brands" 
            value={form.search_brands} 
            className={styles.searchInput}
            placeholder="Search brand"
            onChange={(e) => dispatch(onChange("search_brands", e.target.value))} />
            <Scrollbars style={{ width: "100%", height: 140 }}>
                <ul>
                    <li>
                        <input id={"brands_all"} type="checkbox" name="brands" 
                        value={null} 
                        className={styles.checkboxCustom}
                        checked={!form.brands} 
                        onChange={(e) => dispatch(onChange("brands", 0))} />
                        <label htmlFor={"brands_all"} className={styles.checkboxCustomLabel}>
                            <div className={styles.icon}><img src={Check} /></div>
                            <span>All <small>({brands.reduce((accumulator, current) => accumulator + current.value, 0)})</small></span>
                        </label>
                    </li>
                    {brands.map((doc, index) => {
                        if(form.search_brands && doc.name.toLowerCase().search(form.search_brands.toLowerCase()) === -1){
                            return null
                        }else{

                            return <li key={index}>
                            <input id={"brands_"+index} type="checkbox" name="brands" 
                            value={doc.name} 
                            className={styles.checkboxCustom}
                            checked={form.brands === doc.name} 
                            onChange={(e) => dispatch(onChange("brands", e.target.name))} />
                            <label htmlFor={"brands_"+index} className={styles.checkboxCustomLabel}>
                                <div className={styles.icon}><img src={Check} /></div>
                                <span>{doc.name} <small>({doc.value})</small></span>
                            </label>
                        </li>
                        }
                    })}
                </ul>
            </Scrollbars>
        </div>
    </div>
  );
};

export default Brands;
