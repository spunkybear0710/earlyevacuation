"use client"
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from '../../components/Navbar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeatherData {
  date: string;
  temperature: number;
}

const News: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call to fetch weather data
    const fetchWeatherData = async () => {
      // Replace this with actual API call
      const mockData: WeatherData[] = [
        { date: '2023-05-01', temperature: 22 },
        { date: '2023-05-02', temperature: 24 },
        { date: '2023-05-03', temperature: 20 },
        { date: '2023-05-04', temperature: 25 },
        { date: '2023-05-05', temperature: 23 },
      ];
      setWeatherData(mockData);
      setNotification('Weather data updated successfully!');

      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    };

    fetchWeatherData();
  }, []);

  const chartData = {
    labels: weatherData.map(data => data.date),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.map(data => data.temperature),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weather Report',
      },
    },
  };

  return (
    <div>
      <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>
      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{notification}</span>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
    </div>
  );
};

export default News;