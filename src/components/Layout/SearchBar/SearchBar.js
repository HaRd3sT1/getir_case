import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from "./SearchBar.module.scss"
import Input from "../../Items/input"
import Select from "../../Items/select"
import { searchData } from "../../../state/actions/search"
import classNames from 'classnames';
import { ButtonBlue} from "../../Items/buttons"
import Down2Icon from "../../../assets/img/icons/down2.svg"
import ReloadIcon from "../../../assets/img/icons/reload.svg"
const Search = () => {
    const { searchCitys, form } = useSelector(
        (state) => ({
            loading: state.dashboard.loading,
            form: state.form,
            searchCitys: state.form.searchCitys ? state.form.searchCitys : []
        }), shallowEqual
    );
    const [tabs, setTabs] = useState(0);
    const [refresh, refreshSet] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        refreshSet(false)
    // eslint-disable-next-line
    }, [form]);
    return (
        <section className={styles.SearchBar}>
            <div className={styles.fixed}>
                <div onClick={(e) => setTabs(tabs === 0 ? "" : 0)} className={classNames(styles.title, tabs === 0 ? styles.active : "")}>
                    Suchen <img src={Down2Icon} alt="" style={{width:12, height:12}} />
                </div>
                {tabs === 0 && 
                <div className={classNames(styles.inputs)}>
                    <div className="d-flex" style={{ marginTop: 10 }}>
                        <div style={{ marginRight: 10, width: '100%' }}>
                            <Select styletype="type_3" name="searchGender" label="Geschlecht" items={[{ label: "Männlich", value: "0" }, { label: "Weiblich", value: "1" }]} bar="false" />
                        </div>
                        <Select styletype="type_3" name="searchRange" label="Im Alter Von" items={[{ label: "18 - 25", value: "0" }, { label: "25 - 35", value: "1" }, { label: "35 - 45", value: "2" }, { label: "55 - 65", value: "3" }]} bar="false" />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Select styletype="type_3" name="searchCountry" label="Land" items={[{ label: "Österreich", value: "at" }, { label: "Deutschland", value: "de" }, { label: "Schweiz", value: "ch" }]} bar="false" />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Select styletype="type_3" style={{ marginTop: 10 }} name="searchCity" label="Bundesland" items={searchCitys} bar="false" />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <ButtonBlue text={refresh ? <span style={{display:"flex", alignItems:"center"}}>
                            <img src={ReloadIcon} alt="" style={{width:14, height:14, marginRight:8}} />
                            {/* <ReloadIcon style={{width:14, height:14, marginRight:8}} fill="#fff" /> */}
                            Neue</span>:"Suchen"} onClick={(e) => {dispatch(searchData(24, true)); refreshSet(true)}} style={{ fontSize: 16, borderRadius: 5, padding: 5, textTransform: "inherit", height: 36, width:90 }} />
                    </div>
                </div>}
                <div onClick={(e) => setTabs(tabs === 1 ? "" : 1)}  className={classNames(styles.title, tabs === 1 ? styles.active : "")} style={{marginTop:30}}>
                    Nickname Suchen <img src={Down2Icon} alt="" style={{width:12, height:12}} />
                </div>
                {tabs === 1 && 
                <div className={classNames(styles.inputs)}>
                    <Input style={{marginTop:10}} styletype="type_3" name="searchNickname" type="text" label="Nutzername" bar="false" />
                    <div style={{ marginTop: 20 }}>
                        <ButtonBlue text="Suchen" onClick={(e) => dispatch(searchData(24, true, "", "nickname"))} style={{ fontSize: 16, borderRadius: 5, padding: 5, textTransform: "inherit", height: 36, width:90 }} />
                    </div>
                </div>}
            </div>
        </section>
    )
}

export default Search;
