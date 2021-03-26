import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteProfile } from "../../../state/actions/auth"
import { photoUpdate, photoUpdate2, deletePhoto } from "../../../state/actions/profile"
import styles from "./Profile.module.scss"
import { ButtonPrimary, ButtonDark, ButtonDanger, ButtonSecondary2 } from "../../../components/Items/buttons"
import Textarea from "../../../components/Items/textarea"
import classnames from "classnames"
import Modal from "../../../components/Items/modal"
import { profileUser} from "../../../state/actions/users"
import { buyImage } from "../../../state/actions/dashboard"
import { infoUpdate } from "../../../state/actions/profile"
import { openMessageCheck, closeMessage } from "../../../state/actions/messages"
import { onChange } from "../../../state/actions/form"
import PrizeBox from '../../../components/Layout/PrizeBox/PrizeBox';
import Edit1 from "./Edit_1"
import Edit2 from "./Edit_2"
import Edit3 from "./Edit_3"
import Edit4 from "./Edit_4"
import Hobs_1 from "../../../assets/img/hobs/1.svg"
import Hobs_2 from "../../../assets/img/hobs/2.svg"
import Hobs_3 from "../../../assets/img/hobs/3.svg"
import Hobs_4 from "../../../assets/img/hobs/4.svg"
import Hobs_5 from "../../../assets/img/hobs/5.svg"
import Hobs_6 from "../../../assets/img/hobs/6.svg"
import Hobs_7 from "../../../assets/img/hobs/7.svg"
import Hobs_8 from "../../../assets/img/hobs/8.svg"
import Hobs_9 from "../../../assets/img/hobs/9.svg"
import Hobs_10 from "../../../assets/img/hobs/10.svg"
import Hobs_11 from "../../../assets/img/hobs/11.svg"
import Hobs_12 from "../../../assets/img/hobs/12.svg"
import Hobs_13 from "../../../assets/img/hobs/13.svg"
import Hobs_14 from "../../../assets/img/hobs/14.svg"
import Hobs_15 from "../../../assets/img/hobs/15.svg"
import Hobs_16 from "../../../assets/img/hobs/16.svg"
import Hobs_17 from "../../../assets/img/hobs/17.svg"
import Hobs_18 from "../../../assets/img/hobs/18.svg"
import Hobs_19 from "../../../assets/img/hobs/19.svg"
import Hobs_20 from "../../../assets/img/hobs/20.svg"
import Hobs_21 from "../../../assets/img/hobs/21.svg"
import Hobs_22 from "../../../assets/img/hobs/22.svg"
import Gold from "../../../assets/img/icons/gold.svg"
import Bronze from "../../../assets/img/icons/bronze.svg"
import Silver from "../../../assets/img/icons/silver.svg"
import {userId_2_S} from "../../../Settings"

