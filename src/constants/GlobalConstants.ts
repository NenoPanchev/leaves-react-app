import dayjs from "dayjs";

export const PERMISSIONS = ['READ', 'WRITE', 'DELETE'];

export const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080';
export const BASE_ROLE_URL = BASE_URL + '/roles/';
export const BASE_DEPARTMENT_URL = BASE_URL + '/departments/';
export const BASE_USER_URL = BASE_URL + '/users/';
export const BASE_REQUEST_URL = BASE_URL + '/api/requests'
export const LOGIN_URL = BASE_URL + "/authenticate";
export const DEFAULT_OFFSET = 0;
export const DEFAULT_LIMIT = 10;
export const WITH_JSON_HEADER = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const WITH_AUTH_HEADER = () => ({
  headers: {
    'Authorization': localStorage.getItem('SavedToken')
  }
});

export function FC_WITH_STRING_AUTH_HEADER()
{
  return {'Authorization': localStorage.getItem('SavedToken')}
}

export const DEFAULT_USER_FILTER = {
  name: '',
  email: '',
  department: '',
  roles: [],
  offset: DEFAULT_OFFSET,
  limit: DEFAULT_LIMIT,
  position: '',
  startDateComparisons: [],
  daysLeaveComparisons: []
};

export const DEFAULT_CONTRACT_FILTER = {
  typeName: '',
  startDateComparisons: [],
  endDateComparisons: [],
  offset: DEFAULT_OFFSET,
  limit: DEFAULT_LIMIT,
};

export const DEFAULT_ROLE_FILTER = {
  name: '',
  permissions: [],
  offset: DEFAULT_OFFSET,
  limit: DEFAULT_LIMIT
};

export const DEFAULT_DEPARTMENT_FILTER = {
  name: '',
  adminEmail: '',
  employeeEmails: [],
  offset: DEFAULT_OFFSET,
  limit: DEFAULT_LIMIT
}

export const DEFAULT_LEAVES_REPORT_FILTER = {
  offset: DEFAULT_OFFSET,
  limit: 3
}

export const DEFAULT_PAGE = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  numberOfElements: DEFAULT_LIMIT,
  number: 0,
  size: DEFAULT_LIMIT,
  first: true,
  last: true
}

export const DEFAULT_LEAVES_GRID_FILTER = {
  date: dayjs(),
  showAdmins: true,
  showType: 'ALL',
  sortBy: 'NAME'
}
