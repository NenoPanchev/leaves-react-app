import { Grid } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AuthContext from './contexts/AuthContext';
import { UserDetails } from './models/objects/UserDetails';
import Home from './pages/Home/Home';
import { useRefresh } from './services/authService';


function App() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const refreshUser = useRefresh();
  React.useEffect(() => {
    if (localStorage.getItem('Authenticated') == 'true') {
      const setRefreshedUser = async () => {
        const a = await refreshUser();
        setUser(a);
      }
      setRefreshedUser();
    }
  }, [])

  const value = useMemo(() => ({user, setUser}), [user]);

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