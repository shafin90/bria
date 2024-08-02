import React, { lazy, Suspense } from 'react';
import styles from './HeaderBranding.module.css';
import image from '../../assets/Header Girl.png';

const HeaderHomeMainHeading = lazy(() => import('./HeaderHomeMainHeading'));
const HeaderHomeSecondaryHeading = lazy(() => import('./HeaderHomeSecondaryHeading'));
const BookAppointmentButton = lazy(() => import('./BookAppointmentButton'));
const HeaderHomeDiscount = lazy(() => import('./HeaderHomeDiscount'));

const HeaderBranding = () => {
  return (
    <div className={styles.headerBrandingWrapper}>
      <div className={styles.brandingText}>
        <div className={styles.brandingTextPart1}>
          <div className={styles.brandingTextPart1one}>
            <Suspense fallback={<div>Loading...</div>}>
              <HeaderHomeMainHeading Text={"Find Your Perfect Style at Bria Unisex Salon."} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <HeaderHomeSecondaryHeading Text={"Discover Top-Notch Salon Treatments, Perfectly Tailored for You. Enjoy Excellence Every Time You Visit."} />
            </Suspense>
          </div>
          <div className={styles.brandingTextPart1two}>
            <Suspense fallback={<div>Loading...</div>}>
              <BookAppointmentButton buttonText={"Book Appointment"} route={"/services"} />
            </Suspense>
          </div>
        </div>
        <div className={styles.brandingTextPart2}>
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderHomeDiscount />
          </Suspense>
        </div>
      </div>
      <div className={styles.brandingImage}>
        <img src={image} alt="Salon" />
      </div>
    </div>
  );
};

export default HeaderBranding;
