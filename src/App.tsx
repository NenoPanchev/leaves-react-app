import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <div>
      <Router>
        <Home />
      </Router>
    </div>
  );
}

export default App;
