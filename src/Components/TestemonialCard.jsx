import React from 'react';
import './TestemonialCard.css';
import image from '../../assets/testemonials.png';

const TestemonialCard = ({ name, text }) => {
  return (
    <div className='testemonialCard'>
      <div className='testemonialHeader'>{name}</div>
      <p className='testemonialText'>{text}</p>
      <div className='testemonialQuote'>
        <img src={image} alt="quote icon" />
      </div>
    </div>
  );
};

export default TestemonialCard;