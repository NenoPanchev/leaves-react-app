import { useEffect, useState } from 'react';
import { axiosInstance as axios } from '../config/AxiosConfig';
import { AxiosError, formToJSON } from 'axios';
import { BASE_URL, BASE_USER_URL, DEFAULT_PAGE, WITH_JSON_HEADER } from '../constants/GlobalConstants';
import { Role } from '../models/objects/Role';
import { EmployeeInfo } from '../models/objects/EmployeeInfo';
import { Dayjs } from 'dayjs';
import { IUser } from '../models/interfaces/user/IUser';
import { IUserDetails } from '../models/interfaces/user/IUserDetails';
import { IUserPage } from '../models/interfaces/user/IUserPage';
import { IUserFilter } from '../models/interfaces/user/IUserFilter';
import { IHistoryFilter } from '../models/interfaces/user/LeavesReport/IHistoryFilter';
import { IHistoryPage } from '../models/interfaces/user/LeavesReport/IHistoryPage';
import { useNavigate } from 'react-router';
import { IHistory } from '../models/interfaces/user/IHistory';


export const useFetchAll = (refresh: number) => {
  const [user, setUser] = useState<IUser[]>([]);


  useEffect(() => {
    loadUsers();
  }, [refresh]);

  const loadUsers = async () => {
    await axios.get(BASE_USER_URL)
      .then(response => setUser(response.data))
      .catch(error => console.log(error))

  }

  return user;
}

export const useFetchOne = (props: number) => {

  const [user, setUser] = useState<IUserDetails>();

  useEffect(() => {
    loadUser();
  }, []);


  const loadUser = async () => {
    await axios.get(BASE_USER_URL + props)
      .then(response => setUser(response.data))
      .catch(error => console.log(error))
  }
  return user;
}

export const useFetchOneEmail = (props: string) => {

  const [user, setUser] = useState<IUserDetails>();

  useEffect(() => {
    loadUser();
  }, []);


  const loadUser = async () => {
    await axios.post(BASE_USER_URL + "email", props)
      .then(response => setUser(response.data))
      .catch(error => console.log(error))
  }

  return user;
}

export const getUserByEmail = (data: string,controller:any) => {
  return axios.post<IUserDetails>(BASE_USER_URL + "email", data,{signal:controller.signal})
};

export const getUser = async () => {
  return await axios.get<IUserDetails>(BASE_USER_URL + "current");
}

export const changePasswordClick = async (id: number) => {
  return await axios.put(BASE_USER_URL + `${id}/change-password-token`);

}

export const getUserById = async (id: number) => {
  return await axios.get<IUserDetails>(BASE_USER_URL + id);
}


export const validateUserPassowrById = async (id: number, password: string) => {
  return await axios.put<IUserDetails>(BASE_USER_URL + `${id}/validate-password`, password);
}


export const validateUserPasswordChangeTokenById = async (id: number, token: string) => {
  return await axios.put<IUserDetails>(BASE_USER_URL + `${id}/validate-password-token`, token);
}

export const updatePersonalInfo = (data: any) => {
  return axios.put<any>(BASE_USER_URL + `personal-info`,data)
};
export const useCreate = () => {
  let serverResponse = '';
  const addUser = async (user: FormData) => {
    await axios.post(BASE_USER_URL, formToJSON(user))
      .then(response => {
      })
      .catch(error => {
        console.log(error)
        if (error.response) {
            console.log(error)
            serverResponse = error.response.data;
        }
    })
    return serverResponse;
  }
  return addUser;
}

