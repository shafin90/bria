import React from 'react';
import styles from './NewServiceAddedPopUp.module.css';
import image from '../../assets/checkIcon.png';

const NewServiceAddedPopUp = ({ title, message, onContinue }) => {
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <div className={styles.checkmark}>
          <img src={image} alt="" />
        </div>
        <div className={styles.onePart}>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
        <button className={styles.continueButton} onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default NewServiceAddedPopUp;