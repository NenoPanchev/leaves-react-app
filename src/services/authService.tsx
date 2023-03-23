import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const loginUrl = "http://localhost:8080/authenticate";

export const useLogin = () => {

  const authenticate = async (user: FormData) => {  
    await axios.post(loginUrl, axios.formToJSON(user))
      .then((response) => {
        const token = response.data.jwt;
        localStorage.setItem("SavedToken", 'Bearer ' + token);
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