const Profile = (props) => {
    const { id } = useParams();
    const { userData, users, coins } = useSelector(
        (state) => ({
            coins: state.generalDataReducer.coins,
            users: state.users ? state.users : [],
            userData: state.auth.userData,
        }), shallowEqual
    );
    const [modal_Image, modal_ImageStatus] = useState("");
    const [deleteProfileModal, deleteProfileStatus] = useState("");
    const [edit_1, edit_1Status] = useState("");
    const [edit_2, edit_2Status] = useState("");
    const [edit_3, edit_3Status] = useState("");
    const [edit_4, edit_4Status] = useState("");
    const [userProfile, userProfileStatus] = useState(false);
    const [infoEdit, infoEditStatus] = useState(false);
    const [modal_1, modal_1Status] = useState("");
    const hobs = ["Lesen", "Reisen", "Musik hören", "Kochen", "Schwimmen", "Joggen", "Fitnessstudio", "Reiten", "Kino", "Wandern", "Extermsport", "Fernsehen", "Computerspiele", "Sport", "Fotografie", "Gesellschaftspiele", "Backen", "Sammeln", "Angeln", "Camping", "Karaoke", "Frag mich"];
    const hobsIncon = [Hobs_1, Hobs_2, Hobs_3, Hobs_4, Hobs_5, Hobs_6, Hobs_7, Hobs_8, Hobs_9, Hobs_10, Hobs_11, Hobs_12, Hobs_13, Hobs_14, Hobs_15, Hobs_16, Hobs_17, Hobs_18, Hobs_19, Hobs_20, Hobs_21, Hobs_22];
    const relationList = ["Feste Beziehung", "Abenteuer", "Affäre", "Flirt", "Freundschaft"]
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(profileUser(id))
        if (userData.docId === id){
            userProfileStatus(true)
            if (userData.info){
                dispatch(onChange("info", userData.info))
            }
        }
        if (window.innerWidth < 991){
            dispatch(closeMessage())
        }
        // eslint-disable-next-line
    }, [dispatch]);
    if (!users[id]){
        return null
    }
    let avatar = users[id].avatarLarge === "noavatar.jpg" ? "/noavatar.jpg" : users[id].avatarLarge
    let relation = relationList[users[id].relation]
    if (Array.isArray(users[id].relation)) {
        relation = users[id].relation.map((doc, index) => {
            if (users[id].relation.length === index + 1) {
                return relationList[doc]
            } else {
                return relationList[doc] + ", "
            }
        })
    }
    // const { data, error, isLoading } = useAsync({ promiseFn: loadData, id: parseInt(id), watch: id });

    // console.log(id)
    return (
        <section className={styles.profilePage}>
            <div className={styles.avatarGeneral}>
                <div className={styles.avatarBg}>
                    <div className={styles.bg} style={{ backgroundImage: "url(" + avatar + ")" }}></div>
                </div>
                <div className={styles.avatar}>
                    <div className={styles.avatarImg} onClick={(e) => modal_ImageStatus(avatar)}>
                        <img src={avatar} alt="avatar" />
                    </div>
                    

                    {userProfile ? <div className={styles.photoEdit}>
                        {/* onChange={(e) => this.photoUpdate(e.target)}  */}
                        <input className={styles.absolute} type="file" onChange={(e) => dispatch(photoUpdate(e.target))} />
                        <i className="fi flaticon-pencil"></i>
                        {/* <MdModeEdit /> */}
                    </div> : ""}
                </div>
                <div className={styles.container}>
                    
                <h2 className={styles.h2}>
                    {users[id].badge ? users[id].badge === "Gold" ? <img src={Gold} alt="" style={{marginRight:6, width:30, height:30}} /> : users[id].badge === "Bronze" ? <img src={Bronze} alt="" style={{marginRight:6, width:30, height:30}} /> : <img src={Silver} alt="" style={{marginRight:6, width:30, height:30}} /> : <span></span>} {users[id].nickname}</h2>
                    <p className={styles.p}>{users[id].info}</p>
                    {userProfile ? <div className={styles.infoEdit}>
                        {!infoEdit ? <b onClick={(e) => infoEditStatus(true)}>{users[id].info ? "Bearbeiten" : "Biografie hinzufügen"}</b> : ""}
                        {infoEdit ? <Textarea name="info" dark="true" maxLength={300} /> : ""}
                        {infoEdit ? <div className={styles.button}>
                            <ButtonDark onClick={(e) => infoEditStatus(false)} style={{ borderRadius: 5, height: 42 }} text="Stornieren" />
                            <ButtonPrimary onClick={(e) => { dispatch(infoUpdate()); infoEditStatus(false)}} style={{ borderRadius: 5, height: 42 }} text="Speichern" />
                        </div> : ""}
                    </div> : ""}
                    <hr />
                    <div className={styles.bar}>
                        <ul className={styles.menu}>
                            <li className={styles.active}>
                                Über Benutzer
                            </li>
                        </ul>
                        {!userProfile ? <div className={styles.buttons}>
                            <ButtonPrimary onClick={(e) => dispatch(openMessageCheck(userId_2_S(id)))} style={{ borderRadius: 5, height: 42, width:210, marginTop:0 }} text="Nachricht Senden" />
                            {/* <ButtonPrimary style={{borderRadius:5, height:42}} text="Anschreiben" /> */}
                        </div> : "" }
                        {userProfile ? <div className={styles.buttons}>
                            <ButtonSecondary2 onClick={(e) => edit_4Status("true")} style={{ borderRadius: 5, height: 42, width: 210, marginTop: 0 }} text="Konto bearbeiten" />
                        </div> : "" }
                    </div>
                </div>
            </div>
            {userProfile && window.innerWidth < 991 ? <PrizeBox /> : ""}
            <div className={styles.container}>

                <div className={styles.row}>
                    <div className={styles.bg}>

                        {userProfile ? <div className={classnames(styles.photoEdit, styles.type_2)} onClick={(e) => edit_1Status("true")}>
                            <i className="fi flaticon-pencil"></i>
                        </div> : ""}
                        <div>
                            <b className={styles.title}>Steckbrief</b>
                            <p className={styles.p}><b>{users[id].age}</b> Jahre Alt </p>
                            <p className={styles.p}>Wohnt in <b style={{ textTransform: "capitalize" }}>{users[id].city}</b></p>
                            <p className={styles.p}>Haarfarbe <b style={{ textTransform: "capitalize" }}>{users[id].hairColor}</b></p>
                            <p className={styles.p}>Augenfarbe <b style={{ textTransform: "capitalize" }}>{users[id].eyeColor}</b></p>
                            <p className={styles.p}>Statur <b style={{ textTransform: "capitalize" }}>{users[id].body}</b></p>
                            <p className={styles.p}>Statur <b style={{ textTransform: "capitalize" }}>{users[id].height}</b> groß</p>
                        </div>
                    </div>
                    <div className={styles.bg}>
                        <b className={styles.title}>Bilder</b>
                        <ul className={styles.photos}>
                            {userProfile ? 
                                users[id].photos.map((post, index) => {
                                    return (<li key={index}><div className={styles.overlay} onClick={(e) => modal_ImageStatus(post)}>
                                        <i className="fi flaticon-magnifying-search-lenses-tool"></i>
                                    </div><img src={post} alt="photos" />
                                        <i className={classnames(styles.trash, "fi flaticon-trash-1")} onClick={(e) => dispatch(deletePhoto(index))}></i>
                                    </li>)
                                })
                            : ""}
                            {!userProfile ? users[id].photos.map((post, index) => {
                                if (index > 2) {
                                    let buy = false
                                    if (userData.buy) {
                                        userData.buy.forEach(doc => {
                                            if (doc === userId_2_S(id) + "_" + index) {
                                                buy = true
                                            }
                                        })
                                    }
                                    if (buy) {
                                        return (<li key={index} onClick={(e) => modal_ImageStatus(post)}><div className={styles.overlay}>
                                            <i className="fi flaticon-magnifying-search-lenses-tool"></i>
                                        </div><img style={{maxHeight:"none"}} src={post} alt="photos" /></li>)
                                    } else {
                                        return (<li key={index}><div className={styles.buyBtn} onClick={(e) => { modal_1Status(userId_2_S(id) + "_" + index)}}><p>Freischalten</p> <b style={{ opacity: "0.6" }}>({coins.profilePhotoCoin} Coin)</b></div></li>)
                                    }
                                } else {
                                    return (<li key={index} onClick={(e) => modal_ImageStatus(post)}><div className={styles.overlay}>
                                        <i className="fi flaticon-magnifying-search-lenses-tool"></i>
                                    </div><img style={{maxHeight:"none"}} src={post} alt="photos" /></li>)
                                }
                            }) : ""}
                            {userProfile ? <li className={styles.imgContent}>
                                {/* onChange={(e) => this.photoUpdate2(e.target)} */}
                                <input className={styles.absolute} type="file" onChange={(e) => dispatch(photoUpdate2(e.target))}  />
                                <b className={styles.imgContentIcon}>+</b>
                                <b> Foto hinzufügen </b>
                            </li> : ""}
                        </ul>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.bg}>
                        {userProfile ? <div className={classnames(styles.photoEdit, styles.type_2)} onClick={(e) => edit_2Status("true")}>
                            <i className="fi flaticon-pencil"></i>
                        </div> : ""}
                        <div>
                            <b className={styles.title}>Hobbys</b>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {users[id].hobs && users[id].hobs.map((doc, index) => {
                                    return (
                                        <div key={index} style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 7, marginBottom:7, color:"#666" }}>
                                            <img style={{ height: 35, marginBottom: 6 }} src={hobsIncon[doc]} alt="" />
                                            {hobs[doc]}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.bg}>
                        {userProfile ? <div className={classnames(styles.photoEdit, styles.type_2)} onClick={(e) => edit_3Status("true")}>
                            <i className="fi flaticon-pencil"></i>
                        </div> : ""}
                        <b className={styles.title}>Allgemein</b>
                        <ul>
                            <li className={styles.p}>Geschlecht</li>
                            <li className={styles.p}><b>{users[id].gender === 0 ? "Männlich" : "Weiblich"}</b></li>
                            <li className={styles.p}>Interessiert an</li>
                            <li className={styles.p}><b>{users[id].filterGender === 0 ? "Männlich" : "Weiblich"}</b></li>
                            <li className={styles.p}>Auf der Suche nach</li>
                            <li className={styles.p}><b>{relation}</b></li>
                        </ul>
                    </div>
                </div>
                {userProfile ? <div className={styles.row}>

                    <ButtonDanger style={{ borderRadius: 5, height: 42, width: 210, flex: "none", marginBottom:40 }} onClick={(e) => deleteProfileStatus("true")} text="Profil löschen" />
                </div> : ""}
            </div>
            <Modal title="Hinweis!" content="Ihr Profil wird gelöscht. Diese Aktion kann nicht rückgängig gemacht werden. Bist du sicher?" buttons={<div><ButtonDark onClick={(e) => deleteProfileStatus("")} style={{ flex: 1 }} text="Nein" /><ButtonPrimary onClick={(e) => { deleteProfileStatus(""); dispatch(deleteProfile()) }} style={{ flex: 1 }} text={"Ja"} /></div>} status={deleteProfileModal} width={500} close={(e) => deleteProfileStatus("")} />
            <Modal title="Hinweis!" content="Möchtest du das Bild freischalten?" buttons={<div><ButtonDark onClick={(e) => modal_1Status("")} style={{ flex: 1 }} text="Nein" /><ButtonPrimary onClick={(e) => { modal_1Status(""); dispatch(buyImage(modal_1)) }} style={{ flex: 1 }} text={"Ja ("+coins.profilePhotoCoin+" Coin)"} /></div>} status={modal_1} width={500} close={(e) => modal_1Status("")} />
            <Modal title="Photo" content={<img style={{pointerEvents: 'none'}} src={modal_Image} alt="" />} status={modal_Image} width={700} close={(e) => modal_ImageStatus("")} />
            <Modal title="Edit" content={<Edit1 close={(e) => edit_1Status("")} />} status={edit_1} width={500} close={(e) => edit_1Status("")} />
            <Modal title="Edit" content={<Edit2 close={(e) => edit_2Status("")} />} status={edit_2} width={500} close={(e) => edit_2Status("")} />
            <Modal title="Edit" content={<Edit3 close={(e) => edit_3Status("")} />} status={edit_3} width={500} close={(e) => edit_3Status("")} />
            <Modal title="Einstellungen" content={<Edit4 close={(e) => edit_4Status("")} />} status={edit_4} width={500} close={(e) => edit_4Status("")} />
        </section>
    )
}

export default Profile;
