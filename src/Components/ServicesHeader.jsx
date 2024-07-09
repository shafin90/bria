import React, {useState, useEffect} from 'react';
import styles from './ServicesHeader.module.css';
import HeaderHomeDiscount from './HeaderHomeDiscount';
import BookAppointmentButton from './BookAppointmentButton';
import image from '../../assets/Header Girl.png';

const ServicesHeader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 320 && window.innerWidth <= 640);
    };

    // Initialize the state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.headerBrandingWrapper}>
      <div className={styles.brandingText}>
        <div className={styles.brandingTextPart1}>
          <h1 className={styles.mainHeading}>
            Our Services
          </h1>
          <p className={styles.secondaryHeading}>
            Welcome to Bria Salon, at Bria Salon, we believe that beauty is not just about how you look, but how you feel. Nestled in the heart of Nellore  , Bria Salon is your premier destination for pampering and style. Whether you're looking for a stylish haircut, vibrant coloring, Skincare, we have the perfect service to enhance your natural beauty and leave you feeling revitalized.
          </p>
          {isMobile && <BookAppointmentButton buttonText={"Book Appointment"} />}
        </div>
        <div className={styles.brandingTextPart2}>
          <HeaderHomeDiscount />
        </div>
      </div>
      <div className={styles.brandingImage}>
        <img src={image} alt="Salon" />
      </div>
  </div>
  );
};

export default ServicesHeader;