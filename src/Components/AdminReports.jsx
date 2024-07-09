import React from 'react';
import UniqueVisits from './UniqueVisits';
import FrequentCustomers from './FrequentCustomers';
import TopServices from './TopServices';
import styles from './AdminReports.module.css';

const AdminReports = () => {
  return (
    <div className={styles.adminReport}>
      <UniqueVisits />
      <div className={styles.lowerSection}>
        <FrequentCustomers />
        <TopServices />
      </div>
    </div>
  );
};

export default AdminReports;