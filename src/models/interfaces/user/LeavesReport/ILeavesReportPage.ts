import { ILeavesAnnualReport } from "./ILeavesAnnualReport";

export interface ILeavesReportPage {
    content: ILeavesAnnualReport[],
    totalElements: number,
    totalPages: number,
    numberOfElements: number,
    number:number,
    size: number,
    first: boolean,
    last: boolean
}