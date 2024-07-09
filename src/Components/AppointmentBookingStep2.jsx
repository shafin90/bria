import React from 'react';
import SelectDate from './SelectDate';

const AppointmentBookingStep2 = ({ onDateTimeChange }) => {
  return (
    <>
      <SelectDate onDateTimeChange={onDateTimeChange} />
    </>
  );
};

export default AppointmentBookingStep2;