import React, { useState } from 'react';
import styles from './SelectServiceCardBooking.module.css'; // Import your modular CSS file for styling
import close from '../../assets/hamburgerClose.png'; // Import the close icon
import infooverlay from '../../assets/infoOverlayIcon.png'; // Import the info overlay icon

const SelectServiceCardBooking = ({ imageSrc, altText, serviceName, serviceDescription, isSelected, onCardClick, onInfoClick }) => {
  const [info, setInfo] = useState(false);

  const handleInfoClick = (e) => {
    e.stopPropagation();
    setInfo(true);
    if (onInfoClick) {
      onInfoClick(e);
    }
  }

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setInfo(false);
  }

  return (
    <div className={`${styles.serviceCard} ${isSelected ? styles.selected : ''}`} onClick={onCardClick}>
      {info ? (
        <>
          <div className={styles.additionalInfo}>
            <p>{serviceDescription}</p>
          </div>
          <button className={styles.button} onClick={handleCloseClick}>
            <img src={close} alt="" />
          </button>
        </>
      ) : (
        <>
          <img className={styles.image} src={imageSrc} alt={altText} />
          <button className={styles.button} onClick={handleInfoClick}>
            <img src={infooverlay} alt="" />
          </button>
        </>
      )}
      <div className={styles.serviceInfo}>
        <p>{serviceName}</p>
      </div>
    </div>
  );
};

export default SelectServiceCardBooking;