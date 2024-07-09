import React, { useEffect, useState } from 'react';
import styles from './OurServicesHomeSlider.module.css';
import ServicesCardHome from './ServicesCardHome';

const OurServicesHomeSlider = ({ services }) => {
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

  const displayedServices = isMobile ? services.slice(0, 4) : services;

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.slider}>
        {displayedServices.map((service, index) => (
          <ServicesCardHome
            key={index}
            image={service.image}
            title={service.title}
            serviceName={service.title}
          />
        ))}
      </div>
    </div>
  );
};

export default OurServicesHomeSlider;