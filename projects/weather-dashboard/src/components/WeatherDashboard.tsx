
import React, { useState, useEffect } from 'react';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const WeatherDashboard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate weather data
    setTimeout(() => {
      setWeather({
        city: 'New York',
        temperature: 22,
        description: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '☁️'
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Weather Dashboard</h1>
      
      {weather && (
        <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">{weather.city}</h2>
            <div className="text-6xl mb-4">{weather.icon}</div>
            <div className="text-5xl font-bold mb-2">{weather.temperature}°C</div>
            <div className="text-xl">{weather.description}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💧</div>
              <div className="text-lg font-semibold">Humidity</div>
              <div className="text-2xl font-bold">{weather.humidity}%</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💨</div>
              <div className="text-lg font-semibold">Wind Speed</div>
              <div className="text-2xl font-bold">{weather.windSpeed} km/h</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Today's Forecast</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Morning</span>
              <span className="font-semibold">18°C</span>
            </div>
            <div className="flex justify-between">
              <span>Afternoon</span>
              <span className="font-semibold">24°C</span>
            </div>
            <div className="flex justify-between">
              <span>Evening</span>
              <span className="font-semibold">20°C</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Weekly Forecast</h3>
          <div className="space-y-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="flex justify-between">
                <span>{day}</span>
                <span className="font-semibold">{20 + i}°C</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Air Quality</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">Good</div>
            <div className="text-gray-600">AQI: 45</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
    