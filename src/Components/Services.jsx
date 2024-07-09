import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './Services.module.css';
import ServicesHeader from './ServicesHeader';
import ServicesMainContent from './ServicesMainContent';
import MenServices from './MenServices';
import WomenServices from './WomenServices';
import UnisexServices from './UnisexServices';
import MakeOverServices from './MakeOverServices';
import WeddingServices from './WeddingServices';

const ServicesSercives = () => {
  return (
    <>
        <Routes>
          <Route path='*' element={
          <>
            <div className={styles.headerServicesWrapper}>
              <ServicesHeader />
            </div>
            <div className={styles.mainContServicesWrapper}>
              <ServicesMainContent />
            </div>
          </>
          } />
          <Route path="men" element={<MenServices />} />
          <Route path="women" element={<WomenServices />} />
          <Route path="unisex" element={<UnisexServices />} />
          <Route path="makeup" element={<MakeOverServices />} />
          <Route path="wedding" element={<WeddingServices />} />
        </Routes>
    </>
  );
};

export default ServicesSercives;