import React, { useState, useEffect } from 'react';
import styles from './YourOrder.module.css';
import AppointmentInfo from './AppointmentInfo';
import { useServices } from '../Context/ServicesContext';
import AppointmentBookingStep3 from './AppointmentBookingStep3';

const YourOrder = ({ setCurrentStep, currentStep, selectedDate, selectedTime }) => {
  const { selectedServices, setSelectedServices } = useServices();
  const [showPopup, setShowPopup] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= 320 && window.innerWidth < 1024);
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean-up function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDelete = (name) => {
    setSelectedServices(prevSelected => prevSelected.filter(service => service.name !== name));
  };

  const handleProceed = () => {
    setCurrentStep(2);
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime && selectedServices.length > 0) {
      // Perform actions like submitting the booking details

      setShowPopup(true); // Close any popups or modals
      setCurrentStep(3);
    } else {
      alert('Please select date, time, and at least one service to proceed.');
    }
  };

  const isServicesSelected = selectedServices.length > 0;
  const isDateTimeSelected = selectedDate && selectedTime;
  const buttonText = currentStep === 2 ? 'Confirm Booking' : 'Select Time';

  return (
    <>
      {isSmallScreen ? (
        <>
        <button
          className={`${styles.selectServiceButton} ${isServicesSelected && (currentStep === 1 || isDateTimeSelected) ? styles.active : ""}`}
          onClick={isServicesSelected && (currentStep === 1 || isDateTimeSelected) ? (currentStep === 2 ? handleConfirmBooking : handleProceed) : null}
          disabled={!isServicesSelected || (currentStep === 2 && !isDateTimeSelected)}
        >
          {isServicesSelected ? buttonText : "Select Service"}
        </button>
        {showPopup && <AppointmentBookingStep3 onClose={() => setShowPopup(false)} />}
        </>
      ) : (
        <div className={styles.orderContainer}>
          <div className={styles.firstPart}>
            <div className={styles.orderHeader}>Your Order</div>
            <div className={styles.salonName}>Bria Unisex Salon</div>
            <div className={styles.orderList}>
              {selectedServices.map((appointment, index) => (
                <AppointmentInfo
                  key={index}
                  imageSrc={appointment.img}
                  serviceName={appointment.serviceName}
                  onDelete={() => handleDelete(appointment.name)} 
                />
              ))}
            </div>
          </div>
          {/* Button section is directly used */}
          <button
            className={`${styles.selectServiceButton} ${isServicesSelected && (currentStep === 1 || isDateTimeSelected) ? styles.active : ""}`}
            onClick={isServicesSelected && (currentStep === 1 || isDateTimeSelected) ? (currentStep === 2 ? handleConfirmBooking : handleProceed) : null}
            disabled={!isServicesSelected || (currentStep === 2 && !isDateTimeSelected)}
          >
            {isServicesSelected ? buttonText : "Select Service"}
          </button>
          {showPopup && <AppointmentBookingStep3 onClose={() => setShowPopup(false)} />}
        </div>
      )}
    </>
  );
};

export default YourOrder;