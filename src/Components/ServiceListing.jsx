import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ServiceListing.module.css';
import SelectServicesCard from './SelectServicesCard';
import { baseURL } from '../../baseUrl';

const ServiceListing = ({ servicePath }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${baseURL}/service/getAllService`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Filter services based on servicePath
        const filteredByPath = data.services.filter(service => service.category === servicePath);

        // Now filter by serviceType within the filteredByPath array
        const filteredServices = filteredByPath.reduce((accumulator, service) => {
          if (!accumulator[service.serviceType]) {
            accumulator[service.serviceType] = [];
          }
          accumulator[service.serviceType].push(service);
          return accumulator;
        }, {});

        setServices(filteredServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [servicePath]);

  const handleCardClick = (service) => {
    navigate('/services/appointment-booking', { state: { selectedService: service, serviceType: servicePath } });
  };

  return (
    <>
      {Object.keys(services).map((serviceType, index) => (
        <div key={serviceType}>
          <div className={styles.title} style={{ marginTop: index === 0 ? '140px' : '0' }}>
            <h1>{serviceType}</h1>
          </div>
          <div className={styles.ourServicesWrapperExtended}>
            {services[serviceType].map((service, cardIndex) => (
              <SelectServicesCard
                key={cardIndex}
                imageSrc={service.img}
                altText={service.serviceName}
                serviceDesc={service.serviceDescription}
                serviceName={service.serviceName}
                onCardClick={() => handleCardClick(service)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ServiceListing;