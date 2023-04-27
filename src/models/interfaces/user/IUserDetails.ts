import IEmploeeGet from "../employeeInfo/IEmployeeGet"

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