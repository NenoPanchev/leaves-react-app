import { IDepartment } from "./IDepartment";

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