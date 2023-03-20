import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthContext from './contexts/AuthContext';

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
