import { useContext, useEffect, useState } from 'react';
import { axiosInstance as axios} from '../config/AxiosConfig';
import { formToJSON } from 'axios';
import { IRole, IRoleDetails, IRoleFilter, IRolePage } from '../models/interfaces/role/roleInterfaces'
import { BASE_ROLE_URL, WITH_JSON_HEADER } from '../constants/GlobalConstants';
import { Permission } from '../models/objects/Permission';
import { Role } from '../models/objects/Role';
import AuthContext from '../contexts/AuthContext';


export const useFetchAll = (refresh: number) => {
  const [roles, setRoles] = useState<IRole[]>([]);


  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    const result = await axios.get(BASE_ROLE_URL)
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
    const result = await axios.get(BASE_ROLE_URL + props)
      .then(response => setRole(response.data))
      .catch(error => console.log(error))
  }
  return role;
}

export const useCreate = () => {

  const addRole = async (role: FormData) => {

    const result = await axios.post(BASE_ROLE_URL, formToJSON(role))
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

    const result = await axios.put(updateUrl, formToJSON(role))
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
      const result = await axios.post(BASE_ROLE_URL + 'filter', formToJSON(filter))
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
      const result = await axios.post(BASE_ROLE_URL + 'filter', formToJSON(filter))
        .then(response =>  {
          
          setRoles(response.data)
          
        })
        .catch(error => console.log(error))
    }

  
    const loadRoles = async () => {
      const result = await axios.get(BASE_ROLE_URL)
        .then(response => setRoles(response.data))
        .catch(error => console.log(error))
    }

    return roles;

}
export const useFetchPage = (refresh: number, filter: IRoleFilter) => {
  const [page, setPage] = useState<IRolePage>({
    content: [],

    totalElements: 0,
    totalPages: 0,

    numberOfElements: 5,
    number: 0,
    size: 5,
    first: true,
    last: true
  });
  useEffect(() => {
    fetchPage();
  }, [refresh]);

  const fetchPage = () => {
    
    

    const loadPage = async () => {
      const result = await axios.post(BASE_ROLE_URL + 'page', JSON.stringify(filter), WITH_JSON_HEADER)
        .then(response =>  {
          
          setPage(response.data)
          
        })
        .catch(error => console.log(error))
    }
    loadPage();      
    return page;
  }
  return page;
}

export const useFetchAllNames = (refresh: number) => {
  const [roleNames, setRoleNames] = useState<string[]>([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    const result = await axios.get(BASE_ROLE_URL + 'names')
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

export function appendPermissionsToFormData(formData: FormData, permissions: Permission[] | null) {
  if (permissions === null) {
    const perm = new Permission();
    perm.setName('READ');
    permissions = new Array();
    permissions.push(perm);    
  }
  permissions!.forEach((obj, index) => {
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