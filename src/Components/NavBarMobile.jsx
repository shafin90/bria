import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBarMobile.module.css';
import NavBarListItem from './NavBarListItem';
import logo from '../../assets/SalonLogo.png';
import hamburger from '../../assets/hamburger.png';
import close from '../../assets/hamburgerClose.png';

const NavBarMobile = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className={styles.navBarWrapper}>
        <Link to="/" className={styles.mobileNavLogo}>
          <img src={logo} alt="Bria Salon" />
        </Link>
        <div className={styles.hamburgerMenu} onClick={handleMenuToggle}>
          <img src={hamburger} alt="Menu" />
        </div>
      </div>
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.closeButton} onClick={handleCloseMenu}>
          <img src={close} alt="Close" />
        </div>
        <Link to="/" className={styles.mobileNavLogoInside}>
          <img src={logo} alt="Bria Salon" />
        </Link>
        <ul className={styles.mobileNavList}>
          <li><NavBarListItem listItem="Book appointment" to="/services" /></li>
          <li><NavBarListItem listItem="Services" to="/services" /></li>
          <li><NavBarListItem listItem="About us" to="/about" /></li>
          <li><NavBarListItem listItem="Contact us" to="/contact" /></li>
        </ul>
      </div>
    </>
  );
};

export default NavBarMobile;