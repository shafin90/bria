import React from 'react';
import './WhatsAppPromotion.css';
import image from '../../assets/redirectArrow.png';

const WhatsAppPromotion = () => {
  return (
    <div className='whatsAppPromoHomeWrapper'>
      <div className="whatsAppPromoHome">
        <div className="whatsAppPromoHomeText">
          <h1>Join our what’s app channel</h1>
          <p>Get regularly updated on your mobile through what’s app channel about the offers and services.</p>
        </div>
        <div className='redirectArrowWhatsApp'>
          <a href='#'><img src={image} alt='redirect arrow' /></a>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPromotion;