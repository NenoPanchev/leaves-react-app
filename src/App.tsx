import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AuthContext from './contexts/AuthContext';
import { UserDetails } from './models/objects/UserDetails';
import Home from './pages/Home';
import { useRefresh } from './services/authService';


function App() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isReady, setReady] = useState<boolean>(false);
  const refreshUser = useRefresh();
  React.useEffect(() => {

    //get from localstor
    // set in user

    // console.log('Initial User', user);
    if (localStorage.getItem('Authenticated') == 'true') {
      // console.log('Initial Authentication Check: ', localStorage.getItem('Authenticated'));

      const setRefreshedUser = async () => {
        const a = await refreshUser();
        setUser(a);

      }
      setRefreshedUser();
    }
    // setReady(true);
  }, [])

  // React.useEffect(() => {
  //   // set to localstor
  //   //if check ako e null zanuli storidja
  //   // on reload request user info with JWT
  //   // if (!isReady) {
  //   //   return;
  //   // }

  //   // console.log('Authenticated on refresh: ', localStorage.getItem('Authenticated'));
  //   // localStorage.setItem("User", JSON.stringify(user));
  //   // const localUser = localStorage.getItem('User');
  //   // console.log('LocalUser on refresh: ', localUser);
  //   // console.log('User on refresh: ', localUser);

  // }, [user])

  const value = { user, setUser };
  return (
    <Grid >
      <Router>
        <AuthContext.Provider value={value}>
          <Home />
        </AuthContext.Provider>
      </Router>
    </Grid>
  );
}

export default App;
