import {Dayjs} from "dayjs";

export interface ILeavesGridFilter {
    date: Dayjs,
    showAdmins: boolean,
    showType: string,
    sortBy: string
}