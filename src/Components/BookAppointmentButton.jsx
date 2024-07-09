import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookAppointmentButton.module.css';
import image from '../../assets/arrow-right-large.png';

const BookAppointmentButton = ({ buttonText, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <button className={styles.bookButton} onClick={handleClick}>
      <span className={styles.buttonText}>{buttonText}</span>
      <div className={styles.buttonIcon}>
        <img src={image} alt="" />
      </div>
    </button>
  );
};

export default BookAppointmentButton;