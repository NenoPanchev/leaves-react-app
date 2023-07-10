import { IDateComparison } from "../user/IStartDateComparison"

export interface IContractFilter {
    typeName: string
    startDateComparisons: IDateComparison[]
    endDateComparisons: IDateComparison[]
    offset: number
    limit: number
}