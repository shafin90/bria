import React from 'react';
import styles from './AppointmentInfo.module.css';
import deleteIcon from '../../assets/appointmentDelete.png';

const AppointmentInfo = ({ imageSrc, serviceName, onDelete }) => {
  return (
    <div className={styles.appointmentInfo}>
      <img src={imageSrc} alt="Service" className={styles.serviceImage} />
      <div className={styles.serviceDetails}>
        <div className={styles.appointmentTitle}>Appointment info.</div>
        <div className={styles.serviceName}>{serviceName}</div>
      </div>
      <img 
        src={deleteIcon}
        alt="Delete" 
        className={styles.deleteIcon} 
        onClick={onDelete} 
      />
    </div>
  );
};

export default AppointmentInfo;