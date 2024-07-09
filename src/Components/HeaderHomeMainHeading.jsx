import React from 'react';
import styles from './HeaderHomeMainHeading.module.css';

const HeaderHomeMainHeading = ({ Text }) => {
  return (
    <h1 className={styles.mainHeading}>
      {Text ? Text : "Welcome to Salon Name"}
    </h1>
  );
};

export default HeaderHomeMainHeading;