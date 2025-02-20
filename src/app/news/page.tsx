"use client";

import React, { useState } from 'react';
import { Alert, AlertTitle,  } from '@mui/material';
import { Card, CardContent, CardHeader, Typography, Switch, Select, MenuItem, InputBase, IconButton } from '@mui/material';
import { CloudRain, Sun, Wind, AlertTriangle, ThermometerSun, MapPin, History, Phone, Search, Menu, ArrowUp, ArrowDown, Filter} from 'lucide-react';
import Navbar from '../../components/Navbar';


const WeatherDashboard = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeTab, setActiveTab] = useState('alerts');

  const regions = [
    "All Regions",
    "Northeast",
    "Northwest",
    "Southeast",
    "Southwest",
    "Central"
  ];

  // Sample data with more alerts
  const allAlerts = [
    {
      id: 1,
      title: "Severe Storm Warning",
      description: "Dangerous thunderstorms approaching with potential for flash flooding",
      severity: "critical",
      temperature: 75,
      humidity: 85,
      windSpeed: 45,
      precipitation: 90,
      region: "Northeast",
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      title: "High Temperature Alert",
      description: "Moderate temperature increase expected",
      severity: "warning",
      temperature: 82,
      humidity: 65,
      windSpeed: 12,
      precipitation: 20,
      region: "Southeast",
      timestamp: new Date().toISOString()
    },
    // More alerts...
  ];

  // Filter alerts based on critical toggle and selected region
  const filteredAlerts = allAlerts.filter(alert => {
    const matchesCritical = showCriticalOnly ? alert.severity === 'critical' : true;
    const matchesRegion = selectedRegion === 'all' ? true : alert.region === selectedRegion;
    return matchesCritical && matchesRegion;
  });

  return (
    <>
    <Navbar />
    <div className={`min-h-screen mt-16 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50' }`}>
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Typography variant="h3" className="text-3xl font-bold text-white">
              Weather Intelligence Hub
            </Typography>
            <div className="flex items-center gap-4">
              <div className="relative">
                <InputBase
                  placeholder="Search location..."
                  className="pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="mt-6 flex flex-wrap items-center gap-6">
            {/* Critical Toggle */}
            <div className="flex items-center gap-3 bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <AlertTriangle className="h-5 w-5 text-red-300" />
              <Typography className="text-white font-medium">Critical Alerts Only</Typography>
              <Switch
                checked={showCriticalOnly}
                onChange={(e) => setShowCriticalOnly(e.target.checked)}
                className="data-[state=checked]:bg-red-400"
              />
            </div>

            {/* Region Selector */}
            <div className="flex items-center gap-3 bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <MapPin className="h-5 w-5 text-white" />
              <Select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-transparent text-white border-none outline-none focus:ring-0"
              >
                {regions.map((region) => (
                  <MenuItem 
                    key={region} 
                    value={region === "All Regions" ? "all" : region}
                    className="text-gray-900"
                  >
                    {region}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Weather Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {['Temperature', 'Humidity', 'Wind Speed', 'Precipitation'].map((stat, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <Typography className="text-white/70">{stat}</Typography>
                <div className="flex items-end gap-2 mt-1">
                  <Typography className="text-2xl font-bold text-white">
                    {index === 0 ? '75°F' : index === 1 ? '65%' : index === 2 ? '12mph' : '30%'}
                  </Typography>
                  <Typography className="text-green-300 flex items-center">
                    <ArrowUp className="h-4 w-4" /> 3%
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Alert Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`transform transition-all hover:scale-102 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Typography variant="h5" className={`text-xl font-bold ${
                      alert.severity === 'critical' ? 'text-red-500' : 'text-blue-500'
                    }`}>
                      {alert.title}
                    </Typography>
                    <Typography className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {alert.description}
                    </Typography>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    alert.severity === 'critical' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {alert.severity}
                  </div>
                </div>

                {/* Weather Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    <span>{alert.temperature}°F</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-5 w-5 text-blue-500" />
                    <span>{alert.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-teal-500" />
                    <span>{alert.windSpeed} mph</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span>{alert.precipitation}%</span>
                  </div>
                </div>

                {/* Location and Time */}
                <div className="flex justify-between mt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{alert.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4" />
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default WeatherDashboard;