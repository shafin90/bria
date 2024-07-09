import React from 'react';
import './FooterStayConnected.css';
import insta from '../../assets/instagram icon.png';
import whatsapp from '../../assets/whatsapp icon.png';
import youtube from '../../assets/youtube icon.png';

const FooterStayConnected = () => {
  return (
    <div className="footerStayConnectedWrapper">
      <h2>Stay Connected with us</h2>
      <p>
        <span className="icon"><img src={insta} alt="Instagram" /></span>
        <span className="text">Follow us on Instagram</span>
      </p>
      <p>
        <span className="icon"><img src={whatsapp} alt="WhatsApp" /></span>
        <span className="text">Join our WhatsApp Channel</span>
      </p>
      <p>
        <span className="icon"><img src={youtube} alt="YouTube" /></span>
        <span className="text">YouTube</span>
      </p>
    </div>
  );
};

export default FooterStayConnected;