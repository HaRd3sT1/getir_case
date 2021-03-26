import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Form.module.scss';
import Input from "../../components/Items/input"
import {ButtonSuccess} from "../../components/Items/buttons"
import {loginAuth} from "../../state/actions/auth"
import {FormattedMessage} from 'react-intl';
const Login = () => {
    const { loading} = useSelector(
        (state) => ({
        loading: state.auth.loading,
        }), shallowEqual
    );

  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loginAuth());
  };
  return (
      <div className={styles.content}>
        <div className={styles.boxHeader}><p><FormattedMessage id="Login.title" /></p><hr/></div>
      
        <form>
          <Input name="email" type="email" label={<FormattedMessage id="Login.email" />} />
          <Input name="password" type="password" label={<FormattedMessage id="Login.password" />} />
          <ButtonSuccess onClick={onSubmitHandler} style={{fontSize:16, textTransform:"uppercase", borderRadius:3, fontWeight:"500"}} text={<FormattedMessage id="Login.giris_yap" />} loading={loading ? "true" : ""} disabled={loading} />
        </form>
      </div>
  );
};

export default Login;