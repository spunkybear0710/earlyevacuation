"use client";

import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';
import { Line, Bar, Radar, PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadarController, PolarAreaController, Title, Tooltip, Legend, RadialLinearScale, ArcElement } from 'chart.js';
import Navbar from '../../components/Navbar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadarController,
  PolarAreaController,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement // Register the ArcElement
);

const fetchWeatherData = async () => {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=your api key&');
  const data = await response.json();
  return data;
};

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data);
    };

    getWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const temperatureData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Temperature',
        data: [30, 25, 27, 28, 29, 30, 31, 32, 30, 28, 27, 26],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const humidityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Humidity',
        data: [60, 65, 70, 75, 80, 85, 90, 95, 90, 85, 80, 75],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  const windSpeedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Wind Speed',
        data: [10, 12, 14, 16, 18, 20, 22, 24, 22, 20, 18, 16],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
    ],
  };

  const precipitationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Precipitation',
        data: [5, 10, 15, 20, 25, 30, 35, 40, 35, 30, 25, 20],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Container maxWidth="lg" className="py-8">
        <Typography variant="h4" component="h1" gutterBottom>
          Weather Dashboard
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Temperature
              </Typography>
              <Line data={temperatureData} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Humidity
              </Typography>
              <Bar data={humidityData} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Wind Speed
              </Typography>
              <Radar data={windSpeedData} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Precipitation
              </Typography>
              <PolarArea data={precipitationData} />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;