import React from 'react';
import styles from './ServicesMainContent.module.css';
import OurServicesServices from './OurServicesServices';
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
    title: "Makeup"
  },
  {
    image: wedding,
    title: "Wedding"
  }
];

const ServicesMainContent = () => {
  return (
    <>
      <div className="Services">
        <div className={styles.servicesGrid}>
          <OurServicesServices services={services} />
        </div>
      </div>
    </>
  );
};

export default ServicesMainContent;