import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ServicesSelection.module.css';
import SelectServiceCardBooking from './SelectServiceCardBooking';
import { useServices } from '../Context/ServicesContext';
import { baseURL } from '../../baseUrl';

const ServicesSelection = ({ serviceType }) => {
  const { selectedServices, setSelectedServices } = useServices();
  const location = useLocation();
  const { state } = location;

  // Update selected services when a service is selected from another page
  useEffect(() => {
    if (state && state.selectedService) {
      setSelectedServices((prevSelected) => {
        if (!prevSelected.some((service) => service._id === state.selectedService._id)) {
          return [...prevSelected, state.selectedService];
        }
        return prevSelected;
      });
    }
  }, [state, setSelectedServices]);

  // State to hold all services fetched from the API
  const [services, setServices] = useState([]);

  // Fetch services from the API when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${baseURL}/service/getAllService`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setServices(data.services);
        console.log(data.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Function to handle click on a service card (toggle selection)
  const handleCardClick = (service) => {
    setSelectedServices((prevSelected) => {
      const isServiceSelected = prevSelected.some((prev) => prev._id === service._id);
      if (isServiceSelected) {
        return prevSelected.filter((prev) => prev._id !== service._id);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  // Filter out services that are selected
  const selectedServiceIds = selectedServices.map((service) => service._id);
  const selectedServiceCards = services.filter((service) => selectedServiceIds.includes(service._id));

  // Filter out services that are available but not selected (based on serviceType)
  const otherServiceCards = services.filter(
    (service) => service.category === serviceType && !selectedServiceIds.includes(service._id)
  );

  return (
    <div className={styles.serviceSelectionWrapper}>
      <div className={styles.firstPart}>
        <span>Select Service</span>
      </div>
      <div className={styles.secondPart}>
        <div className={styles.servicesContainer}>
          {selectedServiceCards.map((service, index) => (
            <SelectServiceCardBooking
              key={index}
              imageSrc={service.img}
              altText={service.serviceName}
              serviceName={service.serviceName}
              servicePrice={service.price}
              serviceDescription={service.serviceDescription}
              isSelected={true}
              onCardClick={() => handleCardClick(service)}
            />
          ))}
          {selectedServiceCards.length > 0 && (
            <div className={styles.anythingElse}>
              <span>Anything else you wish to add?</span>
            </div>
          )}
          {otherServiceCards.map((service, index) => (
            <SelectServiceCardBooking
              key={index}
              imageSrc={service.img}
              altText={service.serviceName}
              serviceName={service.serviceName}
              servicePrice={service.price}
              serviceDescription={service.serviceDescription}
              isSelected={false}
              onCardClick={() => handleCardClick(service)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSelection;