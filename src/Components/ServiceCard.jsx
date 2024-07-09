import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ServiceCard.module.css';
import image from "../../assets/arrowForwardServices.png"

const ServiceCard = ({ imageSrc, altText, serviceName }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    switch(serviceName.toLowerCase()) {
      case 'men':
        navigate('/services/men');
        break;
      case 'women':
        navigate('/services/women');
        break;
      case 'unisex':
        navigate('/services/unisex');
        break;
      case 'makeup':
        navigate('/services/makeup');
        break;
      case 'wedding':
        navigate('/services/wedding');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.serviceCard}>
      <img src={imageSrc} alt={altText} />
      <button className={styles.button} onClick={handleNavigation}>
        <img src={image} alt="" />
      </button>
      <div className={styles.serviceInfo}>
        <p>{serviceName}</p>
      </div>
    </div>
  );
};

export default ServiceCard;