import { useEffect, useState } from 'react';
import axios from 'axios';
import { IRole, IRoleDetails } from '../models/interfaces/role/roleInterfaces'
import { BASE_ROLE_URL } from '../constants/GlobalConstants';
import { WITH_AUTH_HEADER } from '../constants/GlobalConstants';


export const useFetchAll = (refresh: number) => {
  const [roles, setRoles] = useState<IRole[]>([]);


  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    const result = await axios.get(BASE_ROLE_URL, WITH_AUTH_HEADER())
      .then(response => setRoles(response.data))
      .catch(error => console.log(error))
  }

  return roles;
}

export const useFetchOne = (props: number) => {
  const [role, setRole] = useState<IRoleDetails>();

  useEffect(() => {
    loadRole();
  }, []);


  const loadRole = async () => {
    const result = await axios.get(BASE_ROLE_URL + props, WITH_AUTH_HEADER())
      .then(response => setRole(response.data))
      .catch(error => console.log(error))
  }
  return role;
}

export const useCreate = () => {

  const addRole = async (role: FormData) => {

    const result = await axios.post(BASE_ROLE_URL, axios.formToJSON(role), WITH_AUTH_HEADER())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return addRole;
}

export const useEdit = () => {

  const editRole = async (id: number, role: FormData) => {

    const updateUrl = BASE_ROLE_URL + id;

    const result = await axios.put(updateUrl, axios.formToJSON(role), WITH_AUTH_HEADER())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return editRole;
}

export const useFetchAllFiltered = () => {
  const [roles, setRoles] = useState<IRole[]>([]);

  const fetchAllFiltered = (refresh: number, filter: FormData) => {
    
    // useEffect(() => {
    //   loadRoles();
    // }, [refresh]);

    const loadRoles = async () => {
      const result = await axios.post(BASE_ROLE_URL + 'filter', axios.formToJSON(filter), WITH_AUTH_HEADER())
        .then(response =>  {
          
          setRoles(response.data)
          
        })
        .catch(error => console.log(error))
    }
    loadRoles();      
    return roles;
  }
  return fetchAllFiltered;
}


export const useFetchAllOrFiltered = (refresh: number, filter: FormData, shouldFilter: boolean) => {
  const [roles, setRoles] = useState<IRole[]>([]);
    
    useEffect(() => {
      if (shouldFilter) {
        loadFilteredRoles();
      } else {
        loadRoles();
      }
    }, [refresh]);

    const loadFilteredRoles = async () => {
      const result = await axios.post(BASE_ROLE_URL + 'filter', axios.formToJSON(filter), WITH_AUTH_HEADER())
        .then(response =>  {
          
          setRoles(response.data)
          
        })
        .catch(error => console.log(error))
    }

  
    const loadRoles = async () => {
      const result = await axios.get(BASE_ROLE_URL, WITH_AUTH_HEADER())
        .then(response => setRoles(response.data))
        .catch(error => console.log(error))
    }

    return roles;

}

export const useFetchAllNames = (refresh: number) => {
  const [roleNames, setRoleNames] = useState<string[]>([]);


  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    const result = await axios.get(BASE_ROLE_URL + '/names', WITH_AUTH_HEADER())
      .then(response => setRoleNames(response.data))
      .catch(error => console.log(error))
  }

  return roleNames;
}