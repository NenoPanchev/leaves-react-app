import { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser, IUserDetails } from '../models/interfaces/user/userInterfaces'

const baseUserUrl = 'http://localhost:8080/users/'

const withAuthHeader = () => ({
    headers: {
      'Authorization': localStorage.getItem('SavedToken')
    }
  });


export const useFetchAll = (refresh: number) => {
    const [user, setUser] = useState<IUser[]>([]);


    useEffect(() => {
      loadUsers();
    }, [refresh]);
  
    const loadUsers = async () => {
      const result = await axios.get(baseUserUrl, withAuthHeader())
        .then(response => setUser(response.data))
        .catch(error => console.log(error))
        
    } 

    return user;
}

export const useFetchOne = (props:number) => {
    const [user, setUser] = useState<IUserDetails>();
    
  useEffect(() => {
    loadDepartment();
  }, []);
  

  const loadDepartment = async () => {
    const result = await axios.get(baseUserUrl + props, withAuthHeader())
      .then(response => setUser(response.data))
      .catch(error => console.log(error))
  }
  return user;
}

export const useCreate = () => {

  const addUser = async (user: FormData) => {
    console.log(axios.formToJSON(user));
    
    const result = await axios.post(baseUserUrl, axios.formToJSON(user), withAuthHeader())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return addUser;
}

export const useEdit = () => {

  const editUser = async (id: number, role: FormData) => {

    const updateUrl = baseUserUrl + id;

    const result = await axios.put(updateUrl, axios.formToJSON(role), withAuthHeader())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return editUser;
}