import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ButtonSuccess } from "../../../components/Items/buttons"
import { editFunction2,editFunction1, editCharacters} from "../../../state/actions/profile"
import { onChange } from "../../../state/actions/form"
import styles from "./Profile.module.scss"
import Select2 from 'react-select'
import Select from "../../../components/Items/select"
import { error } from "../../../state/actions/dashboard"
import Sidebar from "./Sidebar"
import InfoIcon from "../../../assets/img/icons/info.svg"
import {defaultHobs, defaultLanguages, defaultSport, defaultMusic, defaultFilm, defaultActivite, defaultBody, defaultEyeColor, defaultHairColor, defaultStyle, defaultExtra, defaultMeslek, defaultMezuniyet, defaultIliskiDurumu, defaultCocuklar} from "../../../Settings"
import {FormattedMessage} from 'react-intl';
const Edit_2 = (props) => {

    const options = [
        { value: 0, label: defaultHobs[0] },
        { value: 1, label: defaultHobs[1] },
        { value: 2, label: defaultHobs[2] },
        { value: 3, label: defaultHobs[3] },
        { value: 4, label: defaultHobs[4] },
        { value: 5, label: defaultHobs[5] },
        { value: 6, label: defaultHobs[6] },
        { value: 7, label: defaultHobs[7] },
        { value: 8, label: defaultHobs[8] },
        { value: 9, label: defaultHobs[9] },
        { value: 10, label: defaultHobs[10] },
        { value: 11, label: defaultHobs[11] },
        { value: 12, label: defaultHobs[12] },
        { value: 13, label: defaultHobs[13] },
        { value: 14, label: defaultHobs[14] },
        { value: 15, label: defaultHobs[15] },
        { value: 16, label: defaultHobs[16] },
        { value: 17, label: defaultHobs[17] },
        { value: 18, label: defaultHobs[18] },
        { value: 19, label: defaultHobs[19] },
        { value: 20, label: defaultHobs[20] },
        { value: 21, label: defaultHobs[21] }
    ]
    const optionsSprachen = [
        { value: 0, label: defaultLanguages[0] },
        { value: 1, label: defaultLanguages[1] },
        { value: 2, label: defaultLanguages[2] },
        { value: 3, label: defaultLanguages[3] },
        { value: 4, label: defaultLanguages[4] },
        { value: 5, label: defaultLanguages[5] }
    ]
    const optionsSport = [
        { value: 0, label: defaultSport[0] },
        { value: 1, label: defaultSport[1] },
        { value: 2, label: defaultSport[2] },
        { value: 3, label: defaultSport[3] },
        { value: 4, label: defaultSport[4] },
        { value: 5, label: defaultSport[5] },
        { value: 6, label: defaultSport[6] },
        { value: 7, label: defaultSport[7] },
        { value: 8, label: defaultSport[8] },
        { value: 9, label: defaultSport[9] },
        { value: 10, label: defaultSport[10] },
        { value: 11, label: defaultSport[11] },
        { value: 12, label: defaultSport[12] },
        { value: 13, label: defaultSport[13] },
        { value: 14, label: defaultSport[14] },
    ]
    const optionsMusik = [
        { value: 0, label: defaultMusic[0] },
        { value: 1, label: defaultMusic[1] },
        { value: 2, label: defaultMusic[2] },
        { value: 3, label: defaultMusic[3] },
        { value: 4, label: defaultMusic[4] },
        { value: 5, label: defaultMusic[5] },
        { value: 6, label: defaultMusic[6] },
        { value: 7, label: defaultMusic[7] },
        { value: 8, label: defaultMusic[8] },
        { value: 9, label: defaultMusic[9] },
        { value: 10, label: defaultMusic[10] },
        { value: 11, label: defaultMusic[11] },
        { value: 12, label: defaultMusic[12] },
        { value: 13, label: defaultMusic[13] },
    ]
    const optionsFilme = [
        { value: 0, label: defaultFilm[0] },
        { value: 1, label: defaultFilm[1] },
        { value: 2, label: defaultFilm[2] },
        { value: 3, label: defaultFilm[3] },
        { value: 4, label: defaultFilm[4] },
        { value: 5, label: defaultFilm[5] },
        { value: 6, label: defaultFilm[6] },
        { value: 7, label: defaultFilm[7] },
        { value: 8, label: defaultFilm[8] },
    ]
    const optionsUnterhaltung = [
        { value: 0, label: defaultActivite[0] },
        { value: 1, label: defaultActivite[1] },
        { value: 2, label: defaultActivite[2] },
        { value: 3, label: defaultActivite[3] },
        { value: 4, label: defaultActivite[4] },
        { value: 5, label: defaultActivite[5] },
        { value: 6, label: defaultActivite[6] },
        { value: 7, label: defaultActivite[7] },
        { value: 8, label: defaultActivite[8] },
    ]
    const { loading, userData, form } = useSelector(
        (state) => ({
            loading: state.dashboard.loading,
            userData: state.auth.userData,
            form: state.form,
        }), shallowEqual
    );

    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(editFunction1());
        dispatch(editFunction2());
        // dispatch(editFunction3());
        dispatch(editCharacters());
        dispatch(error(<FormattedMessage id="General.duzenlemeKaydildi" />, "success", true))
        // props.close()
    };
    let defaultValue = []
    let sprachenList = []
    let SportList = []
    let MusikList = []
    let FilmeList = []
    let UnterhaltungList = []

    useEffect(() => {
    window.scrollTo(0, 0);
        dispatch(onChange("formHeight", userData.meta.height));
        if(!userData.character){
            dispatch(onChange("formBerufsstand", ""));
            dispatch(onChange("formAbschluss", ""));
            dispatch(onChange("formBeziehungsstatus", ""));
            dispatch(onChange("formKinder", ""));
        }
        dispatch(onChange("formBody", userData.meta.body))
        dispatch(onChange("formEyeColor", userData.meta.eyeColor))
        dispatch(onChange("formHairColor", userData.meta.hairColor))
        dispatch(onChange("formStyle", userData.meta.style))
        dispatch(onChange("formExtra", userData.meta.extra))
        if (userData.hobs) {
            userData.hobs.forEach(doc => {
                defaultValue.push({
                    value: options[doc] ? options[doc].value : doc,
                    label: options[doc] ? options[doc].label : doc
                })
            })
            dispatch(onChange("formHobs", defaultValue));
        }
        if(userData.character){
            dispatch(onChange("formBerufsstand", userData.character.berufsstand ? userData.character.berufsstand : ""));
            dispatch(onChange("formAbschluss", userData.character.abschluss ? userData.character.abschluss : ""));
            dispatch(onChange("formBeziehungsstatus", userData.character.beziehungsstatus ? userData.character.beziehungsstatus : ""));
            dispatch(onChange("formKinder", userData.character.kinder ? userData.character.kinder : ""));
            if (userData.character.sprachen) {
                userData.character.sprachen.forEach(doc => {
                    let index = optionsSprachen.findIndex(x => x.value ===doc);
                    if(index !== -1){
                        sprachenList.push({
                            value: optionsSprachen[index].value,
                            label: optionsSprachen[index].label
                        })
                    }
                })
            }
            if (userData.character.sport) {
                userData.character.sport.forEach(doc => {
                    let index = optionsSport.findIndex(x => x.value ===doc);
                    if(index !== -1){
                        SportList.push({
                            value: optionsSport[index].value,
                            label: optionsSport[index].label
                        })
                    }
                })
            }
            if (userData.character.musik) {
                userData.character.musik.forEach(doc => {
                    let index = optionsMusik.findIndex(x => x.value ===doc);
                    if(index !== -1){
                        MusikList.push({
                            value: optionsMusik[index].value,
                            label: optionsMusik[index].label
                        })
                    }
                })
            }
            if (userData.character.filme) {
                userData.character.filme.forEach(doc => {
                    let index = optionsFilme.findIndex(x => x.value ===doc);
                    if(index !== -1){
                        FilmeList.push({
                            value: optionsFilme[index].value,
                            label: optionsFilme[index].label
                        })
                    }
                })
            }
            if (userData.character.unterhaltung) {
                userData.character.unterhaltung.forEach(doc => {
                    let index = optionsUnterhaltung.findIndex(x => x.value ===doc);
                    if(index !== -1){
                        UnterhaltungList.push({
                            value: optionsUnterhaltung[index].value,
                            label: optionsUnterhaltung[index].label
                        })
                    }
                })
            }
        }
        dispatch(onChange("formUnterhaltung", UnterhaltungList));
        dispatch(onChange("formFilme", FilmeList));
        dispatch(onChange("formMusik", MusikList));
        dispatch(onChange("formSprachen", sprachenList));
        dispatch(onChange("formSport", SportList));

        // userData.filter.relation.forEach(doc => {
        //     defaultValue.push({
        //         value: options[doc] ? options[doc].value : doc,
        //         label: options[doc] ? options[doc].label : doc
        //     })
        // })
        // dispatch(onChange("filterRelation", defaultValue));
        // dispatch(onChange("filterAge", userData.filter.age));
        // dispatch(onChange("filterGender", userData.filter.gender));
        // dispatch(onChange("filterCountry", userData.filter.country));
        // dispatch(onChange("filterCity", userData.filter.city));
        // eslint-disable-next-line
    }, [dispatch]);
    let vucutYapisiArr = [];
    defaultBody.forEach((doc,index)=> vucutYapisiArr.push({ label:doc, value:index }))
    let eyeColorArr = [];
    defaultEyeColor.forEach((doc,index)=> eyeColorArr.push({ label:doc, value:index }))
    let hairColorArr = [];
    defaultHairColor.forEach((doc,index)=> hairColorArr.push({ label:doc, value:index }))
    let styleArr = [];
    defaultStyle.forEach((doc,index)=> styleArr.push({ label:doc, value:index }))
    let extraArr = [];
    defaultExtra.forEach((doc,index)=> extraArr.push({ label:doc, value:index }))
    let meslekArr = [];
    defaultMeslek.forEach((doc,index)=> meslekArr.push({ label:doc, value:index }))
    let mezuniyetArr = [];
    defaultMezuniyet.forEach((doc,index)=> mezuniyetArr.push({ label:doc, value:index }))
    let iliskiDurumuArr = [];
    defaultIliskiDurumu.forEach((doc,index)=> iliskiDurumuArr.push({ label:doc, value:index }))
    let cocuklarArr = [];
    defaultCocuklar.forEach((doc,index)=> cocuklarArr.push({ label:doc, value:index }))
    return (
        <section className={styles.editPage}>
            <Sidebar />
            <form className={styles.content} style={{maxWidth:680}}>
                <h1 style={{fontSize:22, marginTop:0, fontWeight:"400"}}><FormattedMessage id="Profile.gorunumIlgiAlanlari" /></h1>

                <div className="alert alert-warning" style={{marginTop:20, marginBottom:20, paddingTop:10, paddingBottom:10}}>
                    <img src={InfoIcon} style={{width:20, height:20, marginRight:15}} alt="" />
                    {/* <InfoIcon style={{width:20, height:20, marginRight:15}} fill="#664d03" /> */}
                    <p><FormattedMessage id="Profile.profilTamamlamaUyari" /></p>
                </div>
                <Select styletype="type_4" name="formHeight" label={<FormattedMessage id="Profile.boy" />} items={[{ label: "1,50", value: "1,50" }, { label: "1,51", value: "1,51" }, { label: "1,52", value: "1,52" }, { label: "1,53", value: "1,53" }, { label: "1,54", value: "1,54" }, { label: "1,55", value: "1,55" }, { label: "1,56", value: "1,56" }, { label: "1,57", value: "1,57" }, { label: "1,58", value: "1,58" }, { label: "1,59", value: "1,59" }, { label: "1,60", value: "1,60" }, { label: "1,61", value: "1,61" }, { label: "1,62", value: "1,62" }, { label: "1,63", value: "1,63" }, { label: "1,64", value: "1,64" }, { label: "1,65", value: "1,65" }, { label: "1,66", value: "1,66" }, { label: "1,67", value: "1,67" }, { label: "1,68", value: "1,68" }, { label: "1,69", value: "1,69" }, { label: "1,70", value: "1,70" }, { label: "1,71", value: "1,71" }, { label: "1,72", value: "1,72" }, { label: "1,73", value: "1,73" }, { label: "1,74", value: "1,74" }, { label: "1,75", value: "1,75" }, { label: "1,76", value: "1,76" }, { label: "1,77", value: "1,77" }, { label: "1,78", value: "1,78" }, { label: "1,79", value: "1,79" }, { label: "1,80", value: "1,80" }, { label: "1,81", value: "1,81" }, { label: "1,82", value: "1,82" }, { label: "1,83", value: "1,83" }, { label: "1,84", value: "1,84" }, { label: "1,85", value: "1,85" }, { label: "1,86", value: "1,86" }, { label: "1,87", value: "1,87" }, { label: "1,88", value: "1,88" }, { label: "1,89", value: "1,89" }, { label: "1,90", value: "1,90" }, { label: "1,91", value: "1,91" }, { label: "1,92", value: "1,92" }, { label: "1,93", value: "1,93" }, { label: "1,94", value: "1,94" }, { label: "1,95", value: "1,95" }, { label: "1,96", value: "1,96" }, { label: "1,97", value: "1,97" }, { label: "1,98", value: "1,98" }, { label: "1,99", value: "1,99" }, { label: "2,00", value: "2,00" }]} />

                <Select  styletype="type_4" name="formBody" label={<FormattedMessage id="Profile.vucutYapisi" />} items={vucutYapisiArr} />

                <Select  styletype="type_4" name="formEyeColor" label={<FormattedMessage id="Profile.gozRengi" />} items={eyeColorArr} />

                <Select  styletype="type_4" name="formHairColor" label={<FormattedMessage id="Profile.sacRengi" />} items={hairColorArr} />

                <Select  styletype="type_4" name="formStyle" label={<FormattedMessage id="Profile.stil" />} items={styleArr} />

                <Select  styletype="type_4" name="formExtra" label={<FormattedMessage id="Profile.dovmePiercing" />} items={extraArr} />

                <h2 style={{fontSize:22, marginTop:40, fontWeight:"400"}}>{<FormattedMessage id="General.ozellikler" />}</h2>
                <hr style={{opacity:.3, marginBottom:30, display:"block"}} />

                <Select styletype="type_4" name="formBerufsstand" label={<FormattedMessage id="Profile.meslek" />} items={meslekArr} />

                <Select styletype="type_4" name="formAbschluss" label={<FormattedMessage id="Profile.mezuniyet" />} items={mezuniyetArr} />
                <div className={styles.submit}>
                    <span style={{width:"28%", flex:"none"}}>
                        {<FormattedMessage id="Profile.diller" />}
                    </span>
                    <Select2
                        isMulti
                        defaultValue={sprachenList}
                        style={{flex:1}}
                        onChange={(e) => dispatch(onChange("formSprachen", e))}
                        options={optionsSprachen} />
                </div>
                <Select styletype="type_4" name="formBeziehungsstatus" label={<FormattedMessage id="Profile.iliskiDurumu" />} items={iliskiDurumuArr} />

                <Select styletype="type_4" name="formKinder" label={<FormattedMessage id="Profile.cocuklar" />} items={cocuklarArr} />

                <h2 style={{fontSize:22, marginTop:40, fontWeight:"400"}}>{<FormattedMessage id="Profile.ilgiAlanlari" />}</h2>
                <hr style={{opacity:.3, marginBottom:30, display:"block"}} />
                <div className={styles.submit}>
                    <span style={{width:"28%", flex:"none"}}>
                        {<FormattedMessage id="Profile.hobiler" />}
                    </span>
                    <Select2
                        isMulti
                        defaultValue={defaultValue}
                        style={{flex:1}}
                        onChange={(e) => dispatch(onChange("formHobs", e))}
                        options={options} />
                </div>
                <div className={styles.submit}>
                    <span style={{width:"28%", flex:"none"}}>
                        <FormattedMessage id="Profile.spor" />
                    </span>
                    <Select2
                        isMulti
                        defaultValue={SportList}
                        style={{flex:1}}
                        onChange={(e) => dispatch(onChange("formSport", e))}
                        options={optionsSport} />
                </div>
                <div className={styles.submit}>
                    <span style={{width:"28%", flex:"none"}}>
                        <FormattedMessage id="Profile.muzikler" />
                    </span>
                    <Select2
                        isMulti
                        defaultValue={MusikList}
                        style={{flex:1}}
                        onChange={(e) => dispatch(onChange("formMusik", e))}
                        options={optionsMusik} />
                </div>
                <div className={styles.submit}>
                    <span style={{width:"28%", flex:"none"}}>
                        <FormattedMessage id="Profile.filmler" />
                    </span>
                    <Select2
                        isMulti
                        defaultValue={FilmeList}
                        style={{flex:1}}
                        onChange={(e) => dispatch(onChange("formFilme", e))}
                        options={optionsFilme} />
                </div>
                <div className={styles.submit}>
                    <span style={{width:"28%", flex:"none"}}>
                        <FormattedMessage id="Profile.eglence" />
                    </span>
                    <Select2
                        isMulti
                        defaultValue={UnterhaltungList}
                        style={{flex:1}}
                        onChange={(e) => dispatch(onChange("formUnterhaltung", e))}
                        options={optionsUnterhaltung} />
                </div>
                <div className={styles.submit}>
                    <span style={{width:"28%"}}></span>
                    <ButtonSuccess style={{borderRadius: 5, width: 142}} onClick={onSubmitHandler} classnamess="mt-4" text={<FormattedMessage id="General.kaydet" />} loading={loading ? "true" : ""} disabled={loading} />
                </div>
            </form>
        </section>
    );
};

export default Edit_2;