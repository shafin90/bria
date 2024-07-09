import React from 'react';
import styles from './NewServiceAddedPopUp.module.css';
import check from '../../assets/checkIcon.png';

const NewServiceAddedPopUp = ({ onContinue }) => {
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <div className={styles.checkmark}>
          <img src={check} alt="" />
        </div>
        <div className={styles.onePart}>
          <h2>Offers Updated Successfully</h2>
          <p>Added 1 new Offer to your Salon</p>
        </div>
        <button className={styles.continueButton} onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default NewServiceAddedPopUp;