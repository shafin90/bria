import React from 'react';
import styles from './AdminTopBar.module.css';
import salon from '../../assets/SalonLogo.png';

const AdminTopBar = () => {
  return (
    <div className={styles.topBarWrapper}>
      <div className={styles.navBarWrapper}>
        <div className={styles.navLogo}>
          <img src={salon} alt="Bria Salon" />
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;