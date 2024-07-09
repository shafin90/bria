import React from 'react';
import styles from './HeaderHomeSecondaryHeading.module.css';

const HeaderHomeSecondaryHeading = ({ Text }) => {
  return (
    <p className={styles.secondaryHeading}>
      {Text ? Text : "We are here to make you look good."}
    </p>
  );
};

export default HeaderHomeSecondaryHeading;