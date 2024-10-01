import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchWeatherData = async () => {
    const apiKey = '1635890035cbba097fd5c26c8ea672a1';

    try {
      
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      
      if (geoData.length === 0) throw new Error('Invalid city');

      const { lat, lon } = geoData[0];

      
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

     
      const dailyForecast = {};
      const todayDate = new Date().toLocaleDateString();

      weatherData.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
       
        if (date !== todayDate && !dailyForecast[date]) {
          dailyForecast[date] = item; 
        }
      });

      const dailyForecastArray = Object.values(dailyForecast).slice(0, 5); // Get only the next 5 days excluding today
      setForecast(dailyForecastArray);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setForecast([]);
      if (error.message === 'Invalid city') {
        setError('Wrong city. Please enter the city correctly.');
      } else {
        setError('Unable to fetch weather data. Please try again later.');
      }
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherData();
    }
  };

  
  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
    
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-500">Weather in Your City</h1>
        <div className="flex items-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="border border-gray-300 p-2 rounded-l-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Get Forecast
          </button>
        </div>
      </div>

     
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      
      <div className="flex justify-end mt-4">
        <button
          onClick={handleExit}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
        >
          Exit
        </button>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-sm transition"
          >
            
            <div className="grid grid-cols-1 gap-2 text-gray-700">
              
              <div className="font-medium bg-orange-300 p-2">Date: {new Date(day.dt * 1000).toLocaleDateString()}</div>
              <hr className="border-2 border-black" /> {/* Darker line */}
              
              <div className="font-medium">Temperature: {Math.round(day.main.temp)}°C</div>
              <hr className="border-2 border-black" />
              
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Min Temp:</div>
                <div>{Math.round(day.main.temp_min)}°C</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Max Temp:</div>
                <div>{Math.round(day.main.temp_max)}°C</div>
              </div>
              <hr className="border-2 border-black" />
            
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Pressure:</div>
                <div>{day.main.pressure} hPa</div>
              </div>
              <hr className="border-2 border-black" />
           
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Humidity:</div>
                <div>{day.main.humidity}%</div>
              </div>
              <hr className="border-2 border-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherComponent;
