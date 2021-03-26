import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import styles from './Form.module.scss';
import Input from "../../components/Items/input"
import Select from "../../components/Items/select"
import DatePicker from "../../components/Items/datePicker"
import Gender from "../../components/Items/gender"
import {auth} from "../../state/actions/auth"
import {ButtonSuccess} from "../../components/Items/buttons"
import defaultStyles from "../../Settings.module.scss"
import {FormattedMessage} from 'react-intl';
import {useFormatMessage} from "../../Hooks"
import {defaultCountry} from "../../Settings"
const Login = () => {
    const { loading, citys, district } = useSelector(
        (state) => ({
        loading: state.auth.loading,
        citys: state.form.citys ? state.form.citys : [],
        district: state.form.district ? state.form.district : []
        }), shallowEqual
    );

    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(auth());
    };
    return (
        <div className={styles.content}>
            {/* <Modal title="Error" content={error} status={error} width={400} close={(e) => dispatch(cleanError())}  /> */}
            <form onSubmit={onSubmitHandler}>
                <Input name="nickname" type="text" label={<FormattedMessage id="Register.nickname" />} required={true} />
                <Input name="email" type="email" label={<FormattedMessage id="Login.email" />} required={true} />
                <div className={classNames(styles.row, styles.mobile)}>
                    <Input name="password" type="password" label={<FormattedMessage id="Login.password" />} required={true} />
                    <Input name="passwordAgain" type="password" label={<FormattedMessage id="Register.passwordAgain" />} required={true} />
                </div>
                <div className={classNames(styles.row, styles.mobile)}>
                    <DatePicker name="birthDate" type="text" label={<FormattedMessage id="Register.dogumTarihi" />} />
                    <Gender label={<FormattedMessage id="Register.cinsiyet" />} name="gender" required={true} />
                </div>
                {defaultCountry === "tr" ? <div className={styles.row}>
                    <Select name="country" label={<FormattedMessage id="Register.ulke" />} items={[{label:"Türkiye", value:"tr"}]} required={true} />
                    <Select name="city" label={<FormattedMessage id="Register.sehir" />} items={citys} required={true} />
                    <Select name="zip" label={<FormattedMessage id="Register.semt" />} items={district} required={true} />
                </div> :
                <div className={styles.row}>
                    <Select name="country" label="Land" items={[{label:"Österreich", value:"at"}, {label:"Deutschland", value:"de"}, {label:"Schweiz", value:"ch"}]} required={true} />
                    <Select name="city" label="Region" items={citys} required={true} />
                    <Input name="zip" type="text" label="plz" required={true} />
                </div>}
                
                <label className={styles.control}> 
                    
                    {useFormatMessage("Register.uyari_1")}
                    <div className={classNames(styles.colorRed, "mr-2")}>
                        {useFormatMessage("Home.gizlilikSozlesmesi")}
                    </div> 
                    {useFormatMessage("General.ve")}
                    <div className={classNames(styles.colorRed, "ml-2 mr-2")}> 
                    {useFormatMessage("Home.uyelikSozlesmesi")}
                    </div>
                    <input type="checkbox" required />
                    <div  className={styles.control__indicator}></div>
                </label>
                {defaultStyles ?  <ButtonSuccess style={{fontSize:16, textTransform:"uppercase", borderRadius:3, fontWeight:"500"}} className={classNames("mt-3", "w-100", defaultStyles.button, defaultStyles.success)} text={<FormattedMessage id="Register.kayitOl" />} loading={loading ? "true" : ""} disabled={loading} /> : <ButtonSuccess text="KOSTENLOS REGISTRIEREN" loading={loading ? "true" : ""} disabled={loading} />}
                <ul className={styles.lists}>
                    <li className={styles.list}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className={styles.svg}><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg> 
                    {useFormatMessage("Register.check1")}
                    </li>
                    <li className={styles.list}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className={styles.svg}><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg> 
                    {useFormatMessage("Register.check2")}
                    </li>
                    <li className={styles.list}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className={styles.svg}><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg> 
                    {useFormatMessage("Register.check3")}
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default Login;