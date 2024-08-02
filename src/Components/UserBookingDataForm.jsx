import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserBookingDataForm.module.css';
import { useServices } from '../Context/ServicesContext';
import close from '../../assets/hamburgerClose.png';
import { baseURL } from '../../baseUrl';
import PromoConsentPopup from './PromoConsentPopup';

const UserBookingDataForm = ({ setNumber, setCurrentStep }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showConsentPopup, setShowConsentPopup] = useState(false);
  const { selectedServices, selectedDate, selectedTime, setSelectedName, setSelectedMobileNumber } = useServices();
  const navigate = useNavigate();



  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }


  useEffect(() => {
    const isValid = name.trim() !== '' && /^\+91\d{10}$/.test(mobileNumber);
    setIsFormValid(isValid);
  }, [name, mobileNumber]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleMobileNumberChange = (e) => {
    setMobileNumber(`+91${e.target.value.replace(/\D/g, '')}`)
    setNumber(`+91${e.target.value}`)
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      setSelectedName(name);
      setCurrentStep(prev => prev + 1)
      setSelectedMobileNumber(mobileNumber);


      const bookingData = {
        name,
        phoneNumber: mobileNumber,
        service: selectedServices.map(service => ({
          serviceName: service.serviceName,
          serviceImg: service.img,
          servicePrice: service.price,
        })),
        date: formatDate(selectedDate),
        time: selectedTime,
      };

      console.log(bookingData)


      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        };

        console.log(baseURL);

        const response = await fetch(`${baseURL}/booking/addBooking`, requestOptions);

        if (response.ok) {
          console.log('Booking submitted successfully');
          setShowConsentPopup(true);
        } else {
          console.error('Failed to submit booking');
          console.error(response);
          // Handle error scenario
        }
      } catch (error) {
        console.error('Error submitting booking:', error);
        // Handle error scenario
      }
    }
  };

  const handleConsent = () => {
    navigate('/services/bookedappointments', { state: { phoneNumber: mobileNumber } });
  };

  const onClose = () => {
    navigate('/services/bookedappointments', { state: { phoneNumber: mobileNumber } });
  };

  console.log(showConsentPopup)
  return (
    <>
      {/* className={styles.overlay} */}
      <div >
        <div className={styles.popup}>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={close} alt="Close" />
          </button>
          <div className="firstPart">
            <div className={styles.header}>Appointment Booking</div>
            <div className={styles.salonName}>Bria Unisex Salon</div>
            <div className={styles.personalInfo}>Personal Info.</div>
            <div className={styles.formGroup}>
              <label>Enter your name</label>
              <input
                className={styles.nameInput}
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Enter mobile number</label>
              <div className={styles.inputContainer}>
                <div className={styles.countryCode}>+91</div>
                <input
                  className={styles.mobileNo}
                  type="text"
                  value={mobileNumber.replace(/^\+91/, '')}
                  onChange={handleMobileNumberChange}
                />
              </div>
            </div>
          </div>
          <button
            className={`${styles.bookButton} ${isFormValid ? styles.active : ''}`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Book Appointment
          </button>
        </div>
      </div>
      {showConsentPopup && < PromoConsentPopup
        onConsent={handleConsent}
        onSkip={onClose}
      />
      }
    </>
  );
};

export default UserBookingDataForm;