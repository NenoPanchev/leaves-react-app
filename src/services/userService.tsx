import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUserUrl = 'http://localhost:8080/users/'

const withAuthHeader = () => ({
    headers: {
      'Authorization': localStorage.getItem('SavedToken')
    }
  });


type User = {
    id: number
    name: string
    email: string
    department: string
    roles: [{
      name: string
    }]
}

  interface UserViewProp {
    id: number
}

type UserDetails = {
    id: number
    name: string
    email: string
    department: string
    roles: [{
      name: string
      permissions: Permissions[]
    }]
    createdAt: string
    createdBy?: string
    lastModifiedAt?: string
    lastModifiedBy?: string
}

interface Permissions {
  name: string
}

export const useFetchAll = (refresh: number) => {
    const [user, setUser] = useState<User[]>([]);


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
    const [user, setUser] = useState<UserDetails>();
    
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