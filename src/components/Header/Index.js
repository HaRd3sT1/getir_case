import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './Styles.module.scss';
import Logo from "../../assets/img/logo.svg"
import Lock from "../../assets/img/icons/lock.svg"
import NumberFormat from 'react-number-format';

const Header = (props) => {
    const dispatch = useDispatch();
    const { basket} = useSelector(
      (state) => ({ 
        basket: state.basket
      }), shallowEqual
    );
    return (
        <div className={styles.header}>
          <div className="container">
            <div className={styles.content}>
              <img src={Logo} />
              <div className={styles.basket}>
                <img src={Lock} alt="" />
                ₺ {basket.total ? <NumberFormat value={basket.total} displayType={'text'} thousandSeparator={true} /> : "0,00"}
              </div>
            </div>
          </div>
        </div>

    );
};

export default Header;
