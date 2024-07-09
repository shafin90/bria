import React, { useEffect, useState } from 'react';
import styles from './TopServices.module.css';
import { baseURL } from '../../baseUrl';

const TopServices = () => {
  
  const [services, setServices ] = useState([]);

  useEffect(()=>{
    fetch(`${baseURL}/service/getTopServices`)
    .then(res=>res.json())
    .then(data=>setServices(data))
  },[])

  return (
    <div className={styles.topServices}>
      <h2>Top Services</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Bookings</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>
                <img src={service.img} alt={service.name} className={styles.serviceImg} />
                {service.serviceName}
              </td>
              <td>{service.bookingCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopServices;