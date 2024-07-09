import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBarLaptop.module.css';
import NavBarListItem from './NavBarListItem';
import BookAppointmentButton from './BookAppointmentButton';
import logo from '../../assets/SalonLogo.png';

const NavBarLaptop = () => {
  return (
    <div className={styles.navBarWrapper}>
      <ul className={styles.navList}>
        <li><NavBarListItem listItem="Contact us" to="/contact" /></li>
        <li><NavBarListItem listItem="About us" to="/about" /></li>
        <li><NavBarListItem listItem="Services" to="/services" /></li>
      </ul>
      <Link to="/" className={styles.navLogo}>
        <img src={logo} alt="Bria Salon" />
      </Link>
      <div className={styles.navButtons}>
        <BookAppointmentButton buttonText={"Book Appointment"} route={"/services/appointment-booking-step2"} />
      </div>
    </div>
  );
};

export default NavBarLaptop;