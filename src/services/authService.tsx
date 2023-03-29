import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGIN_URL } from '../constants/GlobalConstants';
import { AuthContext } from '../contexts/AuthContext';
import { UserDetails } from '../models/objects/UserDetails';


export const useLogin = () => {
  var context = useContext(AuthContext);
  const userDetails = new UserDetails();

  const authenticate = (userForm: FormData) => {

     axios.post(LOGIN_URL, axios.formToJSON(userForm))
      .then((response) => {
        const token = response.data.jwt;
        userDetails.setEmail(response.data.email);
        userDetails.setAuthorities(response.data.authorities);
        localStorage.setItem("SavedToken", 'Bearer ' + token);
        context.setUser(userDetails);
        console.log('userDetails: ', userDetails);
        console.log('context: ', context);
        console.log(context.user);
        
      })
      .catch(error => console.log(error)
      )
  }
  return authenticate;
}

export const LogOut = () => {
  const navigate = useNavigate();
  localStorage.setItem("SavedToken", '');

  useEffect(() => {
    navigate('/login');
  }, []);

  return null;
}
