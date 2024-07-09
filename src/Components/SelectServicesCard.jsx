import React, { useState } from 'react';
import styles from './SelectServicesCard.module.css';
import close from '../../assets/hamburgerClose.png';
import infooverlay from '../../assets/infoOverlayIcon.png';

const SelectServicesCard = ({ imageSrc, altText, serviceName, serviceDesc, isSelected, onCardClick, onInfoClick }) => {
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
            <p>{serviceDesc}</p>
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

export default SelectServicesCard;