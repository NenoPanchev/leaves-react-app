import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthContext from './contexts/AuthContext';
import { UserDetails } from './models/objects/UserDetails';


function App() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const value = {user, setUser};
  return (
    <div>
      <AuthContext.Provider value={value}>
        <Router>
          <Home />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
