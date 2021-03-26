import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { cleanErrorAuth } from '../../../state/actions/auth'
import styles from './Styles.module.scss';
import { ButtonDark, ButtonSuccess } from "../../Items/buttons"
import { cleanErrorDash } from "../../../state/actions/dashboard"
import Modal from "../../Items/modal"
import { useHistory } from "react-router-dom";
import {useIntl} from 'react-intl';
import {useToasts } from 'react-toast-notifications'
import VerifyAlert from "../../Items/verifyAlert"

const Header_3 = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    // const [dropdown, setDropdown] = useState(false);
    const { addToast } = useToasts()
    // let location = useLocation();
    const history = useHistory();

    const routeChange = () => {
        let path = `/premium?type=vip`;
        history.push(path);
    }
    const { auth, error2 } = useSelector(
        (state) => ({
            auth: state.auth,
            error2: state.dashboard.error,
        }), shallowEqual
    );
    // useEffect(() => {
    //     setDropdown(false)
    //     // eslint-disable-next-line
    // }, [location]);
    useEffect(() => {
        if(error2 && error2.error){
            if(error2.type !== "premium"){
                addToast(error2.error, { appearance: error2.type, autoDismiss:error2.autoDismiss, autoDismissTimeout:8000 })
                setTimeout(() => {
                    dispatch(cleanErrorDash())
                }, 100);
            }
        }
        // eslint-disable-next-line
    }, [error2]);
    return (<div className={styles.modalsPage}>


        {error2 && error2.type === "premium"  ? <Modal
            title={intl.formatMessage({id:"General.basarisizOldu"})}
            content={error2.error}
            status={error2 ? error2.type === "premium" ? true : false : false}
            width={400}
            buttons={<div><ButtonDark onClick={(e) => dispatch(cleanErrorDash())} style={{ flex: 1, borderRadius:10, height:50 }} text="schließen" /><ButtonSuccess onClick={(e) => { dispatch(cleanErrorDash()); routeChange() }} style={{ borderRadius:10, height:50, flex: 1, marginTop:0 }} text="Premium" /></div>}
            close={(e) => dispatch(cleanErrorDash())} /> : ""}

        {!auth.userData.verify ? <Modal title={intl.formatMessage({id:"General.neredeyseOldu"})} content={<VerifyAlert />} status="verify" width={500} />  : auth.error && auth.error.type ? <Modal title={auth.error.type === "success" ? intl.formatMessage({id:"General.basarili"}) : intl.formatMessage({id:"General.hata"})} content={auth.error.message} status={auth.error.type} width={400} close={(e) => dispatch(cleanErrorAuth())} /> : "" }
    </div>)
}
export default Header_3;
