import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Services from './Components/Services';
import AdminPannel from './Components/AdminPannel';
import AdminLogin from './Components/AdminLogin';
import NavBar from './Components/NavBar';
import FooterHome from './Components/FooterHome';
import AppointmentBookingMain from './Components/AppointmentBookingMain';
import { ServicesProvider } from './Context/ServicesContext';
import './App.css';
import BookedAppointments from './Components/BookedAppointments';
import ProtectedRoute from './Context/ProtectedRoute';

const ConditionalNavBarAndFooter = ({ children }) => {
  const location = useLocation();
  const showNavBarAndFooter = location.pathname === '/' || location.pathname.startsWith('/services');

  return (
    <>
      {showNavBarAndFooter && <NavBar />}
      <div className="MainContent">{children}</div>
      {showNavBarAndFooter && <FooterHome />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ServicesProvider>
        <ConditionalNavBarAndFooter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/*" element={<Services />} />
            <Route path="/services/appointment-booking" element={<AppointmentBookingMain />} />
            <Route path="/services/bookedappointments" element={<BookedAppointments />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/*" element={<AdminPannel />} />
            </Route>
          </Routes>
        </ConditionalNavBarAndFooter>
      </ServicesProvider>
    </Router>
  );
};

export default App;