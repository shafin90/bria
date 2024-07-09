import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './AdminNavBar.module.css';
import AdminNavBarItems from './AdminNavBarItems';
import home from '../../assets/home-simple.png';
import bookings from '../../assets/bookings.png';
import reports from '../../assets/reports.png';
import services from '../../assets/services.png';
import offers from '../../assets/offers.png';
import homehighlighted from '../../assets/highlightedHome.png';
import bookinghighlighted from '../../assets/highlightedBooking.png';
import reporthighlighted from '../../assets/highlightedReport.png';
import servicehighlighted from '../../assets/highlightedService.png';
import offershighlighted from '../../assets/highlightedOffers.png';

const AdminNavBar = () => {
  const navItems = [
    { imageSrc: home, itemName: 'Dashboard', path: '' },
    { imageSrc: bookings, itemName: 'Bookings', path: 'bookings' },
    { imageSrc: reports, itemName: 'Reports', path: 'reports' },
    { imageSrc: services, itemName: 'Services', path: 'services' },
    { imageSrc: offers, itemName: 'Offers', path: 'offers' },
  ];

  const highlightItems = [
    { imageSrc: homehighlighted, itemName: 'Dashboard', path: '' },
    { imageSrc: bookinghighlighted, itemName: 'Bookings', path: 'bookings' },
    { imageSrc: reporthighlighted, itemName: 'Reports', path: 'reports' },
    { imageSrc: servicehighlighted, itemName: 'Services', path: 'services' },
    { imageSrc: offershighlighted, itemName: 'Offers', path: 'offers' },
  ];

  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname.replace('/admin/', ''));

  useEffect(() => {
    setActiveItem(location.pathname.replace('/admin/', ''));
  }, [location]);

  const handleClick = (path) => {
    setActiveItem(path);
  };

  return (
    <div className={styles.adminNavBarWrapper}>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={`/admin/${item.path}`}
          className={({ isActive }) => isActive ? styles.activeItemWrapper : styles.itemWrapper}
          onClick={() => handleClick(item.path)}
          style={{ textDecoration: 'none' }}
        >
          <AdminNavBarItems
            imageSrc={activeItem === item.path ? highlightItems[index].imageSrc : item.imageSrc}
            itemName={item.itemName}
            active={activeItem === item.path}
          />
        </NavLink>
      ))}
    </div>
  );
};

export default AdminNavBar;