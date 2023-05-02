import { Dayjs } from "dayjs"

export interface IUserFilter {
    name: string
    email: string
    department: string
    roles: string[]
    offset: number
    limit: number
    position: string
    greaterThanOrEqualToDate: Dayjs | null
    lessThanOrEqualToDate: Dayjs | null
    greaterThanOrEqualToPaidLeave: number | null
    lessThanOrEqualToPaidLeave: number | null
}