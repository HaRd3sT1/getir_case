import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Input from "../../../components/Items/input"
import Textarea from "../../../components/Items/textarea"
import Select from "../../../components/Items/select"
import Gender from "../../../components/Items/gender"
import DatePicker from "../../../components/Items/datePicker"
import { ButtonSuccess } from "../../../components/Items/buttons"
import { error } from "../../../state/actions/dashboard"
import { editFunction4, editFunction3 } from "../../../state/actions/profile"
import { onChange, onChangeCountry } from "../../../state/actions/form"
import styles from "./Profile.module.scss"
import Sidebar from "./Sidebar"
import Select2 from 'react-select'
import {defaultMail, defaultRelation} from "../../../Settings"
import {FormattedMessage, useIntl} from 'react-intl';
import InfoIcon from "../../../assets/img/icons/info.svg"
const Edit_1 = (props) => {
    const { loading, userData, formCitys, form } = useSelector(
        (state) => ({
            loading: state.dashboard.loading,
            userData: state.auth.userData,
            formCitys: state.form.formCitys ? state.form.formCitys : [],
            form: state.form,
        }), shallowEqual
    );
    let defaultValue = []
    const intl = useIntl();
    const options = [
        { value: 0, label: defaultRelation[0] },
        { value: 1, label: defaultRelation[1] },
        { value: 2, label: defaultRelation[2] },
        { value: 3, label: defaultRelation[3] },
        { value: 4, label: defaultRelation[4] }
    ]

    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(editFunction4());
        dispatch(editFunction3());
        dispatch(error(<FormattedMessage id="General.duzenlemeKaydildi" />, "success", true))
        // props.close()
    };


    useEffect(() => {
    window.scrollTo(0, 0);
        if (userData && userData.meta){
            userData.filter.relation.forEach(doc => {
                defaultValue.push({
                    value: options[doc] ? options[doc].value : doc,
                    label: options[doc] ? options[doc].label : doc
                })
            })
            if(userData.meta.country){
                dispatch(onChangeCountry("filterCountry", userData.meta.country))
            }
            dispatch(onChange("formHeight", userData.meta.height));
            dispatch(onChange("birthDate", new Date(userData.meta.birtDate.seconds * 1000)))
            dispatch(onChange("formCountry", userData.meta.country))
            dispatch(onChange("formCity", userData.meta.city))
            dispatch(onChange("formGender", userData.meta.gender))
            dispatch(onChange("formZip", userData.meta.zip))
            dispatch(onChange("formInfo", userData.info))


            dispatch(onChange("filterRelation", defaultValue));
            dispatch(onChange("filterAge", userData.filter.age));
            dispatch(onChange("filterGender", userData.filter.gender));
            dispatch(onChange("filterCountry", userData.filter.country));
            dispatch(onChange("filterCity", userData.filter.city));

            if (userData.meta.country) {
                dispatch(onChangeCountry("formCountry", userData.meta.country))
            }
        }
        // eslint-disable-next-line
    }, [dispatch]);
    // <FormattedMessage id="General.kadin" />

    return (
        <section className={styles.editPage}>
            <Sidebar />
            <form className={styles.content} style={{maxWidth:680}}>
                <h1 style={{fontSize:22, marginTop:0, fontWeight:"400"}}><FormattedMessage id="Profile.hakkimda" /></h1>

                <div className={styles.submit}>
                    <span style={{width:"28%", flex:"none", paddingRight:15}}>
                        <FormattedMessage id="Register.cinsiyet" />
                    </span>
                    <Gender styletype="type_4" label={<FormattedMessage id="Register.cinsiyet" />} name="formGender" disabled />
                </div>
                
                <div className={styles.submit} style={{marginTop:-20}}>
                    <span style={{width:"28%", flex:"none", paddingRight:15}}>
                        <FormattedMessage id="Register.sehir" /> - <FormattedMessage id="Register.semt" />
                    </span>
                    <Select style={{marginRight:10}} styletype="type_4" name="formCity" items={formCitys} disabled />
                    <Input styletype="type_4" name="formZip" type="text" disabled />
                </div>
                <div className="alert alert-warning" style={{marginTop:-20, marginBottom:20, paddingTop:10, paddingBottom:10}}>
                    <img src={InfoIcon} style={{width:20, height:20, marginRight:15}} alt="" />
                    {/* <InfoIcon style={{width:20, height:20, marginRight:15}} fill="#664d03" /> */}
                    <p><FormattedMessage id="Profile.uyari" /> <a style={{display:"inline-table"}} href={"mailto:"+defaultMail}>{defaultMail}</a></p>
                </div>
                <hr style={{opacity:.3, marginBottom:30, display:"block"}} />
                <DatePicker styletype="type_4" name="birthDate" type="text" label={<FormattedMessage id="Register.dogumTarihi" />} />
                <Textarea styletype="type_4" name="formInfo" type="text" label={<FormattedMessage id="Profile.biyografi" />}  />
                <h2 style={{fontSize:18, marginTop:40, fontWeight:"500"}}><FormattedMessage id="Profile.ilgilendiklerim" /></h2>
                <hr style={{opacity:.3, marginBottom:30, display:"block"}} />
                <Select styletype="type_4" name="filterGender" label={<FormattedMessage id="Profile.ilgilendiklerim" />} items={[{ label:  intl.formatMessage({id:"General.kadin"}), value: 1 }, { label: intl.formatMessage({id:"General.erkek"}), value: 0 }]} />
                <div className={styles.submit}>
                    <span style={{width:"28%", flex:"none", paddingRight:15}}>
                        <FormattedMessage id="Profile.aradigimIliski" />
                    </span>
                    <Select2
                        isMulti
                        defaultValue={defaultValue}
                        style={{flex:1}}
                        onChange={(e) => dispatch(onChange("filterRelation", e))}
                        options={options} />
                </div>
                <Select styletype="type_4" name="filterAge" label={<FormattedMessage id="Dashboard.yasAraligi" />} items={[{ label: intl.formatMessage({id:"Profile.hepsi"}), value: "all" }, { label: "18 - 25", value: 0 }, { label: "25 - 35", value: 1 }, { label: "35 - 45", value: 2 }, { label: "45 - 55", value: 3 }, { label: "55 - 65", value: 4 }]} />
                <Select styletype="type_4" name="filterCity" label={<FormattedMessage id="Register.sehir" />} items={form.filterCitys} />
                <div className={styles.submit}>
                    <span style={{width:"28%"}}></span>
                    <ButtonSuccess style={{borderRadius: 5, width: 142}} onClick={onSubmitHandler} classnamess="mt-4" text={<FormattedMessage id="General.kaydet" />} loading={loading ? "true" : ""} disabled={loading} />
                    
                </div>
            </form>
        </section>
    );
};

export default Edit_1;

