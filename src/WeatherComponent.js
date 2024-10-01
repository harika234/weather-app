import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWeatherData = async () => {
    const apiKey = '1635890035cbba097fd5c26c8ea672a1';

    try {
      setLoading(true); 
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

      const dailyForecastArray = Object.values(dailyForecast).slice(0, 5); 
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
    } finally {
      setLoading(false);
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
     
      <div className="flex flex-col md:flex-row items-center justify-items-start mb-4">
        <h1 className="text-2xl font-bold text-orange-500 p-8">Weather in Your City</h1>
        <div className="flex items-center mt-4 md:mt-0 p-12">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="border border-gray-300 p-2 rounded-l-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition ml-2 flex items-center "
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px', 
                color: '#e0731a',
                background: '#ffffff',
                borderRadius: '30px',
                padding: '5px 10px', 
              }}
            >
              ?
            </span>
            <span className="ml-1 text-sm">Search</span> 
          </button>
          {loading && (
            <div className="ml-2 flex items-center">
              <svg
                className="h-5 w-5 text-orange-500 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path d="M12 2a10 10 0 0 1 0 20" fill="none" />
              </svg>
            </div>
          )}
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

      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 bg-gray-100 rounded-lg shadow-md min-h-[200px]"
          >
            <div className="grid grid-cols-1 gap-0 text-gray-700 border border-black">
              
              <div className="font-medium bg-orange-300 p-3 border-b border-black">Date: {new Date(day.dt * 1000).toLocaleDateString()}</div>
              
             
              <div className="font-medium border-b border-black p-2">Temperature: </div>
              
             
              <div className="grid grid-cols-2 gap-0 border-b border-black">
                <div className="font-medium border-r border-black p-2">Min Temp:</div>
                <div className="p-2">{Math.round(day.main.temp_min)}°C</div>
              </div>
              <div className="grid grid-cols-2 gap-0 border-b border-black">
                <div className="font-medium border-r border-black p-2">Max Temp:</div>
                <div className="p-2">{Math.round(day.main.temp_max)}°C</div>
              </div>
              
             
              <div className="grid grid-cols-2 gap-0 border-b border-black">
                <div className="font-medium border-r border-black p-2">Pressure:</div>
                <div className="p-2">{day.main.pressure} hPa</div>
              </div>
             
              
              <div className="grid grid-cols-2 gap-0">
                <div className="font-medium border-r border-black p-2">Humidity:</div>
                <div className="p-2">{day.main.humidity}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherComponent;
