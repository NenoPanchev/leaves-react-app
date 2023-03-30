import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthContext from './contexts/AuthContext';
import { UserDetails } from './models/objects/UserDetails';
import { plainToInstance } from 'class-transformer';


function App() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isReady, setReady] = useState<boolean>(false);
  React.useEffect(() => {
    
    //get from localstor
    // set in user
    const localUser = localStorage.getItem('User');
    console.log('Initial LocalUser', localUser);
    console.log('Initial Is Authenticated: ', localStorage.getItem('Authenticated'));
    if (localUser != null && localUser != '') {
      var newUser = JSON.parse(localUser);
      console.log(newUser);
      
      setUser(plainToInstance(UserDetails,JSON.parse(localUser)));
  
    }
    setReady(true);
  },[])

  React.useEffect(() => {
    // set to localstor
    //if check ako e null zanuli storidja
    // on reload request user info with JWT
    if(!isReady) {
      return;
    }

    console.log('Authenticated on refresh: ', localStorage.getItem('Authenticated'));
    localStorage.setItem("User", JSON.stringify(user));
        const localUser = localStorage.getItem('User');
        console.log('LocalUser on refresh: ', localUser);

    // setUser(JSON.parse(localStorage.getItem('User')!))
  },[user, isReady])

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
