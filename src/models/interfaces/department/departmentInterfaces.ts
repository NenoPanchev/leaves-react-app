export interface IDepartment {
    id: number
    name: string
    adminEmail: string
    employeeEmails: string[]
  }

export interface IDepartmentDetails {
    id: number,
    name: string,
    adminEmail: string,
    employeeEmails: string[]
    createdAt: string
    createdBy?: string
    lastModifiedAt?: string
    lastModifiedBy?: string
  }

  export interface IDepartmentPage {
    content: IDepartment[],
    totalElements: number,
    totalPages: number,
    numberOfElements: number,
    number:number,
    size: number,
    first: boolean,
    last: boolean
}

export interface IDepartmentFilter {
  name: string
  adminEmail: string
  employeeEmails: string[]
  offset: number
  limit: number
}

export interface EditDepartmentButtonProps {
    department: IDepartment
    refreshCurrentState: number
    refresh: (value: number) => void;
    userEmails: string[]
    availableEmployeesEmails: string[]
}

export interface DepartmentSearchFilterProps {
  refreshCurrentState: number
  refresh: (value: number) => void;
  filter: IDepartmentFilter;
  setFilter: (value: IDepartmentFilter) => void;
}

export interface AddDepartmentButtonProps {
  refreshCurrentState: number
  refresh: (value: number) => void;
  userEmails: string[]
  availableEmployeesEmails: string[]
}
