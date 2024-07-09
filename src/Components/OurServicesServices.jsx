import React from 'react';
import styles from './OurServicesServices.module.css';
import ServiceCard from './ServiceCard';

const OurServicesServices = ({ services }) => {
  return (
    <div className={styles.ourServicesWrapperExtended}>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          imageSrc={service.image}
          altText={service.title}
          serviceName={service.title}
        />
      ))}
    </div>
  );
};

export default OurServicesServices;