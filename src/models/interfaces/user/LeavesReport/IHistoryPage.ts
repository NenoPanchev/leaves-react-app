import { IHistory } from "../IHistory";

export interface IHistoryPage {
    content: IHistory[],
    totalElements: number,
    totalPages: number,
    numberOfElements: number,
    number:number,
    size: number,
    first: boolean,
    last: boolean
}