import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Form.module.scss';
import Input from "../../components/Items/input"
import Textarea from "../../components/Items/textarea"
import {ButtonSuccess} from "../../components/Items/buttons"
import {sendContact} from "../../state/actions/form"
import {FormattedMessage} from 'react-intl';
const Contact = (props) => {
    const { loading} = useSelector(
        (state) => ({
        loading: state.auth.loading,
        }), shallowEqual
    );

  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(sendContact());
    props.close()
  };

  return (
      <div className={styles.content}>
        <form onSubmit={onSubmitHandler}>
            <Input name="email" type="email" label={<FormattedMessage id="Login.email" />} />
            <Input name="nickname" type="text" label={<FormattedMessage id="Register.nickname" />} />
            <Textarea name="meessage" label={<FormattedMessage id="General.mesaj" />} />
            <p><FormattedMessage id="General.iletisimMesaj" /></p>
            <ButtonSuccess style={{fontSize:16, textTransform:"uppercase", borderRadius:3, fontWeight:"500"}} classnamess="mt-4" text={<FormattedMessage id="Profile.mesajGonder" />} loading={loading ? "true" : ""} disabled={loading} />
        </form>
      </div>
  );
};

export default Contact;