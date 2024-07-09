import React from 'react';

const AboutImage = ({ src, alt, className }) => {
  return (
    <img src={src} alt={alt} className={`aboutImage ${className}`} />
  );
};

export default AboutImage;