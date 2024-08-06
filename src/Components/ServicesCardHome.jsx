import React from 'react';
import styles from './ServicesCardHome.module.css';
import { useNavigate } from 'react-router-dom';
import arrowImage from '../../assets/arrowForwardServices.png';

const ServicesCardHome = ({ image, title, serviceName }) => {
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
      case 'makeover':
        navigate('/services/makeover');
        break;
      case 'wedding':
        navigate('/services/wedding');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.card} onClick={handleNavigation} style={{cursor:"pointer"}}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
      </div>
      <button className={styles.button} >
        <img src={arrowImage} alt="" />
      </button>
    </div>
  );
};

export default ServicesCardHome;