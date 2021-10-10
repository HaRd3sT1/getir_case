import React from 'react';
import styles from './Style.module.scss';
import { NavLink } from 'react-router-dom';

const Item = ({name, price}) => {
  return (
    <div className={styles.item}>
        {name}
    </div>
  );
};

export default Item;
