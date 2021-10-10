import React from 'react';
import PropTypes from 'prop-types';
import styles from './Styles.module.scss';
import Header from "../Header/Index"

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
