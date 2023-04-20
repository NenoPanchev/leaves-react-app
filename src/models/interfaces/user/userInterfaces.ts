import IEmploeeGet from "../employeeInfo/IEmployeeGet"

export interface IUser {
    id: number
    name: string
    email: string
    department: string
    roles: [{
      name: string
    }]
    employeeInfo: {
      typeName: string
      daysLeave: number
      contractStartDate: string
    }
}

export interface IUserEdit {
  id: number
  name: string
  email: string
  department: string
  employeeInfo: IEmploeeGet
  position: string
  contractStartDate: string
  roles: [{
    name: string
  }]
  password: string
  passwordConfirm: string
}

export interface IUserDetails {
    id: number
    name: string
    email: string
    department: string
    roles: [{
      name: string
      permissions: [{
        name: string
      }]}]
    createdAt: string
    createdBy?: string
    lastModifiedAt?: string
    lastModifiedBy?: string
    employeeInfo: IEmploeeGet
}

export interface IUserPage {
  content: IUser[],
  totalElements: number,
  totalPages: number,
  numberOfElements: number,
  number:number,
  size: number,
  first: boolean,
  last: boolean
}

export interface IUserFilter {
name: string
email: string
department: string
roles: string[]
offset: number
limit: number
}

export interface UserSearchFilterProps {
  refreshCurrentState: number
  refresh: (value: number) => void;
  filter: IUserFilter;
  setFilter: (value: IUserFilter) => void;
}

export interface AddUserButtonProps {
  refreshCurrentState: number
  refresh: (value: number) => void;
  departmentNames: string[]
  roleNames: string[]
  typeNames: string[]
}

export interface EditUserButtonProps {
  user: IUserEdit
  refreshCurrentState: number
  refresh: (value: number) => void;
  departmentNames: string[]
  roleNames: string[]
  typeNames: string[]
}