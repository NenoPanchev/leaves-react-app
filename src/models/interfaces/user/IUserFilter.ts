import { IDateComparison } from "./IStartDateComparison"
import { IDaysLeaveComparison } from "./IDaysLeaveComparison"

export interface IUserFilter {
    name: string
    email: string
    department: string
    roles: string[]
    offset: number
    limit: number
    position: string
    startDateComparisons: IDateComparison[]
    daysLeaveComparisons: IDaysLeaveComparison[]
}