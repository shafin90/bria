import React, { useEffect, useState } from 'react';
import SummarySection from './SummarySection';
import styles from './AdminDashboard.module.css';
import RecentBookings from './RecentBookings';
import { baseURL } from '../../baseUrl';
import image1 from "../../assets/nav-arrow-up-admin.png";
import image2 from "../../assets/rupee.png";
import image3 from '../../assets/nav-arrow-up-admin.png';
import image4 from "../../assets/cart.png";
import image5 from "../../assets/nav-arrow-down-admin.png";
import image6 from '../../assets/adminperson.png';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);


  useEffect(() => {
    fetch(`${baseURL}/dashboard/dashboard`)
      .then(res => res.json())
      .then(data => setDashboardData(data))
  }, [])

console.log(dashboardData)  

  return (
    <div className={styles.adminDashboardWrapper}>
      <h1>Dashboard</h1>
      <div className={styles.Summary}>
        <SummarySection data={`₹ ${dashboardData.totalRevenue}`} Text={"Total Revenue"} graphData={`${dashboardData.revenueDeviation}%`} graphIcon={image1} iconSrc={image2} />
        <SummarySection data={dashboardData.totalBookings} Text={"Bookings"} graphData={`${dashboardData.bookingDeviation}%`} graphIcon={image3} iconSrc={image4} />
        <SummarySection data={dashboardData.activeSession} Text={"Active Sessions"} graphData={dashboardData.recentBookingCountDeviation} graphIcon={image5} iconSrc={image6} />
      </div>
      <div className={styles.RecentBookings}>
        <RecentBookings />
      </div>
    </div>
  );
};

export default AdminDashboard;