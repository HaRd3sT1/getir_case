import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './Form.module.scss';
import Input from "../../components/Items/input"
import {ButtonSuccess} from "../../components/Items/buttons"
// import {resetPassword} from "../../state/actions/auth"
const ResetPassword = (props) => {
    const { loading} = useSelector(
        (state) => ({
        loading: state.auth.loading,
        }), shallowEqual
    );

  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   dispatch(resetPassword());
  // };

  return (
      <div className={styles.content}>
        <div className={styles.boxHeader}><p>Setzen Sie Ihr Passwort zuruck</p><hr/></div>
      <form onSubmit={(e) => { e.preventDefault(); props.submit()}}>
        <Input name="password" type="password" label="Passwort" />
        <ButtonSuccess style={{fontSize:16, textTransform:"uppercase", borderRadius:3, fontWeight:"500"}} text="Passwort zurücksetzen" loading={loading ? "true" : ""} disabled={loading} />
        </form>
      </div>
  );
};

export default ResetPassword;