import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import { AuthContext } from './contexts/AuthContext';
import { UserDetails } from './models/objects/UserDetails';

export const AuthContext = React.createContext();

function App() {
  // var authContext = useContext(AuthContext);
  // var user = authContext.user;
  // var setUser = authContext.setUser;
  // var setUser2 = authContext.setUser2;
  const [user, setUser] = useState<UserDetails>();
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
