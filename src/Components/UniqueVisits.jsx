import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styles from './UniqueVisits.module.css';
import { baseURL } from '../../baseUrl';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UniqueVisits = () => {
  const [graphData, setGraphData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch(`${baseURL}/dashboard/graphData`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        setGraphData(data);
        processGraphData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const processGraphData = (data) => {
    const times = ['10:00 AM', '1:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
    const newUsersData = new Array(times.length).fill(0);
    const returningUsersData = new Array(times.length).fill(0);

    data.forEach(item => {
      const timeIndex = times.indexOf(item.time);
      if (timeIndex !== -1) {
        if (item.isRepeat) {
          returningUsersData[timeIndex] += 1;
        } else {
          newUsersData[timeIndex] += 1;
        }
      }
    });

    const chartData = {
      labels: times,
      datasets: [
        {
          label: 'New Users',
          data: newUsersData,
          borderColor: 'rgba(110, 235, 110, 1)',
          backgroundColor: 'rgba(110, 235, 110, 0.2)',
          fill: true,
        },
        {
          label: 'Returning Users',
          data: returningUsersData,
          borderColor: 'rgba(154, 83, 198, 1)',
          backgroundColor: 'rgba(154, 83, 198, 0.2)',
          fill: true,
        },
      ],
    };

    console.log('Processed chart data:', chartData);
    setChartData(chartData);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Visits',
        },
      },
    },
  };

  return (
    <div className={styles.uniqueVisits}>
      <h2>Unique Visits Over Time</h2>
      {chartData ? (
        <div className={styles.chart}>
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default UniqueVisits;
