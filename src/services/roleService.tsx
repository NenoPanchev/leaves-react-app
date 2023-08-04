import { useContext, useEffect, useState } from 'react';
import { axiosInstance as axios } from '../config/AxiosConfig';
import { formToJSON } from 'axios';
import { BASE_ROLE_URL, DEFAULT_PAGE, WITH_JSON_HEADER } from '../constants/GlobalConstants';
import { Permission } from '../models/objects/Permission';
import { Role } from '../models/objects/Role';
import AuthContext from '../contexts/AuthContext';
import { IRole } from '../models/interfaces/role/IRole';
import { IRoleDetails } from '../models/interfaces/role/IRoleDetails';
import { IRolePage } from '../models/interfaces/role/IRolePage';
import { IRoleFilter } from '../models/interfaces/role/IRoleFilter';
import { useNavigate } from 'react-router';


export const useFetchAll = (refresh: number) => {
  const [roles, setRoles] = useState<IRole[]>([]);


  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    await axios.get(BASE_ROLE_URL)
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
    await axios.get(BASE_ROLE_URL + props)
      .then(response => setRole(response.data))
      .catch(error => console.log(error))
  }
  return role;
}

export const useCreate = () => {

  const addRole = async (role: FormData) => {

    await axios.post(BASE_ROLE_URL, formToJSON(role))
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

    await axios.put(updateUrl, formToJSON(role))
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  return editRole;
}

export const useFetchPage = (refresh: number, filter: IRoleFilter) => {
  const [page, setPage] = useState<IRolePage>(DEFAULT_PAGE);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPage();
  }, [refresh]);

  const fetchPage = () => {



    const loadPage = async () => {
      await axios.post(BASE_ROLE_URL + 'page', JSON.stringify(filter), WITH_JSON_HEADER)
        .then(response => {
          setPage(response.data)
        })
        .catch(error => {
          console.log(error)
          if (error.response.status == 403) {
            navigate('/403');
          }
        })
    }
    loadPage();
    return page;
  }
  return page;
}

export const useFetchAllNames = (refresh: number) => {
  const [roleNames, setRoleNames] = useState<string[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    await axios.get(BASE_ROLE_URL + 'names')
      .then(response => {
        let initArr = (response.data).filter((names: string) => names !== 'SUPER_ADMIN');
        if (!user?.hasRole('SUPER_ADMIN')) {
          initArr = initArr.filter((name: string) => name !== 'ADMIN')
        }
        setRoleNames(initArr)
      })
      .catch(error => console.log(error))
  }

  return roleNames;
}

export const getAllRoleNamesNoRefresh = () => {
  return axios.get(BASE_ROLE_URL + 'names');
}
export function appendPermissionsToFormData(formData: FormData, permissions: Permission[] | null) {
  if (permissions === null) {
    const perm = new Permission();
    perm.setName('READ');
    permissions = new Array();
    permissions.push(perm);
  }
  permissions.forEach((obj, index) => {
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(`permissions[${index}][${key}]`, value.toString());
    });
  });
}

export function mapRoleName(roleNames: string[]) {
  let roleArray = new Array<Role>;
  if (roleNames) {
    roleNames.forEach(name => {
      let perm = new Role();
      perm.setName(name)
      roleArray.push(perm);
    })
  }
  return roleArray;
}