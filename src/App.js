import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeatherComponent from './WeatherComponent';
import WelcomePage from './WelcomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
        <Routes>
         
          <Route path="/" element={<WelcomePage />} />
         
          <Route path="/weather" element={<WeatherComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
