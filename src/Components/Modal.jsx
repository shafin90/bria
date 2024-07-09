import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-container']}>
        <h2 className={styles['modal-header']}>Booking Details</h2>
        <div className={styles['modal-content']}>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Phone Number:</strong> {booking.phoneNumber}</p>
          <p><strong>Confirmation Code:</strong> {booking.confirmationCode}</p>
          <p><strong>Services:</strong></p>
          <ul>
            {booking.service.map((srv, index) => (
              <li key={index}>{srv.serviceName} - ${srv.servicePrice}</li>
            ))}
          </ul>
        </div>
        <button className={styles['modal-btn']} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;