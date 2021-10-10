import React from 'react';
import styles from './Styles.module.scss';
import { NavLink } from 'react-router-dom';

const Index = ({icon, title, desc, iconStyle, link}) => {
  return (
    <div className={styles.listItem}>
        <div className={styles.icon}>
            <img src={icon} style={iconStyle} alt="" />
        </div>
      <div className={styles.content}>
        <NavLink to={link}>
        {title}
        </NavLink>
        <p>{desc ? desc : "-"}</p>
      </div>
    </div>
  );
};

export default Index;
