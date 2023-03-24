import { useEffect, useState } from 'react';
import axios from 'axios';
import { IRole, IRoleDetails } from '../models/interfaces/role/roleInterfaces'

const baseRoleUrl = 'http://localhost:8080/roles/'

const withAuthHeader = () => ({
  headers: {
    'Authorization': localStorage.getItem('SavedToken')
  }
});


export const useFetchAll = (refresh: number) => {
  const [roles, setRoles] = useState<IRole[]>([]);


  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    const result = await axios.get(baseRoleUrl, withAuthHeader())
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
    const result = await axios.get(baseRoleUrl + props, withAuthHeader())
      .then(response => setRole(response.data))
      .catch(error => console.log(error))
  }
  return role;
}

export const useCreate = () => {

  const addRole = async (role: FormData) => {

    const result = await axios.post(baseRoleUrl, axios.formToJSON(role), withAuthHeader())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return addRole;
}

export const useEdit = () => {

  const editRole = async (id: number, role: FormData) => {

    const updateUrl = baseRoleUrl + id;

    const result = await axios.put(updateUrl, axios.formToJSON(role), withAuthHeader())
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return editRole;
}

export const useFetchAllFiltered = (refresh: number, filter: FormData) => {
  const [roles, setRoles] = useState<IRole[]>([]);


  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    const result = await axios.post(baseRoleUrl + 'filter', axios.formToJSON(filter), withAuthHeader())
      .then(response => setRoles(response.data))
      .catch(error => console.log(error))
  }

  return roles;
}