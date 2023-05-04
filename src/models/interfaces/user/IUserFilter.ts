import { IStartDateComparison } from "./IStartDateComparison"
import { IDaysLeaveComparison } from "./IDaysLeaveComparison"

export interface IUserFilter {
    name: string
    email: string
    department: string
    roles: string[]
    offset: number
    limit: number
    position: string
    startDateComparisons: IStartDateComparison[]
    daysLeaveComparisons: IDaysLeaveComparison[]
}