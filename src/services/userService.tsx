import { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser, IUserDetails, IUserEdit } from '../models/interfaces/user/userInterfaces'
import { BASE_USER_URL } from '../constants/GlobalConstants';
import { WITH_AUTH_HEADER } from '../constants/GlobalConstants';


export const useFetchAll = (refresh: number) => {
    const [user, setUser] = useState<IUser[]>([]);


    useEffect(() => {
      loadUsers();
    }, [refresh]);
  
    const loadUsers = async () => {
      const result = await axios.get(BASE_USER_URL, WITH_AUTH_HEADER())
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
    const result = await axios.get(BASE_USER_URL + props, WITH_AUTH_HEADER())
      .then(response => setUser(response.data))
      .catch(error => console.log(error))
  }
  return user;
}

export const useCreate = () => {

  const addUser = async (user: FormData) => {
    console.log(axios.formToJSON(user));
    
    const result = await axios.post(BASE_USER_URL, axios.formToJSON(user), WITH_AUTH_HEADER())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return addUser;
}

export const useEdit = () => {

  const editUser = async (id: number, role: FormData) => {

    const updateUrl = BASE_USER_URL + id;

    const result = await axios.put(updateUrl, axios.formToJSON(role), WITH_AUTH_HEADER())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return editUser;
}

export const useFetchAllFiltered = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchAllFiltered = (refresh: number, filter: FormData) => {
    
    const loadUsers = async () => {
      const result = await axios.post(BASE_USER_URL + 'filter', axios.formToJSON(filter), WITH_AUTH_HEADER())
        .then(response =>  {
          
          setUsers(response.data)
          
        })
        .catch(error => console.log(error))
    }
    loadUsers();      
    return users;
  }
  return fetchAllFiltered;
}


export const useFetchAllOrFiltered = (refresh: number, filter: FormData, shouldFilter: boolean) => {
  const [users, setUsers] = useState<IUser[]>([]);
    
    useEffect(() => {
      if (shouldFilter) {
        loadFilteredUsers();
      } else {
        loadUsers();
      }
    }, [refresh]);

    const loadFilteredUsers = async () => {
      const result = await axios.post(BASE_USER_URL + 'filter', axios.formToJSON(filter), WITH_AUTH_HEADER())
        .then(response =>  {
          
          setUsers(response.data)
          
        })
        .catch(error => console.log(error))
    }

  
    const loadUsers = async () => {
      const result = await axios.get(BASE_USER_URL, WITH_AUTH_HEADER())
        .then(response => setUsers(response.data))
        .catch(error => console.log(error))
    }

    return users;

}