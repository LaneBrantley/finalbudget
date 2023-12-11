import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useLocation } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


function Dashboard() {
  const local = 'http://localhost:3001/getbudget';
  const server = '161.35.188.98:3000/getbudget';
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  const options = {
    maintainAspectRatio: false
  }
  
  const [dataSource, setDataSource] = useState ({
    labels: [],
    datasets: [
        {
        label: 'Budget',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ],
        hoverOffset: 4,
        borderWidth: 1
    }]
  });
  
  const redirectToBudget = () => {
    // Use the history.push() method to navigate to the /budget route
    navigate('/budget', {state: {username: username}});
  };

  //Check if token is valid
  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (!expirationTime) {
      return true; // No expiration time stored
    }
  
    const currentTime = new Date().getTime();
    return currentTime > parseInt(expirationTime, 10);
  };

  //Get budget data for charts
  const getBudget = async () => {
    try {
      const res = await axios.post(server, {
        username: username
      });

      const newDataSource = {
        labels: res.data.map((item) => item.title),
        datasets: [
          {
            label: 'Budget',
            data: res.data.map((item) => item.budget),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            hoverOffset: 4,
            borderWidth: 1,
          },
        ],
      };

      setDataSource(newDataSource);
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // Call the getBudget() function when the component is mounted if token present
    // if (!token || isTokenExpired()) {
    //   localStorage.removeItem('username');
    //   localStorage.removeItem('expirationTime');
    //   localStorage.removeItem('token');
    //   navigate('/login');
    // }
    // else {
    // }
  }, []);



  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={redirectToBudget}>Make Budget Items</button>
      <button onClick={getBudget}>Get budget</button>
      <div style={{ display: 'inline-block', width: '300px', height: '300px' }}>
        <Pie data={dataSource} options={options} />
      </div>
      <div style={{ display: 'inline-block', width: '300px', height: '300px' }}>
        <Doughnut data={dataSource} options={options} />
      </div>
      <div style={{ display: 'inline-block', width: '300px', height: '300px' }}>
        <Bar data={dataSource} options={options} />
      </div>
    </div>
  );
}

export default Dashboard;
