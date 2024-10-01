import React, { useState } from 'react';

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(''); 

  const fetchWeatherData = async () => {
    const apiKey = '1635890035cbba097fd5c26c8ea672a1'; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found'); 
      const data = await response.json();

      
      const dailyForecast = {};
      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyForecast[date]) {
          dailyForecast[date] = item; 
        }
      });

      
      const dailyForecastArray = Object.values(dailyForecast).slice(0, 5);
      setForecast(dailyForecastArray); 
      setError(''); 
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setForecast([]); 
      setError('City not found. Please enter a valid city name.'); 
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherData();
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">5-Day Weather Forecast</h1>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border border-gray-300 p-2 rounded-l-md w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition"
        >
          Get Forecast
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
        {forecast.map((day, index) => (
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm transition transform hover:scale-105" key={index}>
            <h3 className="text-lg font-semibold">{new Date(day.dt * 1000).toLocaleDateString()}</h3>
            <p className="text-2xl font-bold text-orange-600">{Math.round(day.main.temp)}°C</p>
            <p className="text-gray-600">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherComponent;