export const useFetchPage = (refreshCounter: number, filter: IUserFilter) => {
  const [page, setPage] = useState<IUserPage>(DEFAULT_PAGE);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPage();
  }, [refreshCounter, filter]);

  const fetchPage = () => {

    const loadPage = async () => {
      await axios.post(BASE_USER_URL + 'page', JSON.stringify(filter), WITH_JSON_HEADER)
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

export const useEdit = () => {
  let serverResponse = '';

  const editUser = async (id: number, role: FormData) => {
    const updateUrl = BASE_USER_URL + id;

    await axios.put(updateUrl, formToJSON(role))
      .then(response => {
      })
      .catch(error => {
        console.log(error)
        if (error.response) {
          console.log(error)
          serverResponse = error.response.data;          
        }
      })
      return serverResponse;
  }
  return editUser;
}

export const useFetchAllEmails = (refresh: number) => {
  const [userEmails, setUserEmails] = useState<string[]>([]);

  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    await axios.get(BASE_USER_URL + 'emails')
      .then(response => setUserEmails(response.data))
      .catch(error => console.log(error))
  }

  return userEmails;
}
export const getAllEmailsNotHook = (controller:any) => {
    return axios.get(BASE_USER_URL + 'emails',{signal:controller.signal});
}
export const useFetchEmailsOfAvailableEmployees = (refresh: number) => {
  const [userEmails, setUserEmails] = useState<string[]>([]);

  useEffect(() => {
    loadRoles();
  }, [refresh]);

  const loadRoles = async () => {
    await axios.get(BASE_USER_URL + 'available')
      .then(response => setUserEmails(response.data))
      .catch(error => console.log(error))
  }

  return userEmails;
}

export function appendRolesToFormData(formData: FormData, roles: Role[] | null) {
  if (roles === null) {
    const role = new Role();
    role.setName('USER');
    roles = new Array();
    roles.push(role);
  }
  roles.forEach((obj, index) => {
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(`roles[${index}][${key}]`, value.toString());
    });
  });
}

export function appendEmployeeInfoToFormData(formData: FormData, startDate: Dayjs | null) {

  const employeeInfo = new EmployeeInfo();
  let type = formData.get('position') ? formData.get('position')?.toString() : '';
  let dateString = startDate!.format('DD.MM.YYYY');
  employeeInfo.setTypeName(type!);
  formData.append('employeeInfo[typeName]', type!)
  formData.append('employeeInfo[contractStartDate]', dateString)
}

export const useFetchAllTypeNames = (refresh: number) => {
  const [typeNames, setTypeNames] = useState<string[]>([]);

  useEffect(() => {
    loadTypeNames();
  }, [refresh]);

  const loadTypeNames = async () => {
    await axios.get(BASE_URL + '/api/types/names')
      .then(response => setTypeNames(response.data))
      .catch(error => console.log(error))
  }

  return typeNames;
}


export const useChangePassword = () => {
  let serverResponse = '';

  async function editPassword(id: number, passwordDto: FormData) {

    const passwordChangeUrl = BASE_USER_URL + 'change-password/' + id;

    await axios.put(passwordChangeUrl, formToJSON(passwordDto))
      .then(response => { })
      .catch((e: AxiosError<any, any>) => {
        if (e.response) {
          console.log(e)
          serverResponse = e.response.data.message;
        }
      })
    console.log(serverResponse)
    return serverResponse;
  }
  return editPassword;
}

export const useFetchLeavesAnnualReport = (props: number, filter: IHistoryFilter) => {
  const [report, setReport] = useState<IHistoryPage>(DEFAULT_PAGE);
  useEffect(() => {
    loadReport();
  }, [filter]);

  const loadReport = async () => {
    await axios.post(BASE_USER_URL + 'leaves-report/' + props, filter)
      .then(response => setReport(response.data))
      .catch(error => console.log(error))
  }
  return report;
}

export const useFetchEmployeeInfoHistory = (props: number) => {
  const [history, setHistory] = useState<IHistory[]>();
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    await axios.get(BASE_USER_URL + props + '/get-history')
      .then(response => setHistory(response.data))
      .catch(error => console.log(error))
  }

  return history;
}

export const useImportHistory = () => {
  let serverResponse = '';

  const importHistory = async (id: number, historyArray: IHistory[]) => {
    const importUrl = BASE_USER_URL + id + '/import-history';

    await axios.post(importUrl, JSON.stringify(historyArray))
      .then(response => {
      })
      .catch(error => {
        console.log(error)
        if (error.response) {
          console.log(error)
          serverResponse = error.response.data.message;          
        }
      })
      return serverResponse;
  }
  return importHistory;
}

export function getFirstAndLastNameFromFullName(fullName: string) {
  let strings = fullName.split(/\s/);
  if (strings.length === 3) {
    return strings[0] + ' ' + strings[2];
  }
  return fullName;
}