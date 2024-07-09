import React from 'react';
import styles from './ProgressSteps.module.css';
import navArrow from '../../assets/nav-arrow-right.png';

const ProgressSteps = ({ currentStep }) => {
  return (
    <div className={styles.progressSteps}>
      <span className={currentStep === 1 ? styles.active : ''}>Service</span>
      <img src={navArrow} alt="" />
      <span className={currentStep === 2 ? styles.active : ''}>Time</span>
      <img src={navArrow} alt="" />
      <span className={currentStep === 3 ? styles.active : ''}>Done</span>
    </div>
  );
};

export default ProgressSteps;