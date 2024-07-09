import React from 'react';
import BookAppointmentButton from './BookAppointmentButton';
import './AboutContent.css';

const AboutContent = ({ style, heading, para1, para2, buttonTextAbout, routeAbout }) => {
  return (
    <div className='aboutContent' style={style}>
      <div className="aboutContentPart1">
        <h2>{heading}</h2>
        <p>
          {para1}
        </p>
        <p>
          {para2}
        </p>
      </div>
      {buttonTextAbout && (
        <div className="aboutContentPart2">
          <BookAppointmentButton buttonText={buttonTextAbout} route={routeAbout} />
        </div>
      )}
    </div>
  );
};

export default AboutContent;