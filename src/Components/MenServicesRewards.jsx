import React from 'react';
import ServiceCard from './ServiceCard';

const MenServices = () => {
  const services = [
    // Add paths to your images for men services
    { imageSrc: 'https://i.pinimg.com/236x/84/91/9e/84919ec8651f0d2af319d9caaac16699.jpg', altText: 'Hair Shampoo treatment', serviceName: 'Hair Shampoo treatment' },
    { imageSrc: 'https://i.pinimg.com/236x/84/91/9e/84919ec8651f0d2af319d9caaac16699.jpg', altText: 'Hair Shampoo treatment', serviceName: 'Hair Shampoo treatment' },
    { imageSrc: 'https://i.pinimg.com/236x/84/91/9e/84919ec8651f0d2af319d9caaac16699.jpg', altText: 'Hair Shampoo treatment', serviceName: 'Hair Shampoo treatment' },
    { imageSrc: 'https://i.pinimg.com/236x/84/91/9e/84919ec8651f0d2af319d9caaac16699.jpg', altText: 'Hair Shampoo treatment', serviceName: 'Hair Shampoo treatment' },
    { imageSrc: 'https://i.pinimg.com/236x/84/91/9e/84919ec8651f0d2af319d9caaac16699.jpg', altText: 'Hair Shampoo treatment', serviceName: 'Hair Shampoo treatment' },
    { imageSrc: 'https://i.pinimg.com/236x/84/91/9e/84919ec8651f0d2af319d9caaac16699.jpg', altText: 'Hair Shampoo treatment', serviceName: 'Hair Shampoo treatment' },
    { imageSrc: 'https://i.pinimg.com/236x/84/91/9e/84919ec8651f0d2af319d9caaac16699.jpg', altText: 'Hair Shampoo treatment', serviceName: 'Hair Shampoo treatment' },
    { imageSrc: 'https://i.pinimg.com/236x/84/91/9e/84919ec8651f0d2af319d9caaac16699.jpg', altText: 'Hair Shampoo treatment', serviceName: 'Hair Shampoo treatment' },
    // Add more services as needed
  ];

  return (
    <>
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </>
  );
};

export default MenServices;