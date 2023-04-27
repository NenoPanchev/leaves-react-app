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