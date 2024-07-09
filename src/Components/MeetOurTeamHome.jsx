// MeetOurTeamHome.js
import React from 'react';
import './MeetOurTeamHome.css';
import TeamMemberCard from './TeamMemberCard';
import image1 from '../../assets/team member 1.png';
import image2 from '../../assets/team member 2.png';

const teamMembers = [
  {
    name: 'Sunil Singh',
    position: 'Hairdresser',
    image: image1,
  },
  {
    name: 'Sanjana Singh',
    position: 'Hairdresser',
    image: image2,
  },
  {
    name: 'Sunil Singh',
    position: 'Hairdresser',
    image: image1,
  },
  {
    name: 'Sanjana Singh',
    position: 'Hairdresser',
    image: image2,
  },
];

const MeetOurTeamHome = () => {
  return (
    <div className='meetOurTeamHome'>
      <div className='meetOurTeamHeader'>
          <h1>Meet Our Team</h1>
          <p>Get to know the faces behind Bria Salon! Our talented team is dedicated to bringing out your best. From skilled stylists to friendly receptionists, we're here to make your experience unforgettable.</p>
      </div>
      <div className='teamMembers'>
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            position={member.position}
            image={member.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetOurTeamHome;