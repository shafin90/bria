import React from 'react';
import ServiceCard from './ServiceCard';

const WomenServices = () => {
  const services = [
    // Add paths to your images for women services
    { imageSrc: 'https://i.pinimg.com/236x/d6/da/ad/d6daada0b072020c5a602fcc4cffe9ce.jpg', altText: 'Hair Coloring', serviceName: 'Hair Coloring' },
    { imageSrc: 'https://i.pinimg.com/236x/d6/da/ad/d6daada0b072020c5a602fcc4cffe9ce.jpg', altText: 'Hair Coloring', serviceName: 'Hair Coloring' },
    { imageSrc: 'https://i.pinimg.com/236x/d6/da/ad/d6daada0b072020c5a602fcc4cffe9ce.jpg', altText: 'Hair Coloring', serviceName: 'Hair Coloring' },
    { imageSrc: 'https://i.pinimg.com/236x/d6/da/ad/d6daada0b072020c5a602fcc4cffe9ce.jpg', altText: 'Hair Coloring', serviceName: 'Hair Coloring' },
    { imageSrc: 'https://i.pinimg.com/236x/d6/da/ad/d6daada0b072020c5a602fcc4cffe9ce.jpg', altText: 'Hair Coloring', serviceName: 'Hair Coloring' },
    { imageSrc: 'https://i.pinimg.com/236x/d6/da/ad/d6daada0b072020c5a602fcc4cffe9ce.jpg', altText: 'Hair Coloring', serviceName: 'Hair Coloring' },
    { imageSrc: 'https://i.pinimg.com/236x/d6/da/ad/d6daada0b072020c5a602fcc4cffe9ce.jpg', altText: 'Hair Coloring', serviceName: 'Hair Coloring' },
    { imageSrc: 'https://i.pinimg.com/236x/d6/da/ad/d6daada0b072020c5a602fcc4cffe9ce.jpg', altText: 'Hair Coloring', serviceName: 'Hair Coloring' },
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

export default WomenServices;