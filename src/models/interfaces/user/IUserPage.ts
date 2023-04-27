import { IUser } from "./IUser";

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