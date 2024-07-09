import React from 'react';
import NavBarLaptop from './NavBarLaptop';
import NavBarMobile from './NavBarMobile';
import styles from './NavBar.module.css';

const NavBar = () => {
  const isMobile = window.innerWidth < 640;

  return (
    <>
    <div className={styles.NavBarWrapper}>
      {isMobile ? <NavBarMobile /> : <NavBarLaptop />}
    </div>
    </>
  );
};

export default NavBar;