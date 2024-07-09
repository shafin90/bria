import React from 'react';
import styles from './AdminNavBarItems.module.css';

const AdminNavBarItems = ({ imageSrc, itemName, active, onClick }) => {
  return (
    <div className={active ? styles.activeItemWrapper : styles.itemWrapper} onClick={onClick}>
      <div className={styles.icon}>
        <img src={imageSrc} alt="" />
      </div>
      <div className={active ? styles.activeItemText : styles.itemText}>{itemName}</div>
    </div>
  );
};

export default AdminNavBarItems;