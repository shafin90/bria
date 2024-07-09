import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './AdminPannel.module.css';
import AdminTopBar from './AdminTopBar';
import AdminNavBar from './AdminNavBar';
import AdminDashboard from './AdminDashboard';
import AdminBookings from './AdminBookings';
import AdminReports from './AdminReports';
import AdminOfferManager from './AdminOfferManager';
import AdminServiceManger from './AdminServiceManger';

const AdminPannel = () => {
  return (
    <div className={styles.adminPannelWrapper}>
      <AdminTopBar />
      <div className={styles.BelowPart}>
        <AdminNavBar />
        <div className={styles.mainContent}>
          <Routes>
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="services" element={<AdminServiceManger />} />
            <Route path="offers" element={<AdminOfferManager />} />
            <Route path="*" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;