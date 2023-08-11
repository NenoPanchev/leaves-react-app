import {IHistory} from "../user/IHistory";

export interface IDaysUsedInMonth {
    name: string,
    days: { [key: number]: string },
    yearHistory: IHistory
}