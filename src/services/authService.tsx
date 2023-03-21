import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const loginUrl = "http://localhost:8080/authenticate";

export const Authenticate = async () => {
  await axios.post(loginUrl, { email: 'super@admin.com', password: '1234' })
  .then((response) => {

    const token = response.data.jwt;

    localStorage.setItem("SavedToken", 'Bearer ' + token);
  })
  .catch(error => console.log(error)
  )
}

export const LogOut = () => {
  const navigate = useNavigate();
  localStorage.setItem("SavedToken", '');

  useEffect(() => {
    navigate('/login');
  }, []);
  
  return null;
}
