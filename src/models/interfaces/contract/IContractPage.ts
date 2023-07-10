import { IContract } from "./IContract";

export interface IContractPage {
    content: IContract[],
    totalElements: number,
    totalPages: number,
    numberOfElements: number,
    number:number,
    size: number,
    first: boolean,
    last: boolean
}