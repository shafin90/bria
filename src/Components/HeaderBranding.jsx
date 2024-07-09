import React from 'react';
import styles from './HeaderBranding.module.css';
import HeaderHomeMainHeading from './HeaderHomeMainHeading';
import HeaderHomeSecondaryHeading from './HeaderHomeSecondaryHeading';
import BookAppointmentButton from './BookAppointmentButton';
import HeaderHomeDiscount from './HeaderHomeDiscount';
import image from '../../assets/Header Girl.png';

const HeaderBranding = () => {
  return (
    <div className={styles.headerBrandingWrapper}>
      <div className={styles.brandingText}>
        <div className={styles.brandingTextPart1}>
          <div className={styles.brandingTextPart1one}>
            <HeaderHomeMainHeading Text={"Find Your Perfect Style at Bria Unisex Salon."} />
            <HeaderHomeSecondaryHeading Text={"Discover Top-Notch Salon Treatments, Perfectly Tailored for You. Enjoy Excellence Every Time You Visit."} />
          </div>
          <div className={styles.brandingTextPart1two}>
            <BookAppointmentButton buttonText={"Book Appointment"} route={"/services"} />
          </div>
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

export default HeaderBranding;