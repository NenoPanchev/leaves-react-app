import IEmploeeGet from "../employeeInfo/IEmployeeGet"

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