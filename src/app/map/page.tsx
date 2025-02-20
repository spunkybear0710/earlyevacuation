"use client";

import React, { useState } from 'react';
import { Search, Navigation, AlertTriangle, Phone } from 'lucide-react';
import Navbar from '../../components/Navbar'; // Adjust the import path as needed

const EmergencyRouteMap = () => {
  const [selectedHospital, setSelectedHospital] = useState('');

  // Mock emergency facilities data
  const hospitals = [
    { id: 1, name: 'City General Hospital', distance: '2.3', eta: '8' },
    { id: 2, name: 'St. Mary Medical Center', distance: '3.1', eta: '12' },
    { id: 3, name: 'Emergency Care Unit', distance: '1.8', eta: '6' }
  ];

  return (
    <>
    <Navbar />
    <div className="w-full max-w-6xl mx-auto p-4 bg-gray-50 rounded-xl shadow-lg mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-red-600 p-4 rounded-t-xl ">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Emergency Route Finder</h1>
        </div>
        <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
          <Phone className="w-4 h-4 text-red-600" />
          <span className="text-red-600 font-semibold">Emergency Call</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Enter your current location"
          className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
        />
      </div>

      {/* Map Container */}
      <div className="relative w-full h-96 bg-gray-200 rounded-lg mb-6 overflow-hidden">
        {/* Mock Map */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300">
          {/* Mock Route Line */}
          <div className="absolute top-1/2 left-1/4 w-1/2 h-2 bg-red-500 transform -rotate-12"></div>

          {/* Start Point */}
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* End Point */}
          <div className="absolute top-1/2 left-3/4 w-6 h-6 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <span className="text-white text-xs">H</span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Navigation className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Nearest Hospitals List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Nearest Emergency Facilities</h2>
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedHospital === hospital.id.toString()
                ? 'bg-red-50 border-2 border-red-500'
                : 'bg-white border-2 border-gray-100 hover:border-red-200'
            }`}
            onClick={() => setSelectedHospital(hospital.id.toString())}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800">{hospital.name}</h3>
                <p className="text-sm text-gray-500">{hospital.distance} km away</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">{hospital.eta} min</p>
                <p className="text-sm text-gray-500">ETA</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default EmergencyRouteMap;