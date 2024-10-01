
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Weather Forecasting</h1>
      <p className="text-lg text-white mb-8">Click below to check the weather forecast for the next 5 days.</p>
      <Link to="/weather">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Check Weather Forecast
        </button>
      </Link>
    </div>
  );
};

export default WelcomePage;
