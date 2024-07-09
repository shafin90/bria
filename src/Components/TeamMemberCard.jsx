import React from 'react';
import AboutImage from './AboutImage';
import './TeamMemberCard.css';

const TeamMemberCard = ({ name, position, image }) => {
  return (
    <div className='teamMemberCard'>
      <AboutImage src={image} alt={name} className='teamMemberImage' />
      <h3>{name}</h3>
      <p>{position}</p>
    </div>
  );
};

export default TeamMemberCard;