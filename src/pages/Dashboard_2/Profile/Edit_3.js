import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { photoUpdate, photoUpdate2, deletePhoto  } from "../../../state/actions/profile"
import Modal from "../../../components/Items/modal"
import styles from "./Profile.module.scss"
import Sidebar from "./Sidebar"
import InfoIcon from "../../../assets/img/icons/info.svg"
import EditIcon from "../../../assets/img/icons/edit.svg"
import TrashWhite from "../../../assets/img/icons/trashWhite.svg"
import {FormattedMessage} from 'react-intl';
const Edit_3 = (props) => {
    const { userData } = useSelector(
        (state) => ({
            userData: state.auth.userData,
        }), shallowEqual
    );

    const dispatch = useDispatch();
    const [modal_Image, modal_ImageStatus] = useState("");

    useEffect(() => {
    window.scrollTo(0, 0);
        if (userData && userData.meta) {
        }
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <section className={styles.editPage}>
            <Sidebar />
            <div className={styles.content} style={{maxWidth:680}}>
                <h1 style={{fontSize:22, marginTop:0, fontWeight:"400"}}><FormattedMessage id="Profile.fotograflar" /></h1>
                <div className="alert alert-warning" style={{marginTop:20, marginBottom:20, paddingTop:10, paddingBottom:10}}>
                    <img src={InfoIcon} style={{width:20, height:20, marginRight:15}} alt="" />
                    {/* <InfoIcon style={{width:20, height:20, marginRight:15}} fill="#664d03" /> */}
                    <p><FormattedMessage id="Profile.fotografBilgi" /></p>
                </div>
                <b style={{marginBottom:10, display:"block"}}>Avatar</b>
                <div className={styles.avatar} onClick={(e) => modal_ImageStatus(userData.meta.avatarUrl )} style={{ backgroundImage: "url(" + userData.meta.avatarUrl + ")" }}>
                    <div className={styles.photoEdit}>
                        {/* onChange={(e) => this.photoUpdate(e.target)}  */}
                        <input className={styles.absolute} type="file" onChange={(e) => dispatch(photoUpdate(e.target))} />
                        <img src={EditIcon} style={{width:24}} alt="" />
                        {/* <MdModeEdit /> */}
                    </div>
                </div>
                <b style={{marginBottom:10, display:"block", marginTop:25}}><FormattedMessage id="Profile.fotograflar" /></b>
                <ul className={styles.photos}>
                    <li className={styles.imgUpload}>
                        {/* onChange={(e) => this.photoUpdate2(e.target)} */}
                        <input className={styles.absolute} type="file" onChange={(e) => dispatch(photoUpdate2(e.target))}  />
                        <b><FormattedMessage id="Profile.fotografYukle" /></b>
                    </li>
                    {userData.photos.map((post, index) => {
                        return (<li key={index} onClick={(e) => modal_ImageStatus(post)}>
                            <img src={post} alt="photos" />
                            <div className={styles.trash}>
                                <img src={TrashWhite} alt="" onClick={(e) => dispatch(deletePhoto(index))} />
                            </div>
                        </li>)
                    })}
                </ul>
            </div>
            {modal_Image ? <Modal title={<FormattedMessage id="Profile.fotograflar" />} content={<img style={{pointerEvents: 'none'}} src={modal_Image} alt="" />} status={modal_Image} width={700} close={(e) => modal_ImageStatus("")} /> : ""}
        </section>
    );
};

export default Edit_3;