import { IRole } from "./IRole";

export interface IRolePage {
    content: IRole[],
    totalElements: number,
    totalPages: number,
    numberOfElements: number,
    number:number,
    size: number,
    first: boolean,
    last: boolean
}