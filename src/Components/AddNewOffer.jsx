import React, { useState, useEffect } from 'react';
import styles from './AddNewOffer.module.css';
import NewOfferAddedPopUp from './NewOfferAddedPopUp';
import moment from 'moment';
import addButton from '../../assets/addButton.png';
import { baseURL } from '../../baseUrl';

const AddNewOffer = ({ onBack, onContinue, editData }) => {
  const [offerName, setOfferName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    if (editData) {
      setOfferName(editData.offerName || '');

      // Format startDate and endDate using Moment.js
      const formattedStartDate = formatDate(editData.startDate);
      const formattedEndDate = formatDate(editData.endDate);

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);

      setUsageLimit(editData.usageLimit?.toString() || '');
      setStatus(editData.status || 'Active');
      setImage(editData.offerImg || '');
      setUploadProgress(100);
    }
  }, [editData]);

  function formatDate(dateString) {
    // Use moment with format to explicitly parse the date string
    const formattedDate = moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD');
    return formattedDate;
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
      simulateUploadProgress(file);
    } else {
      alert('Please upload a valid image file (jpg or png).');
      e.target.value = null;
    }
  };

  const handleSubmit = async () => {
    if (!offerName || !startDate || !endDate || !usageLimit || !image || startDateError || endDateError) {
      alert('Please fill in all the fields correctly and upload an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('offerName', offerName);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('usageLimit', parseInt(usageLimit));
      formData.append('status', status);
      formData.append('offerImg', image);

      const url = editData 
        ? `${baseURL}/offer/editOffer/${editData._id}`
        : `${baseURL}/offer/addOffer`;
      const method = editData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setShowPopup(true);

      if (editData) {
        setPopupTitle('Offer Updated Successfully');
        setPopupMessage('Edited 1 offer in your Salon');
      } else {
        setPopupTitle('Offer Added Successfully');
        setPopupMessage('Added 1 new offer to your Salon');
      }
    } catch (error) {
      console.error('Error adding offer:', error);
      alert('Failed to add new offer. Please try again.');
    }
  };

  const handleCancel = () => {
    setOfferName('');
    setStartDate('');
    setEndDate('');
    setUsageLimit('');
    setStatus('Active');
    setImage(null);
    setUploadProgress(0);
    onBack();
  };

  const validateStartDate = (date) => {
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      setStartDateError('Start date must be today or a future date.');
    } else {
      setStartDateError('');
    }
    setStartDate(date);
  };

  const validateEndDate = (date) => {
    if (date <= startDate) {
      setEndDateError('End date must be after the start date.');
    } else {
      setEndDateError('');
    }
    setEndDate(date);
  };

  return (
    <div className={styles.addNewServiceWrapper}>
      <div className={styles.header}>
        <img src={addButton} alt="Back" onClick={onBack} className={styles.backIcon} />
        <h2 className={styles.title}>Offers</h2>
      </div>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Offer Name</label>
          <input
            type="text"
            placeholder="e.g. Flat 20% Discount on Facial"
            value={offerName}
            onChange={(e) => setOfferName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Images</label>
          <div className={styles.imageUpload}>
            <button
              className={styles.uploadButton}
              onClick={() => document.querySelector(`.${styles.fileInput}`).click()}
            >
              Add File
            </button>
            <p>Or drag and drop files</p>
            {image && (
              <div className={styles.imagePreview}>
                <p>{typeof image === 'string' ? 'Image loaded' : image.name}</p>
                {uploadProgress > 0 && (
                  <div className={styles.uploadProgress}>
                    <div
                      className={styles.uploadProgressBar}
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUpload}
            className={styles.fileInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => validateStartDate(e.target.value)}
            className={`${styles.input} ${startDateError && styles.inputError}`}
          />
          {startDateError && <p className={styles.errorMsg}>{startDateError}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => validateEndDate(e.target.value)}
            className={`${styles.input} ${endDateError && styles.inputError}`}
          />
          {endDateError && <p className={styles.errorMsg}>{endDateError}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label>Usage Limit</label>
          <input
            type="text"
            placeholder="Number of uses"
            value={usageLimit}
            onChange={(e) => setUsageLimit(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Offer Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.input}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.submitButton} onClick={handleSubmit}>
          {editData ? 'Update Offer' : 'Add Offer'}
        </button>
      </div>
      {showPopup && (
        <NewOfferAddedPopUp
          title={popupTitle}
          message={popupMessage}
          onClose={() => setShowPopup(false)}
          onContinue={onContinue}
        />
      )}
    </div>
  );
};

export default AddNewOffer;