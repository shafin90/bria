import React, { createContext, useContext, useState } from 'react';

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [selectedMobileNumber, setSelectedMobileNumber] = useState('');

  const setSelectedDateTime = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };
  

  return (
    <ServicesContext.Provider value={{ 
      selectedServices, setSelectedServices, 
      selectedDate, setSelectedDate, 
      selectedTime, setSelectedTime, 
      selectedName, setSelectedName, 
      selectedMobileNumber, setSelectedMobileNumber,
      setSelectedDateTime,
    }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);