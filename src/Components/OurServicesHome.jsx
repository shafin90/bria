import React, { useState, useEffect } from 'react';
import styles from './OurServicesHome.module.css';
import AboutContent from './AboutContent';
import OurServicesHomeSlider from './OurServicesHomeSlider';
import BookAppointmentButton from './BookAppointmentButton';
import men from '../../assets/men.png';
import women from '../../assets/women.png';
import unisex from '../../assets/unisex.png';
import makeup from '../../assets/makeup.png';
import wedding from '../../assets/wedding.png';

const services = [
  {
    image: men,
    title: "Men"
  },
  {
    image: women,
    title: "Women"
  },
  {
    image: unisex,
    title: "Unisex"
  },
  {
    image: makeup,
    title: "Makeover"
  },
  {
    image: wedding,
    title: "Wedding"
  }
];

const OurServicesHome = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.ourServicesHomeWrapper}>
      <AboutContent
        style={{ marginTop: '3%' }}
        heading={"Our Services"}
        para1={"Welcome to Bria Salon, where beauty meets expertise. Our experienced team is dedicated to delivering top-quality beauty and wellness services with personalized attention and exceptional care for every client."}
        para2={"Whether you want a great haircut, beautiful color, refreshing skincare, or pampering nail care, we have the perfect service to make you look and feel amazing."}
        buttonTextAbout={isMobile ? undefined : "Explore Services"}
        routeAbout={"/services"}
      />
      <div className={styles.ourServicesHomeSliderWrapper}>
        <div className={styles.servicesGrid}>
          <OurServicesHomeSlider services={services} />
        </div>
        {isMobile && <BookAppointmentButton buttonText="Explore Services" route={"/services"} />}
      </div>
    </div>
  );
};

export default OurServicesHome;