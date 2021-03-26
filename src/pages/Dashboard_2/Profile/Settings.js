import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Input from "../../../components/Items/input"
import Switch from "../../../components/Items/switch"
import { ButtonSuccess, ButtonDanger, ButtonDark } from "../../../components/Items/buttons"
import { settingsSave } from "../../../state/actions/profile"
import Modal from "../../../components/Items/modal"
import styles from "./Profile.module.scss"
import { deleteProfile } from "../../../state/actions/auth"
import { onChange } from "../../../state/actions/form"
import Sidebar from "./Sidebar"

import InfoIcon from "../../../assets/img/icons/info.svg"
import {defaultMail} from "../../../Settings"
import {FormattedMessage, useIntl} from 'react-intl';
const Edit_1 = (props) => {
    const intl = useIntl();
    const { loading, userData } = useSelector(
        (state) => ({
            loading: state.dashboard.loading,
            userData: state.auth.userData,
        }), shallowEqual
    );

    const [deleteProfileModal, deleteProfileStatus] = useState("");
    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(settingsSave());
        //dispatch(error("Düzenleme kaydedildi."))
        // props.close()
    };


    useEffect(() => {
    window.scrollTo(0, 0);
        if (userData && userData.meta){
            dispatch(onChange("formNotification", userData.notification));
            dispatch(onChange("formEmail", userData.meta.email));
            dispatch(onChange("formPasswordOld", ""));
            dispatch(onChange("formPassword", ""));
            dispatch(onChange("formPassword2", ""));
        }
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <section className={styles.editPage}>
            <Sidebar />
            <div className={styles.content} style={{maxWidth:600}}>
                <h1 style={{fontSize:22, marginTop:0, fontWeight:"400"}}><FormattedMessage id="Dashboard.ayarlar"/></h1>
                <h2 style={{fontSize:18, marginTop:40, fontWeight:"400"}}><FormattedMessage id="Profile.guvenlik"/></h2>
                <hr style={{opacity:.3, marginBottom:30, display:"block"}} />

                <input id="username" style={{display:"none"}} type="text" name="fakeusernameremembered"/>
                <input id="password" style={{display:"none"}} type="password" name="fakepasswordremembered"/>
                <Input styletype="type_4" name="formPasswordOld" type="password"  label={intl.formatMessage({id:"Profile.simdikiSifre"})}  autoComplete="new-password" />
                <Input styletype="type_4" name="formPassword" type="password" label={intl.formatMessage({id:"Profile.yeniSifre"})} />
                <Input styletype="type_4" name="formPassword2" type="password" label={intl.formatMessage({id:"Profile.yeniSifreTekrar"})} />
                <Input styletype="type_4" name="formEmail" type="text" label={intl.formatMessage({id:"Profile.ePosta"})}  disabled />
                <div className={styles.submit}>
                    {/* <span style={{width:"28%"}}></span> */}
                    <ButtonSuccess style={{borderRadius: 5, width: 142, marginTop:0}} onClick={onSubmitHandler} text={<FormattedMessage id="General.kaydet" />} loading={loading ? "true" : ""} disabled={loading} />
                </div>
                <h2 style={{fontSize:18, marginTop:40, fontWeight:"400"}}>{intl.formatMessage({id:"Profile.ePostaBildirimleri"})}</h2>
                <hr style={{opacity:.3, marginBottom:30, display:"block"}} />
                
                <div className={styles.submit}>
                    <span style={{flex:"none", marginTop:-10, marginRight:25}}>
                        {intl.formatMessage({id:"Profile.yeniMesajBildirimi"})}
                    </span>
                    <Switch name="formNotification" />
                </div>
                <h2 style={{fontSize:18, marginTop:40, fontWeight:"400"}}>{intl.formatMessage({id:"Profile.birHesabiSilme"})}</h2>
                <hr style={{opacity:.3, marginBottom:30, display:"block"}} />
                <ButtonDanger style={{borderRadius: 5, width: 142, height:40, textTransform: "capitalize"}} onClick={(e) => deleteProfileStatus(true)} text={<FormattedMessage id="General.profilSil" />} loading={loading ? "true" : ""} disabled={loading} />
                <div className="alert alert-warning" style={{marginTop:20, marginBottom:20, paddingTop:10, paddingBottom:10}}>
                    <img src={InfoIcon} style={{width:20, height:20, marginRight:15}} alt="" />
                    {/* <InfoIcon style={{width:20, height:20, marginRight:15}} fill="#664d03" /> */}
                    <p>{intl.formatMessage({id:"Profile.geriAlmakIcin"})} <a href={"mailto:"+defaultMail}>{defaultMail}</a></p>
                </div>
            </div>
            {deleteProfileModal ? <Modal title={intl.formatMessage({id:"Profile.dikkat"})} content={intl.formatMessage({id:"Profile.profilSilinecek"})} buttons={<div><ButtonDark onClick={(e) => deleteProfileStatus("")} style={{ flex: 1, borderRadius:10, height:50 }} text={intl.formatMessage({id:"Profile.hayir"})} /><ButtonDanger onClick={(e) => { deleteProfileStatus(""); dispatch(deleteProfile()) }} style={{ flex: 1, borderRadius:10, height:50 }} text={intl.formatMessage({id:"Profile.evet"})} /></div>} status={deleteProfileModal} width={500} close={(e) => deleteProfileStatus("")} /> : ""}
        </section>
    );
};

export default Edit_1;