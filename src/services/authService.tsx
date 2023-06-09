import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGIN_URL, WITH_AUTH_HEADER, WITH_TEXT_HEADER } from '../constants/GlobalConstants';
import AuthContext from '../contexts/AuthContext';
import { UserDetails } from '../models/objects/UserDetails';


export const useLogin = () => {
  var {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const userDetails = new UserDetails();

  const authenticate = async (userForm: FormData) => {

     await axios.post(LOGIN_URL, axios.formToJSON(userForm))
      .then((response) => {
        const token = response.data.jwt;
        userDetails.setEmail(response.data.email);
        userDetails.setAuthorities(response.data.authorities);
        localStorage.setItem("SavedToken", 'Bearer ' + token);
        localStorage.setItem("Authenticated", 'true');
        setUser(userDetails);  
        navigate('/')
      })
      .catch(error => console.log(error)
      )
  }
  return authenticate;
}

export const useRefresh = () => {
  var {user, setUser} = useContext(AuthContext);
  // const navigate = useNavigate();
  // const path = useLocation().pathname;
  const userDetails = new UserDetails();

  const refreshUser = async () => {
    const jwt = localStorage.getItem('SavedToken')?.replaceAll('Bearer ', '');
    
     await axios.post(LOGIN_URL + '/refresh', {jwt: jwt})
      .then((response) => {
        userDetails.setEmail(response.data.email);
        userDetails.setAuthorities(response.data.authorities);
        // setUser(userDetails);
        // navigate(path)
      })
      .catch(error => console.log(error)
      )
      return(userDetails);
  }
  return refreshUser;
}

export const LogOut = () => {
  const navigate = useNavigate();
  var { setUser } = useContext(AuthContext);
  
  localStorage.setItem("SavedToken", '');
  useEffect(() => {
    setUser(null);
    localStorage.setItem("Authenticated", 'false');
    localStorage.setItem("User", '');
    navigate('/login');
  }, []);

  return null;
}
