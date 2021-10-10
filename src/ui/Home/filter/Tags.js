import React, {useState} from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styles from './Style.module.scss';
import {onChange} from "../../../state/actions/form"
import Check from "../../../assets/img/icons/check_white.svg"
import { Scrollbars } from 'react-custom-scrollbars';
const Tags = ({tab}) => {
  const {form, tags} = useSelector(
    (state) => ({ 
      form: state.form,
      tags: state.product[tab+"_tags"] ? state.product[tab+"_tags"] : [],
    }), shallowEqual
  );
  const dispatch = useDispatch();
  return (
    <div className={styles.tags}>
        <div className={styles.title}>
            Tags
        </div>
        <div className={styles.filterBox}>
            <input type="text" name="search_tags" 
            value={form.search_tags} 
            className={styles.searchInput}
            placeholder="Search tag"
            onChange={(e) => dispatch(onChange("search_tags", e.target.value))} />
            <Scrollbars style={{ width: "100%", height: 140 }}>
                <ul>
                    <li>
                        <input id={"tags_all"} type="checkbox" name="tags" 
                        value={null} 
                        className={styles.checkboxCustom}
                        checked={!form.tags} 
                        onChange={(e) => dispatch(onChange("tags", 0))} />
                        <label htmlFor={"tags_all"} className={styles.checkboxCustomLabel}>
                            <div className={styles.icon}><img src={Check} /></div>
                            <span>All <small>({tags.reduce((accumulator, current) => accumulator + current.value, 0)})</small></span>
                        </label>
                    </li>
                    {tags.map((doc, index) => {
                        if(form.search_tags && doc.name.toLowerCase().search(form.search_tags.toLowerCase()) === -1){
                            return null
                        }else{

                            return <li key={index}>
                            <input id={"tags_"+index} type="checkbox" name="tags" 
                            value={doc.name} 
                            className={styles.checkboxCustom}
                            checked={form.tags === doc.name} 
                            onChange={(e) => dispatch(onChange("tags", e.target.name))} />
                            <label htmlFor={"tags_"+index} className={styles.checkboxCustomLabel}>
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

export default Tags;
