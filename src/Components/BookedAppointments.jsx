import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './BookedAppointments.module.css';
import salonImage from '../../assets/Salon image booking.png';
import image from '../../assets/checkIconGreen.png';
import image2 from '../../assets/google.png';
import { baseURL } from '../../baseUrl';

const BookedAppointments = () => {
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;
  const formattedPhoneNumber = phoneNumber ? phoneNumber.replace('+', '') : '';
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (phoneNumber) {
      fetch(`${baseURL}/booking/getParticularBooking/${formattedPhoneNumber}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched booking data', data.getParticularBooking);
          if (data.getParticularBooking !== null) {
            setBookingData(data.getParticularBooking);
          }
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch booking data', error);
          setIsLoading(false);
        });
    }
  }, [formattedPhoneNumber]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftPane}>
          <div className={styles.confirmationMessage}>
            <div className={styles.checkIcon}>
              <img src={image} alt="Check" />
            </div>
            {isLoading ? (
              <>Loading...</>
            ) : (
              bookingData ? (
                <>Hey {bookingData.name}, your appointment is confirmed</>
              ) : (
                <>No booking data found</>
              )
            )}
          </div>
          {bookingData && (
            <div className={styles.bookingInfo}>
              <div className={styles.header}>Booking Information</div>
              <div className={styles.salonName}>Bria Unisex Salon</div>
              {bookingData.service.map((servicepath, index) => (
                <div className={styles.appointmentInfo} key={index}>
                  <img src={servicepath.serviceImg} alt={servicepath.serviceName} className={styles.serviceImage} />
                  <div className={styles.servicesInfo}>
                    <h1>Appointment Info.</h1>
                    <div className={styles.serviceName}>{servicepath.serviceName}</div>
                    <div className={styles.serviceName}>Price: {servicepath.servicePrice}</div>
                  </div>
                </div>
              ))}
              <div className={styles.serviceTime}>Time: {bookingData.time}</div>
              <div className={styles.serviceDate}>Date: {new Date(bookingData.date).toLocaleDateString()}</div>
              <div className={styles.confirmationCode}>
                <h1>Confirmation code</h1>
                <div className={styles.code}>{bookingData.confirmationCode}</div>
              </div>
              <div className={styles.addToCalander}>
                <h1>Add to calendar</h1>
                <button className={styles.calendarIcon}>
                  <img src={image2} alt="Calendar" />
                  <h2>Google</h2>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.rightPane}>
          <img src={salonImage} alt="Salon" className={styles.salonImage} />
        </div>
      </div>
    </>
  );
};

export default BookedAppointments;