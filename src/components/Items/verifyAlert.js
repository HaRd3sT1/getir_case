import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {ButtonPrimaryOutline, ButtonSecondary, ButtonDark} from "../../components/Items/buttons"
import {sendEmail, logout} from "../../state/actions/auth"
import {FormattedMessage, useIntl} from 'react-intl';
const VerifyAlert = (props) => {
  const dispatch = useDispatch();
  const { email } = useSelector(
      (state) => ({
          email: state.auth.userData && state.auth.userData.meta ? state.auth.userData.meta.email : ""
      }), shallowEqual
  );
  const intl = useIntl();
  const send = () =>{
    dispatch(sendEmail())
    if(props.close){
      props.close()
    }
  }
  return (
      <div className="text-center">
        <p><FormattedMessage id="Dashboard.verifyBaslik" /></p>
        <b>{email}</b>
        <br />
        {email ? <a rel="noopener noreferrer" target="_blank" className='my-4' href={"https://"+email.split("@")[1]}>
          <ButtonPrimaryOutline style={{borderRadius:10}} text={intl.formatMessage({id:"Dashboard.gidecekMail"})+" "+email.split("@")[1]} />
        </a> : ""}
        <p><FormattedMessage id="Dashboard.verify1" /></p>
        <p><FormattedMessage id="Dashboard.verify2" /></p>
        <b><FormattedMessage id="Dashboard.verify3" /></b>
        <br/>
        <br/>
        <div className="d-flex justify-content-center mb-3">
          <ButtonSecondary onClick={send} classnamess="mr-3 w-100" text={intl.formatMessage({id:"Dashboard.tekrarMailGonder"})} />
          {props.close ? <ButtonDark onClick={props.close} classnamess="w-100" text={intl.formatMessage({id:"Dashboard.kapat"})} /> : <ButtonDark onClick={(e) => dispatch(logout())} classnamess="w-100" text={intl.formatMessage({id:"Dashboard.cikisYap"})} />}
        </div>
      </div>        
  );
};

export default VerifyAlert;