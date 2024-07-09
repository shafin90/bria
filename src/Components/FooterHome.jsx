import React, { useState, useEffect } from 'react';
import './FooterHome.css';
import BookAppointmentButton from './BookAppointmentButton';
import FooterMap from './FooterMap';
import FooterContact from './FooterContact';
import FooterVisit from './FooterVisit';
import FooterStayConnected from './FooterStayConnected';
import logo from '../../assets/SalonLogo.png';

const FooterHome = () => {
  const [isTabletScreen, setIsTabletScreen] = useState(window.innerWidth >= 640 && window.innerWidth <= 1439);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletScreen(window.innerWidth >= 640 && window.innerWidth <= 1439);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="footer">
      {isTabletScreen ? (
        <div className="tabletScreenDesign">
          <div className="footerPart1">
            <div className="footerLogo">
              <img src={logo} alt="" />
            </div>
            <BookAppointmentButton buttonText={"Book your Appointment"} route={"/services"} />
            <FooterVisit />
          </div>
          <div className="footerPart2">
            <FooterStayConnected />
            <FooterContact />
          </div>
        </div>
      ) : (
        <>
          <div className="footerPart1">
            <div className="footerOne">
              <div className="footerLogo">
                <img src={logo} alt="" />
              </div>
              <BookAppointmentButton buttonText={"Book your Appointment"} route={"/services"} />
              </div>
            <FooterVisit />
          </div>
          <div className="footerPart2">
            <FooterStayConnected />
            <FooterContact />
          </div>
        </>
      )}
      <div className="footerPart3">
        <FooterMap />
      </div>
    </div>
  );
};

export default FooterHome;