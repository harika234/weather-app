// src/App.js
import React from 'react';
import WeatherComponent from './WeatherComponent';
import './tailwind.css'; // Import Tailwind CSS

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center"> {/* Gradient background */}
      <WeatherComponent />
    </div>
  );
}

export default App;
