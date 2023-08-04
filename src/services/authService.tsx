import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance as axios } from '../config/AxiosConfig';
import { formToJSON } from 'axios';
import { LOGIN_URL } from '../constants/GlobalConstants';
import AuthContext from '../contexts/AuthContext';
import { UserDetails } from '../models/objects/UserDetails';


export const useLogin = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userDetails = new UserDetails();
  let serverResponse = '';

  const authenticate = async (userForm: FormData) => {

    await axios.post(LOGIN_URL, formToJSON(userForm))
      .then((response) => {
        const token = response.data.jwt;
        userDetails.setEmail(response.data.email);
        userDetails.setAuthorities(response.data.authorities);
        userDetails.setId(response.data.id!);
        userDetails.setName(response.data.name);

        localStorage.setItem("SavedToken", 'Bearer ' + token);
        localStorage.setItem("Authenticated", 'true');
        setUser(userDetails);
        navigate('/')
      })
      .catch(error => {
        console.log(error)
        if (error.code === "ERR_NETWORK") {
          serverResponse = 'No connection to the server'

        } else if (error.response.status >= 500) {
          serverResponse = 'No connection to the server';

        } else {
          serverResponse = error.response.data;

        }

      })
    return serverResponse;
  }
  return authenticate;
}

export const useRefresh = () => {
  const userDetails = new UserDetails();

  const refreshUser = async () => {
    const jwt = localStorage.getItem('SavedToken')?.replaceAll('Bearer ', '');

    await axios.post(LOGIN_URL + '/refresh', { jwt: jwt })
      .then((response) => {
        userDetails.setEmail(response.data.email);
        userDetails.setName(response.data.name);
        userDetails.setAuthorities(response.data.authorities);
        userDetails.setId(response.data.id!);
      })
      .catch(error => console.log(error)
      )
    return (userDetails);
  }
  return refreshUser;
}

export const LogOut = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  localStorage.setItem("SavedToken", '');
  useEffect(() => {
    setUser(null);
    localStorage.setItem("Authenticated", 'false');
    localStorage.setItem("User", '');
    navigate('/login');
  }, []);

  return null;
}
