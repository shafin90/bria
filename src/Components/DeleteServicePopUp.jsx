import React from 'react';
import styles from './DeleteServicePopUp.module.css';
import close from '../../assets/hamburgerClose.png'

const DeleteServicePopUp = ({ onClose, onDelete }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <img 
          src={close} 
          alt="Close" 
          className={styles.closeIcon} 
          onClick={onClose} 
        />
        <h2>Delete Items</h2>
        <p>Are you sure you want to delete the selected item?</p>
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.deleteButton} onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteServicePopUp;