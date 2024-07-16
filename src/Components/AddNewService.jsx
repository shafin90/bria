import React, { useState, useEffect } from 'react';
import styles from './AddNewService.module.css';
import NewServiceAddedPopUp from './NewServiceAddedPopUp';
import backButton from '../../assets/backIcon.png';
import { baseURL } from '../../baseUrl';

const AddNewService = ({ onBack, onContinue, editData }) => {
  const serviceTypes = [
    "Men Hair Cut & Styling",
    "Shaving",
    "Women’s Hair Cut",
    "Blow Dry",
    "Beauty Dermalogica",
    "SeaSoul",
    "Make up",
    "Bride",
    "Bride Groom Package",
    "Deluxe for groom",
    "Hair Colour",
    "Treatment",
    "Threading",
    "Reflexology",
    "Facial",
    "Bleach or de tan",
    "Manicure and Pedicure",
    "Nail extension and gel polish",
    "Waxing",
    "Microbleeding"
  ];

  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [category, setCategory] = useState('');
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    if (editData) {
      const data = editData; // Assuming only one object in editData array

      setServiceName(data.serviceName || '');
      setServiceDescription(data.serviceDescription || '');
      setServicePrice(data.price ? data.price.toString() : '');
      setImagePreview(data.img || '');
      setCategory(data.category || '');
      setServiceType(data.serviceType || serviceTypes[0]);
    }
  }, [editData]);

  const handleSubmit = async () => {
    if (!serviceName || !serviceDescription || !servicePrice || !category || !serviceType) {
      alert('Please fill in all the fields.');
      return;
    }

    if (!image && !imagePreview) {
      alert('Please upload an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('serviceName', serviceName);
      formData.append('serviceDescription', serviceDescription);
      formData.append('price', parseFloat(servicePrice));
      formData.append('category', category);
      formData.append('serviceType', serviceType);

      if (image) {
        formData.append('img', image);
      } else {
        formData.append('img', imagePreview); // In case of editing, the image might already be on the server
      }

      const serviceUrl = editData
        ? `${baseURL}/service/editService/${editData._id}`
        : `${baseURL}/service/addService`;

      const serviceMethod = editData ? 'PUT' : 'POST';

      const serviceResponse = await fetch(serviceUrl, {
        method: serviceMethod,
        body: formData,
      });

      if (!serviceResponse.ok) {
        throw new Error('Failed to submit service');
      }

      const serviceResponseData = await serviceResponse.json();
      console.log('Response from server:', serviceResponseData);

      setShowPopup(true);
      if (editData && editData.length > 0) {
        setPopupTitle('Services Updated Successfully');
        setPopupMessage('Edited 1 service in your Salon');
      } else {
        setPopupTitle('Services Added Successfully');
        setPopupMessage('Added 1 new service to your Salon');
      }
    } catch (error) {
      console.error('Error submitting the service:', error.message);
      alert('There was an error submitting the service. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      simulateUploadProgress(file);
    } else {
      alert('Please upload a valid image file (jpg or png).');
      e.target.value = null;
    }
  };

  const simulateUploadProgress = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      simulateUploadProgress(file);
    } else {
      alert('Please upload a valid image file (jpg or png).');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  return (
    <div className={styles.addNewServiceWrapper}>
      <div className={styles.header}>
        <img src={backButton} alt="Back" onClick={onBack} className={styles.backIcon} />
        <h2 className={styles.title}>{editData && editData.length > 0 ? 'Edit Service' : 'Add New Service'}</h2>
      </div>
      <div className={styles.FormWrapper}>
        <div className={styles.form}>
          <div className={styles.information}>
            <h3 className={styles.formTitle}>Information</h3>
            <div className={styles.inputGroup}>
              <label>Service Name</label>
              <input
                type="text"
                placeholder="Enter Service name"
                className={styles.input}
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Service Description</label>
              <textarea
                style={{ width: '100%', height: '120px' }}
                placeholder="Enter Service description"
                className={styles.textarea}
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              ></textarea>
            </div>
            <div className={styles.inputGroup}>
              <label>Service Type</label>
              <select
                className={styles.select}
                value={serviceType}
                onChange={(e) => {
                  console.log(e.target.value);
                  setServiceType(e.target.value);
                }}
              >
                {serviceTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <hr />
            <div className={styles.inputGroup}>
              <h3 className={styles.formTitle}>Image</h3>
              <div
                className={styles.imageUpload}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <button
                  className={styles.uploadButton}
                  onClick={() => document.querySelector(`.${styles.fileInput}`).click()}
                >
                  Add File
                </button>
                <p>Or drag and drop files</p>
                {image && (
                  <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="Preview" className={styles.previewImage} />
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
            <hr />
            <div className={styles.inputGroup}>
              <h3 className={styles.formTitle}>Price</h3>
              <label>Service Price</label>
              <input
                type="text"
                placeholder="Enter Service Price"
                className={styles.input}
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.formCategories}>
          <div className={styles.categories}>
            <div className={styles.firstPart}>
              <h3>Categories</h3>
              <label className={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="category"
                  value="men"
                  checked={category === 'men'}
                  onChange={() => handleCategoryChange('men')}
                />
                Men
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="category"
                  value="women"
                  checked={category === 'women'}
                  onChange={() => handleCategoryChange('women')}
                />
                Women
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="category"
                  value="unisex"
                  checked={category === 'unisex'}
                  onChange={() => handleCategoryChange('unisex')}
                />
                Unisex
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="category"
                  value="makeup"
                  checked={category === 'makeup'}
                  onChange={() => handleCategoryChange('makeup')}
                />
                Makeup
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="radio"
                  name="category"
                  value="wedding"
                  checked={category === 'wedding'}
                  onChange={() => handleCategoryChange('wedding')}
                />
                Wedding
              </label>
            </div>
            <button className={styles.addMoreButton}>Add more</button>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancelButton} onClick={onBack}>Cancel</button>
        <button className={styles.saveButton} onClick={handleSubmit}>
          {editData && editData.length > 0 ? 'Save Changes' : 'Save'}
        </button>
      </div>
      {showPopup && <NewServiceAddedPopUp title={popupTitle} message={popupMessage} onContinue={onContinue} />}
    </div>
  );
};

export default AddNewService;