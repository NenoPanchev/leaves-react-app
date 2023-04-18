import IEmploeeGet from "../employeeInfo/IEmployeeGet";

export default interface ITypeEmploeeGet {
    id: number | null,
    typeName: string,
    daysLeave: number,
    createdBy: string,
    employeeWithType: Array<IEmploeeGet>,
    isDeleted:boolean
  }
  